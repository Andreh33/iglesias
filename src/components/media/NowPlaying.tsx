import { getTranslations, getLocale } from "next-intl/server";
import { Radio } from "lucide-react";
import { t as tr } from "@/lib/i18n";
import { radioSchedule } from "@/data/schedule";
import type { Locale } from "@/types";

/**
 * Programa actual de la radio (toma el primer slot de la parrilla como demo).
 * Server Component: no necesita estado de cliente.
 */
export async function NowPlaying() {
  const t = await getTranslations("media");
  const locale = (await getLocale()) as Locale;
  const slot = radioSchedule[0];

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 ring-1 ring-sky-500/20">
        <Radio size={14} className="text-gold-500" />
        {t("nowPlaying")}
      </span>

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-sky-900">
          {tr(slot.title, locale)}
        </h3>
        <p className="text-mist-600">
          {tr(slot.day, locale)} · {slot.time} · {tr(slot.kind, locale)}
        </p>
      </div>

      <p className="text-pretty text-mist-600">{t("nowPlayingDesc")}</p>
    </div>
  );
}
