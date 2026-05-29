"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Radio, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site.config";

export function AnnouncementBar() {
  const t = useTranslations();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const next = site.services[0];

  return (
    <div className="relative z-50 bg-deep text-paper noise-overlay">
      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-center gap-3 px-5 py-2 text-sm sm:px-8">
        <span className="hidden items-center gap-2 font-medium sm:flex">
          <span className="inline-block h-1.5 w-1.5 animate-pulse-live rounded-full bg-gold-300" />
          {t("announcement.next")}:
        </span>
        <span className="text-sky-100/90">
          {t(next.dayKey)} · {next.time} · {t(next.titleKey)}
        </span>
        <Link
          href="/tv"
          className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-gold-500/90 px-3 py-0.5 text-xs font-semibold text-sky-900 transition-colors hover:bg-gold-500"
        >
          <Radio size={13} />
          {t("announcement.watchLive")}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t("common.close")}
          className="absolute right-4 text-sky-100/70 transition-colors hover:text-paper"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
