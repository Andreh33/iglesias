"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Pause, X } from "lucide-react";
import { site } from "@/config/site.config";
import { useRadio } from "@/lib/radio-store";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";

/**
 * Mini-player persistente: vive en el layout, así la radio sigue sonando al
 * navegar. Es el ÚNICO dueño del elemento <audio>. Nunca hace autoplay.
 */
export function RadioMiniPlayer({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations("media");
  const { started, playing, volume, miniVisible, toggle, hideMini } = useRadio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (playing) {
      audio.play().catch(() => useRadio.setState({ playing: false }));
    } else {
      audio.pause();
    }
  }, [playing, volume]);

  return (
    <>
      <audio ref={audioRef} src={site.media.radio.streamUrl} preload="none" />
      {started && miniVisible && (
        <div className="fixed inset-x-3 bottom-3 z-[65] sm:inset-x-auto sm:left-5 sm:max-w-sm">
          <div className="animate-rise flex items-center gap-3 rounded-full bg-deep py-2 pl-2 pr-4 text-paper shadow-lift noise-overlay">
            <div className="relative z-10 h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/40">
              <Image src={site.media.radio.logo} alt={site.media.radio.name} fill sizes="44px" className="object-cover" />
            </div>
            <div className="relative z-10 flex min-w-0 flex-col">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
                <span className={cn("h-1.5 w-1.5 rounded-full bg-gold-300", playing && "animate-pulse-live")} />
                {t("live")}
              </span>
              <span className="truncate text-sm font-medium">{site.media.radio.name}</span>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? t("pause") : t("play")}
              className="relative z-10 ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sky-900 transition-transform hover:scale-105"
            >
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={hideMini}
              aria-label={t("pause")}
              className="relative z-10 text-sky-100/60 hover:text-paper"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
