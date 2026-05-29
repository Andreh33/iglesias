"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Tv } from "lucide-react";
import { site } from "@/config/site.config";
import { BLUR } from "@/lib/img";

/**
 * Reproductor de TV con iframe DIFERIDO: el iframe no se monta (ni hace ninguna
 * petición de red) hasta que la persona pulsa "Cargar reproductor". Nunca hay
 * autoplay al cargar la página. Soporta proveedor "youtube" (embed por ID) o
 * "iframe" (liveEmbed personalizado).
 */
export function TvPlayer() {
  const t = useTranslations("media");
  const [loaded, setLoaded] = useState(false);

  const tv = site.media.tv;
  const src =
    tv.provider === "youtube"
      ? `https://www.youtube.com/embed/${tv.channelOrVideoId}?rel=0`
      : tv.liveEmbed;
  const thumbnail =
    tv.provider === "youtube"
      ? `https://i.ytimg.com/vi/${tv.channelOrVideoId}/maxresdefault.jpg`
      : site.media.radio.logo;

  const canPlay = src.length > 0;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-deep shadow-lift ring-1 ring-paper/15 noise-overlay">
      {loaded && canPlay ? (
        <iframe
          src={src}
          title={t("tvTitle")}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <Image
            src={thumbnail}
            alt={t("liveNow")}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover opacity-50"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-sky-900 via-sky-900/60 to-sky-900/20"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-gold-500/25">
              <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-gold-300" />
              <Tv size={14} />
              {t("liveNow")}
            </span>

            <button
              type="button"
              onClick={() => setLoaded(true)}
              disabled={!canPlay}
              className="group inline-flex items-center gap-3 rounded-full bg-gold-500 px-7 py-4 text-base font-medium text-sky-900 shadow-[var(--shadow-glow)] transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:scale-[1.03] hover:bg-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Play size={22} className="fill-current" />
              {canPlay ? t("loadPlayer") : t("offAir")}
            </button>

            {canPlay && (
              <p className="max-w-sm text-pretty text-sm text-sky-100/70">
                {t("loadPlayerHint")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
