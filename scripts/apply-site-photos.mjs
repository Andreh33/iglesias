// Toma el catálogo de scripts/.harvest.json (fotos reales de vidanuevamostoles.es
// y ferede.es, con licencia/permiso del usuario), puntúa cada foto contra el
// tema de cada hueco usando su alt + el slug de la página de origen, descarga la
// mejor coincidente, la recorta/comprime con sharp y la guarda en
// /public/images/<slot>.jpg sustituyendo a las fotos de stock.
//
// node scripts/apply-site-photos.mjs
//
// Notas:
//  - Reserva los retratos (portrait) para team/avatar/pastor.
//  - No reutiliza una foto hasta agotar las no usadas de su tema.
//  - Verifica tamaño mínimo y descarta imágenes en escala de grises (logos).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const catalog = JSON.parse(readFileSync(join(ROOT, "scripts", ".harvest.json"), "utf8"));
// Basura segura: assets de tema, iconos sueltos, miniaturas diminutas.
const JUNK = /(hyperion\.oxy\.host|arrow-down|descarga\.png|-150x|-300x200|sponsor|patrocin|cookie)/i;
// Lista negra: imágenes que tras revisión visual resultaron ser PÓSTERS,
// portadas, diapositivas con texto o recortes malos (no fotografías).
const BLACKLIST = [
  "20241209-2", "20251029-5", "20240627-9b", "20250527-7", "12ade545-dcad",
  "2-1024x683", "20250527-8", "20251022-9", "Carceles", "20260504-4",
  "20250527-9", "1776870931318", "Posts-2026", "JUNTOS",
  // Retratos rotos (grupo/edificio/diapositiva/botón de vídeo) descartados tras revisión.
  "20251013-2", "20250329-2", "20250329-3", "20250329-5", "20250313-4", "Esteban-Lozano",
].map((s) => s.toLowerCase());
// Texto buscable por imagen: alt + slug de la página.
const ALL = [];
for (const arr of Object.values(catalog)) {
  for (const it of arr) {
    if (JUNK.test(it.url)) continue;
    const low = it.url.toLowerCase();
    if (BLACKLIST.some((b) => low.includes(b))) continue;
    const slug = (() => { try { return new URL(it.page).pathname.replace(/[-/]/g, " "); } catch { return ""; } })();
    ALL.push({ url: it.url, text: `${it.alt} ${slug}`.toLowerCase() });
  }
}
console.log(`Catálogo: ${ALL.length} fotos`);

// Palabras clave por tema (es). Más peso = más específico.
const THEMES = {
  worship:   [["alaban",3],["adora",3],["culto",3],["worship",3],["music",2],["concierto",2],["coro",2],["cantar",2],["banda",2]],
  congregation:[["asamblea",3],["congreso",3],["congregaci",3],["reuni",2],["encuentro",2],["jornada",2],["celebra",2],["acto",1],["aniversario",2],["fiesta",1]],
  community: [["comunidad",3],["familia",3],["grupo",2],["voluntari",3],["social",2],["solidari",2],["accion social",3],["diaconia",2],["compartir",2],["desayuno",2],["comida",2]],
  building:  [["templo",3],["iglesia",2],["local",2],["inaugura",3],["edificio",3],["oficina",3],["sala",2],["hospital",2],["dedicaci",2],["fachada",3],["catedral",2]],
  bible:     [["biblia",3],["palabra",2],["estudio biblico",3],["teolog",2],["formaci",2],["curso",2],["seminario",2],["leer",1],["escritura",2]],
  prayer:    [["oraci",3],["orar",3],["clamor",2],["vigilia",2],["intercesi",3],["prayer",3]],
  youth:     [["joven",3],["jovenes",3],["youth",3],["juvenil",3],["adolescent",2],["campamento",3],["camp",2],["aglow",1]],
  baptism:   [["bautis",3],["bautiz",3],["baptism",3],["inmersi",2]],
  portrait:  [["pastor",3],["presidente",3],["vicepresident",3],["secretari",2],["conociendo a la familia",3],["entrevista",2],["equipo en oficina",2],["retrato",3],["luis",1],["esteban",1],["daniel",1],["carolina",1],["conchi",1]],
  kids:      [["niño",3],["niñ",3],["infantil",3],["escuela dominical",3],["children",3],["kids",2]],
  cafe:      [["cafe",3],["cafeter",3],["coffee",3],["desayuno",2]],
  outdoor:   [["aire libre",2],["naturaleza",3],["montaña",3],["sierra",2],["jardin",2],["parque",2],["senderismo",3],["retiro",2]],
  couple:    [["matrimonio",3],["pareja",3],["boda",3],["familias",2]],
};

const used = new Set();

function score(text, theme) {
  let s = 0;
  for (const [kw, w] of THEMES[theme]) if (text.includes(kw)) s += w;
  return s;
}

// Devuelve la mejor URL no usada para una lista priorizada de temas.
// `prefer` (substring de URL) añade un empujón para fotos de un origen concreto.
function pick(themes, prefer) {
  let best = null, bestScore = -1;
  for (const it of ALL) {
    if (used.has(it.url)) continue;
    let s = 0;
    // Prioriza: el primer tema suma más.
    for (let i = 0; i < themes.length; i++) s += score(it.text, themes[i]) * (themes.length - i);
    // Para retratos, prioriza archivos con nombre propio (Nombre-Apellido.jpg):
    // suelen ser retratos individuales de una persona, no fotos de grupo.
    if (themes[0] === "portrait" && /\/[a-z]+-[a-z]+(-\d)?\.(jpe?g|png)$/i.test(it.url) && /[A-Z]/.test(it.url.split("/").pop())) s += 8;
    if (prefer && it.url.includes(prefer)) s += 100; // fotos de la propia iglesia primero
    if (s > bestScore) { bestScore = s; best = it; }
  }
  // Si nada puntuó (>0), coge cualquiera no usada (rota el catálogo).
  if (!best || bestScore <= 0) {
    if (prefer) best = ALL.find((it) => !used.has(it.url) && it.url.includes(prefer));
    best = best || ALL.find((it) => !used.has(it.url)) || ALL[Math.floor(used.size % ALL.length)];
  }
  if (best) used.add(best.url);
  return best;
}

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("muy pequeña");
  return buf;
}

async function isGrayscale(buf) {
  try {
    const { data, info } = await sharp(buf).resize(40, 40, { fit: "cover" }).raw().toBuffer({ resolveWithObject: true });
    let sum = 0, n = 0;
    for (let i = 0; i + 2 < data.length; i += info.channels) {
      sum += Math.abs(data[i] - data[i + 1]) + Math.abs(data[i + 1] - data[i + 2]);
      n++;
    }
    return sum / n < 12;
  } catch { return false; }
}

// Heurística "es un gráfico/póster/diapositiva, no una foto": las imágenes de
// diseño tienen grandes zonas de color plano y poca diversidad cromática; las
// fotos reparten el color de forma suave. Cuantiza a 64x64 y mira el bucket
// dominante y el nº de buckets ocupados.
async function looksLikeGraphic(buf) {
  try {
    const { data, info } = await sharp(buf).resize(64, 64, { fit: "cover" }).raw().toBuffer({ resolveWithObject: true });
    const hist = new Map();
    let total = 0;
    for (let i = 0; i + 2 < data.length; i += info.channels) {
      // Cuantiza a 3 bits por canal (8 niveles) → 512 buckets.
      const key = ((data[i] >> 5) << 6) | ((data[i + 1] >> 5) << 3) | (data[i + 2] >> 5);
      hist.set(key, (hist.get(key) || 0) + 1);
      total++;
    }
    let top = 0;
    for (const v of hist.values()) if (v > top) top = v;
    const topFrac = top / total;
    const buckets = hist.size;
    // Gráfico: un color domina mucho, o paleta muy pobre.
    return topFrac > 0.34 || buckets < 28;
  } catch { return false; }
}

// Retratos individuales fijados a mano (serie "Conociendo a la familia de
// FEREDE" + líderes), con género acorde al nombre ficticio de cada hueco.
const OVERRIDES = {
  "pastor": "Guillem-Correa",
  "team-1": "Jorge-Fernandez",   // David Herrera (M)
  "team-2": "Carolina-Bueno",    // Raquel Herrera (F)
  "team-3": "Marcelo-Gava",      // Samuel Ortega (M)
  "team-4": "Alicia-Aparisi",    // Lucía Méndez (F)
  "team-5": "Brian-Taveras",     // Marcos Cano (M)
  "team-6": "Esperanza-Suarez",  // Noa Ferrer (F)
  "avatar-1": "Adela-Negriu",    // María Jiménez (F)
  "avatar-2": "Alvaro-Serrano",  // David Romero (M)
  "avatar-3": "Carolina-Polo",   // Lucía Prieto (F)
  "avatar-4": "MIguel-Nieto",    // Antonio Fernández (M)
  "avatar-5": "Beatriz-Machado", // Carmen Gil (F)
  "avatar-6": "Manuel-GLafuente",// Samuel Moreno (M)
};

async function makeSlot({ name, themes, w, h, prefer }) {
  const forced = OVERRIDES[name];
  for (let attempt = 0; attempt < 16; attempt++) {
    let it;
    if (forced) {
      const f = ALL.find((x) => x.url.toLowerCase().includes(forced.toLowerCase()) && !used.has(x.url));
      if (f) { used.add(f.url); it = f; }
      else it = pick(themes, prefer); // si ya se usó o no está, cae al scoring
    } else {
      it = pick(themes, prefer);
    }
    if (!it) break;
    try {
      const buf = await download(it.url);
      if (await isGrayscale(buf)) continue; // evita logos/escaneos
      // Los retratos/avatares toleran fondos planos; el resto no debe ser gráfico.
      if (!/portrait/.test(themes[0]) && (await looksLikeGraphic(buf))) continue;
      const meta = await sharp(buf).metadata();
      if ((meta.width || 0) < Math.min(w, 500)) continue; // demasiado pequeña para el hueco
      const out = await sharp(buf)
        .resize(w, h, { fit: "cover", position: "attention" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
      writeFileSync(join(OUT, `${name}.jpg`), out);
      process.stdout.write(`✓ ${name}.jpg  ←  ${it.url.split("/").pop()}\n`);
      return true;
    } catch {
      await sleep(80);
    }
  }
  process.stdout.write(`✗ ${name} (sin foto válida)\n`);
  return false;
}

// ── Definición de huecos ────────────────────────────────────────────────────
const SLOTS = [
  { name: "hero-sky",   themes: ["worship", "congregation"], w: 1600, h: 1200, prefer: "vidanuevamostoles" },
  { name: "og-default", themes: ["worship", "congregation"], w: 1200, h: 630, prefer: "vidanuevamostoles" },
  { name: "about-1",    themes: ["community", "congregation"], w: 1000, h: 1200, prefer: "vidanuevamostoles" },
  { name: "camps-hero", themes: ["youth", "outdoor"], w: 1600, h: 1000 },
  { name: "pastor",     themes: ["portrait"], w: 900, h: 1100 },

  // Galería (18) — temática variada por categoría real del data.
  { name: "gallery-1",  themes: ["worship"], w: 1000, h: 720, prefer: "vidanuevamostoles" },
  { name: "gallery-2",  themes: ["community"], w: 1000, h: 720 },
  { name: "gallery-3",  themes: ["baptism", "prayer"], w: 900, h: 1200 },
  { name: "gallery-4",  themes: ["youth", "outdoor"], w: 1000, h: 720 },
  { name: "gallery-5",  themes: ["congregation", "worship"], w: 1000, h: 720 },
  { name: "gallery-6",  themes: ["building"], w: 900, h: 1200 },
  { name: "gallery-7",  themes: ["worship"], w: 1000, h: 720 },
  { name: "gallery-8",  themes: ["community"], w: 1000, h: 720 },
  { name: "gallery-9",  themes: ["prayer", "baptism"], w: 900, h: 1200 },
  { name: "gallery-10", themes: ["youth", "kids"], w: 1000, h: 720 },
  { name: "gallery-11", themes: ["congregation"], w: 1000, h: 720 },
  { name: "gallery-12", themes: ["building", "cafe"], w: 900, h: 1200 },
  { name: "gallery-13", themes: ["worship"], w: 1000, h: 720 },
  { name: "gallery-14", themes: ["community", "bible"], w: 1000, h: 720 },
  { name: "gallery-15", themes: ["baptism", "prayer"], w: 900, h: 1200 },
  { name: "gallery-16", themes: ["youth", "outdoor"], w: 1000, h: 720 },
  { name: "gallery-17", themes: ["congregation", "community"], w: 1000, h: 720 },
  { name: "gallery-18", themes: ["building"], w: 900, h: 1200 },

  // Instalaciones (7)
  { name: "facility-1", themes: ["building", "congregation"], w: 1200, h: 800 },
  { name: "facility-2", themes: ["cafe", "community"], w: 1200, h: 800 },
  { name: "facility-3", themes: ["kids", "youth"], w: 1200, h: 800 },
  { name: "facility-4", themes: ["bible", "community"], w: 1200, h: 800 },
  { name: "facility-5", themes: ["building", "bible"], w: 1200, h: 800 },
  { name: "facility-6", themes: ["congregation", "worship"], w: 1200, h: 800 },
  { name: "facility-7", themes: ["building", "outdoor"], w: 1200, h: 800 },

  // Eventos (8)
  { name: "event-1", themes: ["bible", "congregation"], w: 1000, h: 750 },
  { name: "event-2", themes: ["worship", "outdoor"], w: 1000, h: 750 },
  { name: "event-3", themes: ["prayer"], w: 1000, h: 750 },
  { name: "event-4", themes: ["youth"], w: 1000, h: 750 },
  { name: "event-5", themes: ["community"], w: 1000, h: 750 },
  { name: "event-6", themes: ["couple", "community"], w: 1000, h: 750 },
  { name: "event-7", themes: ["worship", "congregation"], w: 1000, h: 750 },
  { name: "event-8", themes: ["prayer", "congregation"], w: 1000, h: 750 },

  // Blog (10)
  { name: "post-1",  themes: ["bible", "worship"], w: 1200, h: 800 },
  { name: "post-2",  themes: ["bible"], w: 1200, h: 800 },
  { name: "post-3",  themes: ["prayer", "bible"], w: 1200, h: 800 },
  { name: "post-4",  themes: ["community", "congregation"], w: 1200, h: 800 },
  { name: "post-5",  themes: ["prayer", "community"], w: 1200, h: 800 },
  { name: "post-6",  themes: ["prayer"], w: 1200, h: 800 },
  { name: "post-7",  themes: ["baptism"], w: 1200, h: 800 },
  { name: "post-8",  themes: ["bible"], w: 1200, h: 800 },
  { name: "post-9",  themes: ["portrait", "community"], w: 1200, h: 800 },
  { name: "post-10", themes: ["prayer", "congregation"], w: 1200, h: 800 },

  // Campamentos (4)
  { name: "camp-1", themes: ["kids", "outdoor"], w: 1000, h: 750 },
  { name: "camp-2", themes: ["youth", "outdoor"], w: 1000, h: 750 },
  { name: "camp-3", themes: ["community", "outdoor"], w: 1000, h: 750 },
  { name: "camp-4", themes: ["community", "prayer"], w: 1000, h: 750 },

  // Cursos (4)
  { name: "course-biblicos",    themes: ["bible"], w: 1200, h: 800 },
  { name: "course-jovenes",     themes: ["youth"], w: 1200, h: 800 },
  { name: "course-matrimonios", themes: ["couple", "community"], w: 1200, h: 800 },
  { name: "course-bautizos",    themes: ["baptism", "bible"], w: 1200, h: 800 },

  // Vídeos (6)
  ...Array.from({ length: 6 }, (_, i) => ({
    name: `video-${i + 1}`,
    themes: i % 2 ? ["congregation", "building"] : ["worship", "congregation"],
    w: 1280, h: 720,
  })),

  // Equipo (6) y avatares (6) — retratos
  ...Array.from({ length: 6 }, (_, i) => ({ name: `team-${i + 1}`, themes: ["portrait"], w: 600, h: 720 })),
  ...Array.from({ length: 6 }, (_, i) => ({ name: `avatar-${i + 1}`, themes: ["portrait"], w: 400, h: 400 })),
];

const ok = [];
for (const slot of SLOTS) {
  if (!existsSync(OUT)) break;
  if (await makeSlot(slot)) ok.push(slot.name);
}
console.log(`\n${ok.length}/${SLOTS.length} fotos aplicadas desde los sitios.`);
