"use client";

import { useTranslations } from "next-intl";
import { Play, Tv } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRadio } from "@/lib/radio-store";
import { site } from "@/config/site.config";
import type { Locale } from "@/types";

export function FooterLiveWidget({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations();
  const play = useRadio((s) => s.play);

  return (
    <div className="rounded-[var(--radius-sm)] bg-paper/10 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-300">
        {t("footer.live")}
      </p>
      <p className="mb-3 text-sm text-sky-100/70">{t("footer.liveWidget")}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-2 text-xs font-semibold text-sky-900 transition-colors hover:bg-gold-600"
        >
          <Play size={13} fill="currentColor" /> {site.media.radio.name}
        </button>
        <Link
          href="/tv"
          className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3.5 py-2 text-xs font-semibold text-paper transition-colors hover:bg-paper/20"
        >
          <Tv size={13} /> {t("nav.tv")}
        </Link>
      </div>
    </div>
  );
}
