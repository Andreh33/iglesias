// Descubre URLs de imágenes en nuevavidamostoles.es y ferede.es.
// Rastrea unas pocas páginas de cada dominio, extrae <img>, og:image,
// srcset y background-image, filtra logos/iconos y vuelca el catálogo a
// scripts/.site-images.json para inspección antes de descargar.
// node scripts/discover-site-images.mjs

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "Mozilla/5.0 (compatible; NuevaVidaTemplate/1.0)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SEEDS = {
  nuevavida: [
    "https://nuevavidamostoles.es/",
    "https://nuevavidamostoles.es/quienes-somos/",
    "https://nuevavidamostoles.es/galeria/",
    "https://nuevavidamostoles.es/eventos/",
    "https://nuevavidamostoles.es/contacto/",
  ],
  ferede: [
    "https://ferede.es/",
    "https://ferede.es/quienes-somos/",
    "https://ferede.es/galeria/",
    "https://ferede.es/noticias/",
  ],
};

async function getHtml(url) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

function abs(src, base) {
  try {
    return new URL(src, base).href;
  } catch {
    return null;
  }
}

const SKIP = /(logo|icon|favicon|sprite|placeholder|avatar|\.svg($|\?)|emoji|loader|spinner|badge|flag|wpforms|captcha)/i;

function extract(html, base) {
  const urls = new Set();
  // <img src> y data-src
  for (const m of html.matchAll(/<img[^>]+(?:data-src|src)=["']([^"']+)["']/gi)) {
    const u = abs(m[1], base);
    if (u) urls.add(u);
  }
  // srcset (toma la última, mayor)
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    const parts = m[1].split(",").map((s) => s.trim().split(/\s+/)[0]);
    const u = abs(parts[parts.length - 1], base);
    if (u) urls.add(u);
  }
  // og:image
  for (const m of html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi)) {
    const u = abs(m[1], base);
    if (u) urls.add(u);
  }
  // background-image:url(...)
  for (const m of html.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)/gi)) {
    const u = abs(m[1], base);
    if (u) urls.add(u);
  }
  // enlaces directos a archivos de imagen (lightbox/galería)
  for (const m of html.matchAll(/href=["']([^"']+\.(?:jpe?g|png|webp))(?:\?[^"']*)?["']/gi)) {
    const u = abs(m[1], base);
    if (u) urls.add(u);
  }
  return [...urls].filter((u) => /\.(jpe?g|png|webp)(\?|$)/i.test(u) && !SKIP.test(u));
}

const out = {};
for (const [site, seeds] of Object.entries(SEEDS)) {
  const found = new Set();
  for (const url of seeds) {
    const html = await getHtml(url);
    if (!html) {
      console.log(`· ${url} → (no accesible)`);
      continue;
    }
    const imgs = extract(html, url);
    imgs.forEach((u) => found.add(u));
    console.log(`· ${url} → ${imgs.length} imgs`);
    await sleep(300);
  }
  out[site] = [...found];
  console.log(`== ${site}: ${out[site].length} únicas ==\n`);
}

writeFileSync(join(ROOT, "scripts", ".site-images.json"), JSON.stringify(out, null, 2));
console.log("Catálogo en scripts/.site-images.json");
