"use client";

import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { Plus } from "lucide-react";
import { t as tr } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";
import type { Belief } from "@/data/beliefs";

/**
 * Acordeón accesible de la declaración de fe.
 * - Botón con aria-expanded / aria-controls.
 * - Panel con role="region" y aria-labelledby.
 * - Navegación por teclado nativa (botones) + colapso/expansión por Enter/Espacio.
 */
export function BeliefsAccordion({ beliefs }: { beliefs: Belief[] }) {
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-mist-200 overflow-hidden rounded-[var(--radius-md)] bg-paper ring-1 ring-mist-200/70 shadow-soft">
      {beliefs.map((b, i) => {
        const expanded = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={btnId}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400"
              >
                <span className="flex items-center gap-4">
                  <span className="font-display text-sm font-semibold text-gold-600 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold text-sky-900">
                    {tr(b.title, locale)}
                  </span>
                </span>
                <Plus
                  size={20}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-sky-500 transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)]",
                    expanded && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className="px-6 pb-6 pl-[3.75rem] text-mist-600 text-pretty"
            >
              {tr(b.body, locale)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
