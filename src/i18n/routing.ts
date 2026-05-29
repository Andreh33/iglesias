import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Prefijo siempre visible (/es, /en) para un toggle claro y SEO por idioma.
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
