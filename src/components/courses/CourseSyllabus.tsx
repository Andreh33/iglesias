"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { t as tr } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { CourseModule, Locale } from "@/types";

/**
 * Temario en acordeón accesible (namespace "courses").
 * - Cada cabecera es un <button> con aria-expanded/aria-controls.
 * - Navegación por teclado nativa (botones enfocables) + flechas arriba/abajo
 *   para moverse entre módulos.
 * - El panel se controla por estado; respeta prefers-reduced-motion vía CSS.
 */
export function CourseSyllabus({
  modules,
  locale,
}: {
  modules: CourseModule[];
  locale: Locale;
}) {
  const t = useTranslations("courses");
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i));

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = modules.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      const el = document.getElementById(`${baseId}-trigger-${next}`);
      el?.focus();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl font-semibold text-sky-900">
          {t("syllabus")}
        </h3>
        <p className="text-sm text-mist-600">{t("syllabusHint")}</p>
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {modules.map((m, i) => {
          const isOpen = open === i;
          const triggerId = `${baseId}-trigger-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li
              key={i}
              className="overflow-hidden rounded-[var(--radius-md)] bg-paper ring-1 ring-mist-200/70"
            >
              <h4>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-sky-50/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/12 font-display text-sm font-semibold text-sky-600">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold text-sky-900">
                    {tr(m.title, locale)}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden
                    className={cn(
                      "shrink-0 text-sky-600 transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h4>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className="px-5 pb-5 pl-[4.5rem]"
              >
                <p className="text-pretty text-mist-600">
                  {tr(m.description, locale)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
