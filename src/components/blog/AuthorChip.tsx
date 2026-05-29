import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Chip de autoría: inicial del autor en círculo celeste + nombre y fecha.
 * Server component — resuelve traducción de "Por" y formatea la fecha.
 */
export async function AuthorChip({
  author,
  date,
  locale,
}: {
  author: string;
  date: string;
  locale: Locale;
}) {
  const t = await getTranslations("blog");
  const initial = author.trim().charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 font-display text-lg text-sky-700 ring-1 ring-sky-500/20"
      >
        {initial}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-mist-600">{t("by")}</span>
        <span className="font-semibold text-sky-900">{author}</span>
        <span className="text-sm text-mist-600">
          {formatDate(date, locale)}
        </span>
      </div>
    </div>
  );
}
