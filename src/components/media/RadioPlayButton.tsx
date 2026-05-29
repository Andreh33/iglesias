"use client";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRadio } from "@/lib/radio-store";
import { cn } from "@/lib/cn";

/**
 * Botón cliente que inicia la radio (nunca autoplay): al pulsarlo llama a
 * play() del store, que activa el mini-player de la barra inferior.
 */
export function RadioPlayButton({ className }: { className?: string }) {
  const t = useTranslations("media");
  const play = useRadio((s) => s.play);

  return (
    <button
      type="button"
      onClick={play}
      aria-label={t("play")}
      className={cn(
        "group/play inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-sky-900 shadow-[var(--shadow-glow)] transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:scale-105 hover:bg-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
        className,
      )}
    >
      <Play size={24} className="ml-0.5 fill-current" />
    </button>
  );
}
