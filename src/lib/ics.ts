// ───────────────────────────────────────────────────────────────────────────
//  Generador de archivos .ics (iCalendar) para "Añadir al calendario".
//  Produce un VCALENDAR/VEVENT mínimo pero válido (RFC 5545) y un data URI
//  listo para usar en un enlace de descarga. Sin dependencias.
// ───────────────────────────────────────────────────────────────────────────

export type IcsEvent = {
  title: string;
  description: string;
  location: string;
  /** ISO date (yyyy-mm-dd). */
  date: string;
  /** "HH:MM". */
  time: string;
  /** "HH:MM" opcional; si no se indica, +2h sobre la hora de inicio. */
  endTime?: string;
};

/** Escapa texto según RFC 5545 (comas, puntos y comas, barras y saltos). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Combina fecha ISO + "HH:MM" en el formato local flotante YYYYMMDDTHHMMSS. */
function toIcsDateTime(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [hh, mm] = time.split(":");
  const yyyy = (y ?? "1970").padStart(4, "0");
  const mo = (m ?? "01").padStart(2, "0");
  const dd = (d ?? "01").padStart(2, "0");
  const h = (hh ?? "00").padStart(2, "0");
  const mi = (mm ?? "00").padStart(2, "0");
  return `${yyyy}${mo}${dd}T${h}${mi}00`;
}

/** Suma horas a un "HH:MM" devolviendo otro "HH:MM" (módulo 24h). */
function addHours(time: string, hours: number): string {
  const [hh, mm] = time.split(":");
  const total = (Number(hh ?? 0) * 60 + Number(mm ?? 0) + hours * 60) % (24 * 60);
  const norm = (total + 24 * 60) % (24 * 60);
  const h = Math.floor(norm / 60)
    .toString()
    .padStart(2, "0");
  const m = (norm % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Marca temporal UTC (DTSTAMP). Fija para SSR determinista por evento. */
function dtStamp(date: string): string {
  const [y, m, d] = date.split("-");
  return `${(y ?? "1970").padStart(4, "0")}${(m ?? "01").padStart(2, "0")}${(d ?? "01").padStart(2, "0")}T000000Z`;
}

/**
 * Construye el contenido de un archivo .ics (VCALENDAR con un VEVENT).
 * Las líneas se unen con CRLF como exige el estándar.
 */
export function buildIcs(ev: IcsEvent): string {
  const start = toIcsDateTime(ev.date, ev.time);
  const end = toIcsDateTime(ev.date, ev.endTime ?? addHours(ev.time, 2));
  const uid = `${ev.date.replace(/-/g, "")}-${ev.time.replace(":", "")}@nuevavida`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Iglesia Evangelica Nueva Vida//Eventos//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp(ev.date)}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeText(ev.title)}`,
    `DESCRIPTION:${escapeText(ev.description)}`,
    `LOCATION:${escapeText(ev.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Devuelve el .ics como data URI listo para `href` de descarga. */
export function icsDataUri(ev: IcsEvent): string {
  const content = buildIcs(ev);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}
