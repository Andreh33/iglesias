// Descarga fotos reales de iglesias evangélicas / modernas / alabanza desde la
// API de Wikimedia Commons (licencias libres), las recorta/comprime con sharp y
// las guarda en /public/images/<slot>.jpg sustituyendo a los placeholders SVG.
//
// Ejecuta: node scripts/fetch-photos.mjs
// Estas fotos son DEMO; cada iglesia debe sustituirlas por las suyas.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");
mkdirSync(OUT, { recursive: true });

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "NuevaVidaTemplate/1.0 (https://plantillaiglesias.vercel.app; demo)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const QUERIES = {
  worship: ["church worship service", "praise worship band stage", "congregation singing worship"],
  interior: ["modern church interior", "church sanctuary nave", "evangelical church auditorium"],
  building: ["evangelical church building", "modern church architecture", "baptist church exterior"],
  community: ["church congregation people", "christian fellowship group", "church volunteers community"],
  prayerBible: ["open bible book", "praying hands prayer", "bible study group"],
  baptism: ["baptism church water", "river baptism immersion"],
  youth: ["christian youth camp", "summer camp outdoor youth", "church youth group"],
  couple: ["married couple happy", "wedding couple hands"],
  cafe: ["coffee shop interior", "cafe counter coffee"],
  kids: ["children sunday school", "kids classroom church"],
  bookstore: ["bookshop interior shelves", "bookstore books"],
  studio: ["radio broadcast studio microphone", "recording studio microphone"],
  portrait: ["portrait smiling man", "portrait smiling woman", "headshot person"],
  nature: ["sunrise sky clouds", "mountain sunrise landscape"],
};

async function api(params) {
  const url = `${API}?${new URLSearchParams({ ...params, format: "json", origin: "*" })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function searchTitles(query, limit = 25) {
  try {
    const j = await api({ action: "query", list: "search", srsearch: query, srnamespace: "6", srlimit: String(limit) });
    return (j.query?.search || []).map((x) => x.title);
  } catch {
    return [];
  }
}

async function resolveUrls(titles, width) {
  const urls = [];
  // Lotes de 40 títulos
  for (let i = 0; i < titles.length; i += 40) {
    const batch = titles.slice(i, i + 40);
    try {
      const j = await api({
        action: "query",
        titles: batch.join("|"),
        prop: "imageinfo",
        iiprop: "url|mime|size",
        iiurlwidth: String(width),
      });
      const pages = j.query?.pages || {};
      for (const k of Object.keys(pages)) {
        const ii = pages[k].imageinfo?.[0];
        if (!ii) continue;
        if (!/jpeg|png/.test(ii.mime || "")) continue;
        if (ii.width && ii.width < 800) continue;
        urls.push(ii.thumburl || ii.url);
      }
    } catch {
      /* sigue */
    }
    await sleep(120);
  }
  return urls;
}

const pools = {};
const usedUrls = new Set();

async function ensurePool(theme, width) {
  if (pools[theme]) return pools[theme];
  const titles = [];
  for (const q of QUERIES[theme]) {
    titles.push(...(await searchTitles(q)));
    await sleep(120);
  }
  // dedup
  const uniq = [...new Set(titles)];
  pools[theme] = await resolveUrls(uniq, Math.max(width, 1400));
  return pools[theme];
}

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 6000) throw new Error("muy pequeña");
  return buf;
}

async function makeSlot({ name, theme, w, h }) {
  const pool = await ensurePool(theme, w);
  const tryList = [...pool.filter((u) => !usedUrls.has(u)), ...pool]; // primero sin usar, luego reuso
  for (const url of tryList) {
    try {
      const buf = await download(url);
      const out = await sharp(buf)
        .resize(w, h, { fit: "cover", position: "attention" })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      writeFileSync(join(OUT, `${name}.jpg`), out);
      usedUrls.add(url);
      process.stdout.write(`✓ ${name}.jpg\n`);
      return true;
    } catch {
      /* prueba siguiente */
    }
  }
  process.stdout.write(`✗ ${name} (tema ${theme})\n`);
  return false;
}

const SLOTS = [
  { name: "hero-sky", theme: "worship", w: 1600, h: 1200 },
  { name: "about-1", theme: "community", w: 1000, h: 1200 },
  { name: "pastor", theme: "portrait", w: 900, h: 1100 },
  { name: "camps-hero", theme: "youth", w: 1600, h: 1000 },
  { name: "og-default", theme: "worship", w: 1200, h: 630 },
  ...Array.from({ length: 18 }, (_, i) => {
    const n = i + 1;
    const cycle = ["worship", "community", "baptism", "youth", "interior", "building"];
    const tall = n % 3 === 0;
    return { name: `gallery-${n}`, theme: cycle[i % cycle.length], w: tall ? 900 : 1000, h: tall ? 1200 : 720 };
  }),
  { name: "facility-1", theme: "interior", w: 1200, h: 800 },
  { name: "facility-2", theme: "cafe", w: 1200, h: 800 },
  { name: "facility-3", theme: "kids", w: 1200, h: 800 },
  { name: "facility-4", theme: "interior", w: 1200, h: 800 },
  { name: "facility-5", theme: "bookstore", w: 1200, h: 800 },
  { name: "facility-6", theme: "studio", w: 1200, h: 800 },
  { name: "facility-7", theme: "building", w: 1200, h: 800 },
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `event-${i + 1}`,
    theme: ["worship", "community", "worship", "youth", "community", "worship", "community", "youth"][i],
    w: 1000,
    h: 750,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `post-${i + 1}`,
    theme: ["prayerBible", "prayerBible", "prayerBible", "community", "community", "prayerBible", "baptism", "prayerBible", "community", "nature"][i],
    w: 1200,
    h: 800,
  })),
  { name: "course-biblicos", theme: "prayerBible", w: 1200, h: 800 },
  { name: "course-jovenes", theme: "youth", w: 1200, h: 800 },
  { name: "course-matrimonios", theme: "couple", w: 1200, h: 800 },
  { name: "course-bautizos", theme: "baptism", w: 1200, h: 800 },
  ...Array.from({ length: 6 }, (_, i) => ({ name: `video-${i + 1}`, theme: i % 2 ? "interior" : "worship", w: 1280, h: 720 })),
  ...Array.from({ length: 6 }, (_, i) => ({ name: `team-${i + 1}`, theme: "portrait", w: 600, h: 720 })),
  ...Array.from({ length: 6 }, (_, i) => ({ name: `avatar-${i + 1}`, theme: "portrait", w: 400, h: 400 })),
];

const ok = [];
for (const slot of SLOTS) {
  if (await makeSlot(slot)) ok.push(slot.name);
}

writeFileSync(join(ROOT, "scripts", ".photo-slots.json"), JSON.stringify(ok, null, 2));
console.log(`\n${ok.length}/${SLOTS.length} fotos generadas.`);
