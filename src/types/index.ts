// ───────────────────────────────────────────────────────────────────────────
//  Tipos centrales de la plantilla
//  Todo el contenido es bilingüe: usa `LocalizedText` y resuélvelo con
//  `t()` de `@/lib/i18n` pasando el `locale` activo.
// ───────────────────────────────────────────────────────────────────────────

export type Locale = "es" | "en";

/** Texto que existe en los dos idiomas soportados. */
export type LocalizedText = Record<Locale, string>;

// ── Tienda ───────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "biblias"
  | "joyeria"
  | "ropa"
  | "libros"
  | "musica"
  | "regalos";

export type ProductBadge = "nuevo" | "oferta" | "mas-vendido";

export type ProductOption = {
  name: LocalizedText;
  values: string[];
};

export type Product = {
  slug: string;
  name: LocalizedText;
  category: ProductCategory;
  /** Precio en EUR (número con 2 decimales). */
  price: number;
  /** Precio anterior tachado, opcional. */
  compareAt?: number;
  images: string[];
  shortDescription: LocalizedText;
  description: LocalizedText;
  options?: ProductOption[];
  stock: number;
  badges?: ProductBadge[];
  rating?: number;
};

// ── Blog ───────────────────────────────────────────────────────────────────

export type PostCategory =
  | "ensenanzas"
  | "versiculos"
  | "vida-cristiana"
  | "testimonios"
  | "familia";

export type PostBlock =
  | { type: "p"; text: LocalizedText }
  | { type: "h2"; text: LocalizedText }
  | { type: "verse"; text: LocalizedText; reference: LocalizedText }
  | { type: "quote"; text: LocalizedText; cite?: LocalizedText };

export type Post = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: PostCategory;
  author: string;
  /** ISO date (yyyy-mm-dd). */
  date: string;
  /** Minutos de lectura. */
  readingTime: number;
  cover: string;
  featured?: boolean;
  body: PostBlock[];
};

// ── Eventos ──────────────────────────────────────────────────────────────────

export type EventType =
  | "conferencia"
  | "concierto"
  | "vigilia"
  | "jovenes"
  | "comida";

export type ChurchEvent = {
  slug: string;
  title: LocalizedText;
  type: EventType;
  /** ISO date. */
  date: string;
  /** "19:30". */
  time: string;
  endTime?: string;
  location: LocalizedText;
  image: string;
  excerpt: LocalizedText;
  description: LocalizedText;
};

// ── Cursos ───────────────────────────────────────────────────────────────────

export type CourseKey = "biblicos" | "jovenes" | "matrimonios" | "bautizos";

export type CourseModule = {
  title: LocalizedText;
  description: LocalizedText;
};

export type Course = {
  key: CourseKey;
  icon: string;
  title: LocalizedText;
  tagline: LocalizedText;
  audience: LocalizedText;
  duration: LocalizedText;
  format: LocalizedText;
  facilitator: string;
  description: LocalizedText;
  modules: CourseModule[];
};

// ── Campamentos ──────────────────────────────────────────────────────────────

export type Camp = {
  slug: string;
  title: LocalizedText;
  ages: LocalizedText;
  dates: LocalizedText;
  place: LocalizedText;
  price: number;
  spots: number;
  image: string;
  description: LocalizedText;
};

// ── Galería ──────────────────────────────────────────────────────────────────

export type GalleryCategory =
  | "cultos"
  | "comunidad"
  | "bautizos"
  | "campamentos"
  | "eventos"
  | "instalaciones";

export type GalleryItem = {
  id: string;
  src: string;
  alt: LocalizedText;
  category: GalleryCategory;
  /** Relación de aspecto para el mosaico masonry. */
  span?: "tall" | "wide" | "normal";
};

// ── Instalaciones ─────────────────────────────────────────────────────────────

export type Facility = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  details: LocalizedText[];
  highlight?: boolean;
};

// ── Testimonios ──────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string;
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
  avatar: string;
};

// ── Equipo pastoral ──────────────────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  avatar: string;
};

// ── Parrilla radio / TV ───────────────────────────────────────────────────────

export type ScheduleSlot = {
  day: LocalizedText;
  time: string;
  title: LocalizedText;
  kind: LocalizedText;
};

export type VideoItem = {
  id: string;
  title: LocalizedText;
  thumbnail: string;
  duration: string;
  date: string;
};
