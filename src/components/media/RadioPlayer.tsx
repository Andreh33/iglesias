"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Pause } from "lucide-react";
import { useRadio } from "@/lib/radio-store";
import { site } from "@/config/site.config";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";

/**
 * Reproductor grande de la página de radio. NO crea su propio <audio>: ese vive
 * en RadioMiniPlayer (layout) y es el único dueño del stream. Aquí solo
 * controlamos el estado del store (toggle/setVolume) y reflejamos playing.
 * Nunca hay autoplay: la reproducción solo arranca tras interacción del usuario.
 */
export function RadioPlayer() {
  const t = useTranslations("media");
  const playing = useRadio((s) => s.playing);
  const volume = useRadio((s) => s.volume);
  const toggle = useRadio((s) => s.toggle);
  const setVolume = useRadio((s) => s.setVolume);

  const radio = site.media.radio;

  // Barras del visualizador de ondas (animación CSS pura; se congela si !playing
  // y respeta prefers-reduced-motion vía motion-reduce:animate-none).
  const bars = [0.55, 0.85, 0.4, 1, 0.65, 0.9, 0.5, 0.75, 0.35];

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-deep p-6 text-paper shadow-lift noise-overlay sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh opacity-25"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-9">
        {/* Portada + estado en directo */}
        <div className="relative shrink-0">
          <div className="relative h-44 w-44 overflow-hidden rounded-[var(--radius-md)] shadow-lift ring-1 ring-paper/20 sm:h-52 sm:w-52">
            <Image
              src={radio.logo}
              alt={radio.name}
              fill
              sizes="(max-width: 640px) 11rem, 13rem"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-900 shadow-soft">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-sky-900",
                playing && "animate-pulse-live",
              )}
            />
            {t("live")}
          </span>
        </div>

        {/* Controles */}
        <div className="flex w-full min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">
              {t("nowPlaying")}
            </p>
            <h2 className="font-display text-3xl text-paper">{radio.name}</h2>
            <p className="text-pretty text-sky-100/75">{t("radioIntro")}</p>
          </div>

          {/* Visualizador de ondas */}
          <div
            aria-hidden
            className="flex h-12 items-end justify-center gap-1 sm:justify-start"
          >
            {bars.map((h, i) => (
              <span
                key={i}
                className={cn(
                  "w-1.5 rounded-full bg-gradient-to-t from-sky-400 to-gold-300",
                  playing ? "animate-float" : "opacity-50",
                  "motion-reduce:animate-none",
                  `delay-${(i % 6) + 1}`,
                )}
                style={{
                  height: `${Math.round(h * 100)}%`,
                  animationDuration: playing ? `${0.9 + (i % 4) * 0.25}s` : undefined,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? t("pause") : t("play")}
              aria-pressed={playing}
              className="group inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sky-900 shadow-[var(--shadow-glow)] transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:scale-105 hover:bg-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              {playing ? (
                <Pause size={32} className="fill-current" />
              ) : (
                <Play size={32} className="ml-1 fill-current" />
              )}
            </button>

            {/* Control de volumen */}
            <label className="flex w-full min-w-0 flex-col gap-2">
              <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sky-100/70">
                {t("volume")}
                <span className="tabular-nums text-gold-300">
                  {Math.round(volume * 100)}%
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label={t("volume")}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-paper/20 accent-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
