// Harvester: recorre los sitemaps de vidanuevamostoles.es y ferede.es,
// abre cada página/entrada, extrae imágenes de CONTENIDO (con su alt y la
// página de origen), descarta logos/iconos/diagramas/sprites y variantes
// pequeñas de WordPress, y vuelca un catálogo a scripts/.harvest.json.
//
// El usuario declara tener licencia y permiso sobre las fotos de ambos sitios
// (su propia iglesia y su federación). Estas son fotos reales para la plantilla.
//
// node scripts/harvest-sites.mjs

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SITES = {
  vidanueva: "https://vidanuevamostoles.es",
  ferede: "https://ferede.es",
};

// Rechaza por nombre de archivo: marca/UI/infografía, no fotografía.
const SKIP = /(logo|icono?|favicon|sprite|placeholder|spinner|loader|emoji|badge|flag|wpforms|captcha|mapa|circulos|representatividad|comunidad\.jpg|servicios\.jpg|base_de_fe|fines_ob|historia\.jpg|fdri|qr|banner|cabecera|header-|footer-|whatsapp|telegram|facebook|instagram|youtube|twitter|\bicon)/i;
const IMG_RE = /\.(jpe?g|png|webp)(\?|$)/i;

async function getText(url) {
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(250);
  }
  return null;
}

function abs(src, base) {
  try { return new URL(src.trim(), base).href; } catch { return null; }
}

// Quita el sufijo -WxH de WordPress para agrupar variantes del mismo original.
function baseKey(u) {
  return u.replace(/-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp))/i, "").split("?")[0];
}

async function sitemapUrls(site) {
  const idx = (await getText(`${site}/sitemap.xml`)) || (await getText(`${site}/sitemap_index.xml`)) || "";
  const subs = [...idx.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]);
  const pageMaps = subs.filter((u) => /(post|page)-sitemap/i.test(u));
  const urls = new Set([`${site}/`]);
  for (const sm of pageMaps) {
    const xml = await getText(sm);
    if (xml) for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) urls.add(m[1]);
    await sleep(150);
  }
  return [...urls];
}

// Extrae {url, alt} de las <figure>/<img> del cuerpo del artículo.
function extractImgs(html, base) {
  const out = [];
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const srcset = /srcset=["']([^"']+)["']/i.exec(tag);
    let src;
    if (srcset) {
      const cands = srcset[1].split(",").map((s) => s.trim().split(/\s+/));
      cands.sort((a, b) => (parseInt(b[1]) || 0) - (parseInt(a[1]) || 0));
      src = cands[0][0];
    } else {
      const s = /\b(?:data-src|src)=["']([^"']+)["']/i.exec(tag);
      src = s && s[1];
    }
    if (!src) continue;
    const u = abs(src, base);
    if (!u || !IMG_RE.test(u) || SKIP.test(u)) continue;
    const altm = /\balt=["']([^"']*)["']/i.exec(tag);
    out.push({ url: u, alt: (altm && altm[1].trim()) || "" });
  }
  // og:image
  const og = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html);
  if (og) {
    const u = abs(og[1], base);
    if (u && IMG_RE.test(u) && !SKIP.test(u)) out.push({ url: u, alt: "" });
  }
  return out;
}

const catalog = {};
for (const [name, site] of Object.entries(SITES)) {
  const pages = await sitemapUrls(site);
  console.log(`\n### ${name}: ${pages.length} páginas`);
  const byKey = new Map(); // baseKey -> {url, alt, page}
  let n = 0;
  for (const page of pages) {
    const html = await getText(page);
    if (!html) continue;
    const imgs = extractImgs(html, page);
    for (const im of imgs) {
      const k = baseKey(im.url);
      const prev = byKey.get(k);
      // Conserva la variante de URL más larga (suele ser la original/grande)
      // y el alt no vacío.
      if (!prev) byKey.set(k, { ...im, page });
      else {
        if (im.url.length > prev.url.length) prev.url = im.url;
        if (!prev.alt && im.alt) prev.alt = im.alt;
      }
    }
    if (++n % 10 === 0) process.stdout.write(`  …${n}/${pages.length}\n`);
    await sleep(120);
  }
  catalog[name] = [...byKey.values()];
  console.log(`  → ${catalog[name].length} imágenes únicas`);
}

writeFileSync(join(ROOT, "scripts", ".harvest.json"), JSON.stringify(catalog, null, 2));
const total = Object.values(catalog).reduce((a, b) => a + b.length, 0);
console.log(`\nCatálogo: ${total} imágenes en scripts/.harvest.json`);
