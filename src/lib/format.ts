import type { Locale } from "@/types";

/** Formatea un precio en EUR. IVA incluido en el copy de la ficha. */
export function formatPrice(amount: number, locale: Locale = "es"): string {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
