import type { Locale, LocalizedText } from "@/types";

/**
 * Resuelve un `LocalizedText` al idioma activo, con fallback al español.
 *
 * @example
 *   const locale = await getLocale();           // server
 *   t(product.name, locale)
 */
export function t(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.es;
}

/** Formatea una fecha ISO según el idioma activo. */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formatea una fecha ISO de forma corta (día + mes abreviado). */
export function formatDateShort(iso: string, locale: Locale) {
  const date = new Date(iso);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", opts).format(
      date,
    );
  return {
    day: fmt({ day: "2-digit" }),
    month: fmt({ month: "short" }).replace(".", "").toUpperCase(),
    weekday: fmt({ weekday: "long" }),
  };
}
