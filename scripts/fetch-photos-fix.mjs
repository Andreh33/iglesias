// Reemplaza SOLO las fotos que no encajan (pinturas, grabados, B/N antiguas,
// imágenes sin relación) por otras mejores. Filtra por título y descarta B/N.
// Retratos de personas: fuente fiable de caras reales (pravatar.cc).
// node scripts/fetch-photos-fix.mjs

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "NuevaVidaTemplate/1.0 (https://plantillaiglesias.vercel.app; demo)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Rechaza por título: pinturas, grabados, postales, escudos, mapas, estatuas…
const BLOCK = /(paint|engrav|draw|lithograph|sketch|\bicon\b|fresco|mural|postcard|illustration|woodcut|royal|romanov|portrait of|statue|coat of arms|\bmap\b|\bart\b|\bseal\b|diagram|cartoon|comic|poster)/i;

const QUERIES = {
  worship: ["contemporary worship service church", "worship band concert stage church", "praise worship hands raised church"],
  congregation: ["church congregation standing service", "church service people seated", "worship service crowd church"],
  interior: ["modern church interior sanctuary", "church nave pews interior", "evangelical church auditorium interior"],
  building: ["modern church building exterior", "evangelical church facade exterior", "protestant church building"],
  bible: ["open bible pages", "holy bible book table", "bible reading hands"],
  prayer: ["person praying hands church", "prayer hands raised worship", "woman praying church"],
  baptism: ["adult baptism water church", "baptism immersion river", "baptism ceremony pool church"],
  youthGroup: ["church youth group activity", "young people christian gathering", "teenagers camp outdoor"],
  campOutdoor: ["summer camp tents forest", "youth camp lake nature", "campfire group outdoor evening"],
  cafe: ["modern coffee shop interior", "cozy cafe seating tables", "coffee bar counter interior"],
  kids: ["children playing classroom", "kids craft activity table", "children group playing indoor"],
  preacher: ["pastor preaching pulpit", "preacher sermon microphone church", "man speaking pulpit congregation"],
};

async function api(params) {
  const url = `${API}?${new URLSearchParams({ ...params, format: "json", origin: "*" })}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}

async function poolFor(theme) {
  const titles = [];
  for (const q of QUERIES[theme]) {
    try {
      const j = await api({ action: "query", list: "search", srsearch: q, srnamespace: "6", srlimit: "30" });
      for (const s of j.query?.search || []) if (!BLOCK.test(s.title)) titles.push(s.title);
    } catch {}
    await sleep(110);
  }
  const uniq = [...new Set(titles)];
  const urls = [];
  for (let i = 0; i < uniq.length; i += 40) {
    try {
      const j = await api({
        action: "query",
        titles: uniq.slice(i, i + 40).join("|"),
        prop: "imageinfo",
        iiprop: "url|mime|size",
        iiurlwidth: "1500",
      });
      const pages = j.query?.pages || {};
      for (const k of Object.keys(pages)) {
        const ii = pages[k].imageinfo?.[0];
        if (!ii || !/jpeg|png/.test(ii.mime || "")) continue;
        if (ii.width && ii.width < 900) continue;
        urls.push(ii.thumburl || ii.url);
      }
    } catch {}
    await sleep(110);
  }
  return urls;
}

async function isGrayscale(buf) {
  try {
    const { data, info } = await sharp(buf).resize(48, 48, { fit: "cover" }).raw().toBuffer({ resolveWithObject: true });
    let sum = 0, n = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      sum += Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);
      n++;
    }
    return sum / n < 16; // croma bajo → blanco y negro
  } catch {
    return false;
  }
}

const pools = {};
const used = new Set();

async function refetch({ name, theme, w, h }) {
  if (!pools[theme]) pools[theme] = await poolFor(theme);
  const list = [...pools[theme].filter((u) => !used.has(u)), ...pools[theme]];
  for (const url of list) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 7000) continue;
      if (await isGrayscale(buf)) continue;
      const out = await sharp(buf).resize(w, h, { fit: "cover", position: "attention" }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      writeFileSync(join(OUT, `${name}.jpg`), out);
      used.add(url);
      console.log(`✓ ${name}.jpg`);
      return true;
    } catch {}
  }
  console.log(`✗ ${name} (${theme})`);
  return false;
}

// Retratos reales y distintos (pravatar.cc) para equipo y testimonios.
async function portrait(name, id, size) {
  const url = `https://i.pravatar.cc/${size}?img=${id}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw 0;
    const buf = Buffer.from(await res.arrayBuffer());
    const out = await sharp(buf).resize(size, name.startsWith("team") ? Math.round(size * 1.2) : size, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    writeFileSync(join(OUT, `${name}.jpg`), out);
    console.log(`✓ ${name}.jpg (retrato)`);
    return true;
  } catch {
    console.log(`✗ ${name} (retrato)`);
    return false;
  }
}

// ── Huecos a reemplazar (solo los que no encajan) ──
const REPLACE = [
  { name: "about-1", theme: "congregation", w: 1000, h: 1200 },
  { name: "pastor", theme: "preacher", w: 900, h: 1100 },
  { name: "camps-hero", theme: "campOutdoor", w: 1600, h: 1000 },
  { name: "gallery-2", theme: "worship", w: 1000, h: 720 },
  { name: "gallery-3", theme: "baptism", w: 900, h: 1200 },
  { name: "gallery-4", theme: "youthGroup", w: 1000, h: 720 },
  { name: "gallery-8", theme: "interior", w: 1000, h: 720 },
  { name: "gallery-9", theme: "baptism", w: 900, h: 1200 },
  { name: "gallery-10", theme: "congregation", w: 1000, h: 720 },
  { name: "gallery-14", theme: "worship", w: 1000, h: 720 },
  { name: "facility-2", theme: "cafe", w: 1200, h: 800 },
  { name: "facility-3", theme: "kids", w: 1200, h: 800 },
  { name: "camp-4", theme: "campOutdoor", w: 1100, h: 850 },
  { name: "event-2", theme: "worship", w: 1000, h: 750 },
  { name: "event-5", theme: "building", w: 1000, h: 750 },
  { name: "event-6", theme: "worship", w: 1000, h: 750 },
  { name: "post-1", theme: "prayer", w: 1200, h: 800 },
  { name: "post-2", theme: "bible", w: 1200, h: 800 },
  { name: "post-3", theme: "bible", w: 1200, h: 800 },
  { name: "post-4", theme: "congregation", w: 1200, h: 800 },
  { name: "post-5", theme: "congregation", w: 1200, h: 800 },
  { name: "post-9", theme: "congregation", w: 1200, h: 800 },
  { name: "course-biblicos", theme: "bible", w: 1200, h: 800 },
];

for (const slot of REPLACE) await refetch(slot);

// Retratos: ids distintos para variedad
const teamIds = [12, 13, 11, 33, 52, 60];
const avatarIds = [5, 14, 16, 45, 48, 68];
for (let i = 0; i < 6; i++) await portrait(`team-${i + 1}`, teamIds[i], 600);
for (let i = 0; i < 6; i++) await portrait(`avatar-${i + 1}`, avatarIds[i], 400);

console.log("\nReemplazo terminado.");
