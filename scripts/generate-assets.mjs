// Generador de assets demo (SVG) para la plantilla.
// Crea placeholders temáticos "Luz y cielo" + logo, sello FEREDE, texturas.
// Ejecuta: node scripts/generate-assets.mjs
// Sustituye estos SVG por fotos reales (jpg/webp) en producción.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");

const write = (rel, content) => {
  const file = join(PUB, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, "utf8");
};

// Paleta celeste/champán
const SKY = {
  light: "#eaf6fd",
  l2: "#b6dcf3",
  mid: "#5fb3e2",
  primary: "#3fa7e0",
  deep: "#1c5c8c",
  ink: "#0e2a40",
  gold: "#d9b36a",
  goldL: "#f0dba8",
  paper: "#ffffff",
};

// PRNG sencillo y determinista por semilla (string → número)
function rng(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Motivos decorativos según tema
function motif(kind, r, w, h) {
  const cx = w * (0.3 + r() * 0.4);
  const cy = h * (0.22 + r() * 0.2);
  switch (kind) {
    case "sun":
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(Math.min(w, h) * 0.18).toFixed(0)}" fill="${SKY.goldL}" opacity="0.7"/>
        <circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(Math.min(w, h) * 0.12).toFixed(0)}" fill="${SKY.gold}" opacity="0.55"/>`;
    case "hills":
      return `<path d="M0 ${h * 0.78} Q ${w * 0.3} ${h * 0.62} ${w * 0.55} ${h * 0.74} T ${w} ${h * 0.72} V ${h} H 0 Z" fill="${SKY.deep}" opacity="0.18"/>
        <path d="M0 ${h * 0.88} Q ${w * 0.4} ${h * 0.74} ${w * 0.7} ${h * 0.86} T ${w} ${h * 0.84} V ${h} H 0 Z" fill="${SKY.deep}" opacity="0.28"/>`;
    case "cross":
      return `<g opacity="0.16" fill="${SKY.deep}"><rect x="${cx - 8}" y="${cy - 40}" width="16" height="100" rx="4"/><rect x="${cx - 34}" y="${cy - 8}" width="68" height="16" rx="4"/></g>`;
    case "waves":
      return `<path d="M0 ${h * 0.7} q ${w * 0.12} -22 ${w * 0.24} 0 t ${w * 0.24} 0 t ${w * 0.24} 0 t ${w * 0.24} 0" fill="none" stroke="${SKY.paper}" stroke-width="3" opacity="0.5"/>
        <path d="M0 ${h * 0.82} q ${w * 0.12} -22 ${w * 0.24} 0 t ${w * 0.24} 0 t ${w * 0.24} 0 t ${w * 0.24} 0" fill="none" stroke="${SKY.paper}" stroke-width="3" opacity="0.35"/>`;
    case "dove":
      return `<g opacity="0.5" fill="${SKY.paper}"><path d="M${cx} ${cy} q 24 -18 48 -6 q -14 4 -22 16 q 18 -2 30 8 q -20 6 -40 0 q -10 14 -28 14 q 10 -16 4 -30 q -16 8 -30 4 q 18 -12 38 -10 q 14 -8 0 -10 q 18 -2 28 24 z"/></g>`;
    default:
      return "";
  }
}

function placeholder({ name, w = 1200, h = 900, a, b, kind = "sun", label }) {
  const r = rng(name);
  const g1 = a || SKY.light;
  const g2 = b || SKY.mid;
  const angle = (r() * 60 + 110).toFixed(0);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0" stop-color="${g1}"/>
      <stop offset="1" stop-color="${g2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${(0.3 + r() * 0.4).toFixed(2)}" cy="0.2" r="0.8">
      <stop offset="0" stop-color="${SKY.goldL}" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="${SKY.goldL}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${motif(kind, r, w, h)}
  ${label ? `<text x="${w / 2}" y="${h - 28}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 34)}" fill="${SKY.paper}" opacity="0.6" font-style="italic">${label}</text>` : ""}
</svg>`;
  write(name, svg);
}

function avatar(name, initials) {
  const r = rng(name);
  const hue = [SKY.primary, SKY.deep, SKY.mid, SKY.gold][Math.floor(r() * 4)];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs><linearGradient id="a" gradientTransform="rotate(135)"><stop offset="0" stop-color="${SKY.light}"/><stop offset="1" stop-color="${hue}"/></linearGradient></defs>
  <rect width="400" height="400" fill="url(#a)"/>
  <circle cx="200" cy="160" r="72" fill="${SKY.paper}" opacity="0.85"/>
  <path d="M70 360 q130 -150 260 0 z" fill="${SKY.paper}" opacity="0.85"/>
  <text x="200" y="180" text-anchor="middle" font-family="Georgia, serif" font-size="84" fill="${SKY.deep}" opacity="0.5">${initials}</text>
</svg>`;
  write(name, svg);
}

// ── Texturas ────────────────────────────────────────────────────────────────
write(
  "textures/noise.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="180" height="180" filter="url(#n)"/></svg>`,
);

// ── Logo ──────────────────────────────────────────────────────────────────
write(
  "brand/logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="44" viewBox="0 0 200 44">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${SKY.primary}"/><stop offset="1" stop-color="${SKY.deep}"/></linearGradient></defs>
  <g>
    <circle cx="22" cy="22" r="20" fill="url(#lg)"/>
    <path d="M22 9 v26 M13 18 h18" stroke="${SKY.paper}" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="22" cy="22" r="20" fill="none" stroke="${SKY.gold}" stroke-width="1.4" opacity="0.7"/>
  </g>
  <text x="52" y="20" font-family="Georgia, serif" font-size="18" fill="${SKY.ink}" font-weight="600">Nueva Vida</text>
  <text x="52" y="35" font-family="Helvetica, sans-serif" font-size="9.5" letter-spacing="2.5" fill="${SKY.deep}" opacity="0.7">IGLESIA EVANGÉLICA</text>
</svg>`,
);

// Logo monocromo claro (footer/header oscuro)
write(
  "brand/logo-light.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="44" viewBox="0 0 200 44">
  <g>
    <circle cx="22" cy="22" r="20" fill="${SKY.paper}" opacity="0.12"/>
    <path d="M22 9 v26 M13 18 h18" stroke="${SKY.paper}" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="22" cy="22" r="20" fill="none" stroke="${SKY.gold}" stroke-width="1.4" opacity="0.8"/>
  </g>
  <text x="52" y="20" font-family="Georgia, serif" font-size="18" fill="${SKY.paper}" font-weight="600">Nueva Vida</text>
  <text x="52" y="35" font-family="Helvetica, sans-serif" font-size="9.5" letter-spacing="2.5" fill="${SKY.paper}" opacity="0.65">IGLESIA EVANGÉLICA</text>
</svg>`,
);

// ── Sello FEREDE (placeholder neutro, NO el logo oficial) ────────────────────
write(
  "brand/ferede-placeholder.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="Sello placeholder de afiliación">
  <circle cx="80" cy="80" r="76" fill="none" stroke="${SKY.deep}" stroke-width="2" opacity="0.55"/>
  <circle cx="80" cy="80" r="64" fill="none" stroke="${SKY.gold}" stroke-width="1" opacity="0.7"/>
  <path d="M80 52 v34 M66 64 h28" stroke="${SKY.deep}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <text x="80" y="118" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="11" letter-spacing="1.5" fill="${SKY.deep}" opacity="0.75">MIEMBRO</text>
  <text x="80" y="134" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="9" letter-spacing="1" fill="${SKY.deep}" opacity="0.55">(placeholder)</text>
  <path id="arc" d="M24 80 A56 56 0 0 1 136 80" fill="none"/>
  <text font-family="Georgia, serif" font-size="12" fill="${SKY.deep}" opacity="0.7"><textPath href="#arc" startOffset="50%" text-anchor="middle">· AFILIACIÓN ·</textPath></text>
</svg>`,
);

// Radio cover
placeholder({ name: "brand/radio-cover.svg", w: 600, h: 600, a: SKY.deep, b: SKY.primary, kind: "waves", label: "Radio Nueva Vida" });

// ── Imágenes temáticas ───────────────────────────────────────────────────────
placeholder({ name: "images/hero-sky.svg", w: 1600, h: 1100, a: SKY.light, b: SKY.mid, kind: "sun" });
placeholder({ name: "images/about-1.svg", w: 1000, h: 1200, a: SKY.l2, b: SKY.primary, kind: "dove" });
placeholder({ name: "images/pastor.svg", w: 900, h: 1100, a: SKY.light, b: SKY.l2, kind: "sun" });
placeholder({ name: "images/og-default.svg", w: 1200, h: 630, a: SKY.light, b: SKY.primary, kind: "sun", label: "Iglesia Nueva Vida" });
placeholder({ name: "images/camps-hero.svg", w: 1600, h: 1000, a: SKY.mid, b: SKY.deep, kind: "hills" });

const themes = ["sun", "hills", "cross", "waves", "dove"];
const pairs = [
  [SKY.light, SKY.mid],
  [SKY.l2, SKY.primary],
  [SKY.mid, SKY.deep],
  [SKY.light, SKY.l2],
  [SKY.primary, SKY.deep],
];
const pick = (i, arr) => arr[i % arr.length];

// Eventos
for (let i = 1; i <= 8; i++)
  placeholder({ name: `images/event-${i}.svg`, w: 1000, h: 750, ...{ a: pick(i, pairs)[0], b: pick(i, pairs)[1] }, kind: pick(i, themes) });
// Productos
for (let i = 1; i <= 18; i++)
  placeholder({ name: `images/product-${i}.svg`, w: 900, h: 1100, a: SKY.paper, b: pick(i, pairs)[Math.floor((i % 2))], kind: pick(i + 2, themes) });
// Blog
for (let i = 1; i <= 10; i++)
  placeholder({ name: `images/post-${i}.svg`, w: 1200, h: 800, a: pick(i, pairs)[0], b: pick(i, pairs)[1], kind: pick(i + 1, themes) });
// Galería
for (let i = 1; i <= 18; i++)
  placeholder({ name: `images/gallery-${i}.svg`, w: 900, h: i % 3 === 0 ? 1200 : 700, a: pick(i, pairs)[0], b: pick(i, pairs)[1], kind: pick(i, themes) });
// Instalaciones
for (let i = 1; i <= 8; i++)
  placeholder({ name: `images/facility-${i}.svg`, w: 1200, h: 800, a: pick(i, pairs)[0], b: pick(i, pairs)[1], kind: pick(i + 3, themes) });
// Campamentos
for (let i = 1; i <= 4; i++)
  placeholder({ name: `images/camp-${i}.svg`, w: 1100, h: 850, a: SKY.mid, b: SKY.deep, kind: "hills" });
// Cursos
for (const k of ["biblicos", "jovenes", "matrimonios", "bautizos"])
  placeholder({ name: `images/course-${k}.svg`, w: 1200, h: 800, a: SKY.l2, b: SKY.primary, kind: "cross" });
// Vídeos TV
for (let i = 1; i <= 6; i++)
  placeholder({ name: `images/video-${i}.svg`, w: 1280, h: 720, a: SKY.deep, b: SKY.primary, kind: "waves", label: "Culto" });

// Avatares testimonios
const initialsT = ["MJ", "DR", "LP", "AF", "CG", "SM"];
for (let i = 1; i <= 6; i++) avatar(`images/avatar-${i}.svg`, initialsT[i - 1]);
// Equipo
const initialsTeam = ["DP", "RM", "EL", "JC", "AN", "PS"];
for (let i = 1; i <= 6; i++) avatar(`images/team-${i}.svg`, initialsTeam[i - 1]);

console.log("✓ Assets demo generados en /public");
