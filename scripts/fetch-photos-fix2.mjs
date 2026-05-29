// Segunda pasada: reemplaza las fotos sepia/grabados/pinturas que burlaron el
// filtro de B/N, usando una métrica de "colorido" (rechaza B/N y sepia) y un
// bloqueo de títulos más estricto (pinturas religiosas, manuscritos, etc.).
// node scripts/fetch-photos-fix2.mjs

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "NuevaVidaTemplate/1.0 (https://plantillaiglesias.vercel.app; demo)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BLOCK =
  /(paint|engrav|draw|lithograph|sketch|\bicon\b|fresco|mural|postcard|illustration|woodcut|royal|romanov|portrait of|statue|coat of arms|\bmap\b|\bart\b|\bseal\b|diagram|cartoon|comic|poster|christ|jesus|saint|\bst\.?\b|madonna|virgin|altarpiece|gospel|miniature|manuscript|codex|\bnotes?\b|\bpage\b|facsimile|gutenberg|1611|geneva|tribe|tribal|indigenous|\bnative\b|ethnolog|antique|vintage|19th|18th|century)/i;

const QUERIES = {
  bible: ["open bible wooden table", "reading bible hands color", "bible study notebook coffee", "holy bible open pages closeup"],
  baptism: ["adult baptism pool church", "believer baptism immersion water", "baptism ceremony people water", "baptism pastor river"],
  cafe: ["modern coffee shop interior", "cafe espresso bar counter", "coffeehouse seating people", "coffee shop tables chairs"],
  campOutdoor: ["summer camp cabin forest", "tent camping woods", "bonfire night friends outdoor", "campsite forest tents"],
  congregation: ["church congregation standing worship", "church service people hands", "worship service crowd church"],
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
      const j = await api({ action: "query", titles: uniq.slice(i, i + 40).join("|"), prop: "imageinfo", iiprop: "url|mime|size", iiurlwidth: "1500" });
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

// Métrica de colorido (Hasler-Süsstrunk). B/N y sepia → valor bajo.
async function colorfulness(buf) {
  const { data, info } = await sharp(buf).resize(64, 64, { fit: "cover" }).raw().toBuffer({ resolveWithObject: true });
  const rg = [], yb = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    rg.push(r - g);
    yb.push(0.5 * (r + g) - b);
  }
  const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  const std = (a, m) => Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length);
  const mRG = mean(rg), mYB = mean(yb);
  return Math.sqrt(std(rg, mRG) ** 2 + std(yb, mYB) ** 2) + 0.3 * Math.sqrt(mRG ** 2 + mYB ** 2);
}

const pools = {};
const used = new Set();

async function refetch({ name, theme, w, h }) {
  if (!pools[theme]) pools[theme] = await poolFor(theme);
  for (const url of [...pools[theme].filter((u) => !used.has(u)), ...pools[theme]]) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 7000) continue;
      if ((await colorfulness(buf)) < 19) continue; // descarta B/N y sepia
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

const REPLACE = [
  { name: "gallery-3", theme: "baptism", w: 900, h: 1200 },
  { name: "gallery-9", theme: "baptism", w: 900, h: 1200 },
  { name: "post-2", theme: "bible", w: 1200, h: 800 },
  { name: "post-3", theme: "bible", w: 1200, h: 800 },
  { name: "course-biblicos", theme: "bible", w: 1200, h: 800 },
  { name: "facility-2", theme: "cafe", w: 1200, h: 800 },
  { name: "camp-4", theme: "campOutdoor", w: 1100, h: 850 },
  { name: "event-6", theme: "congregation", w: 1000, h: 750 },
];

for (const slot of REPLACE) await refetch(slot);
console.log("\nSegunda pasada terminada.");
