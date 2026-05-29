// Crea hojas de contacto (montajes etiquetados) de las fotos para revisarlas.
// node scripts/build-montage.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMG = join(ROOT, "public", "images");
const TMP = join(ROOT, "tmp-review");
import { mkdirSync } from "node:fs";
mkdirSync(TMP, { recursive: true });

const CELL = 300;
const PAD = 26; // espacio para etiqueta
const COLS = 4;

async function montage(file, names) {
  const cells = [];
  for (const name of names) {
    const p = join(IMG, `${name}.jpg`);
    if (!existsSync(p)) continue;
    const thumb = await sharp(readFileSync(p))
      .resize(CELL, CELL, { fit: "cover" })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${CELL}" height="${PAD}"><rect width="${CELL}" height="${PAD}" fill="#0E2A40"/><text x="6" y="18" font-family="monospace" font-size="15" fill="#fff">${name}</text></svg>`,
    );
    const cell = await sharp({
      create: { width: CELL, height: CELL + PAD, channels: 3, background: "#fff" },
    })
      .composite([
        { input: thumb, top: PAD, left: 0 },
        { input: label, top: 0, left: 0 },
      ])
      .png()
      .toBuffer();
    cells.push(cell);
  }
  const rows = Math.ceil(cells.length / COLS);
  const W = COLS * CELL;
  const H = rows * (CELL + PAD);
  const composites = cells.map((input, i) => ({
    input,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * (CELL + PAD),
  }));
  await sharp({ create: { width: W, height: H, channels: 3, background: "#dddddd" } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(join(TMP, file));
  console.log("✓", file, `(${cells.length} imgs)`);
}

const G = (p, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${p}${a + i}`);

await montage("01-hero-people.jpg", ["hero-sky", "about-1", "pastor", "og-default", "camps-hero", ...G("team-", 1, 6), ...G("avatar-", 1, 6)]);
await montage("02-gallery-a.jpg", G("gallery-", 1, 9));
await montage("03-gallery-b.jpg", G("gallery-", 10, 18));
await montage("04-facilities-camps.jpg", [...G("facility-", 1, 7), ...G("camp-", 1, 4)]);
await montage("05-events.jpg", G("event-", 1, 8));
await montage("06-posts.jpg", G("post-", 1, 10));
await montage("07-courses-videos.jpg", ["course-biblicos", "course-jovenes", "course-matrimonios", "course-bautizos", ...G("video-", 1, 6)]);
console.log("Montajes en tmp-review/");
