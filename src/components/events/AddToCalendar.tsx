"use client";

import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { icsDataUri, type IcsEvent } from "@/lib/ics";
import { cn } from "@/lib/cn";

/**
 * Botón "Añadir al calendario": genera un .ics al vuelo (data URI) y fuerza la
 * descarga. El nombre de archivo se deriva del slug del evento.
 */
export function AddToCalendar({
  event,
  fileName,
  className,
}: {
  event: IcsEvent;
  fileName: string;
  className?: string;
}) {
  const t = useTranslations("events");

  const handleDownload = () => {
    const href = icsDataUri(event);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-paper/70 px-6 py-3 text-[0.95rem] font-medium tracking-tight text-sky-900 shadow-soft ring-1 ring-mist-200 backdrop-blur transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-paper hover:ring-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        className,
      )}
    >
      <CalendarPlus size={18} className="text-gold-500" />
      {t("addToCalendar")}
    </button>
  );
}
