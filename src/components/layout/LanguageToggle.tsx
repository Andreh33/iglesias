"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/**
 * Toggle ES/EN funcional en TODA la web (incluido el blog y rutas dinámicas).
 * `usePathname` de next-intl devuelve la ruta sin prefijo de idioma, así que
 * `router.replace(pathname, { locale })` conserva la página actual al cambiar.
 * Los slugs de contenido son idénticos en ambos idiomas, por lo que /blog/[slug]
 * se mantiene al alternar.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const [pending, startTransition] = useTransition();

  const switchTo = (next: "es" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-paper/70 p-0.5 text-xs font-semibold ring-1 ring-mist-200 backdrop-blur",
        pending && "opacity-70",
        className,
      )}
      role="group"
      aria-label={t("label")}
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          aria-label={t("switchTo", { lang: t(l) })}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-sky-500 text-paper shadow-sm"
              : "text-mist-600 hover:text-sky-700",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
