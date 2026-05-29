"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ArrowUpRight, CalendarX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { formatDateShort } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import type { EventType, Locale } from "@/types";

/** Evento ya resuelto al idioma activo (serializable desde el server). */
export type AgendaEvent = {
  slug: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  image: string;
  excerpt: string;
};

const TYPES: EventType[] = [
  "conferencia",
  "concierto",
  "vigilia",
  "jovenes",
  "comida",
];

/**
 * Agenda de eventos con filtros por tipo. Vista lista ordenada por fecha con
 * tarjeta de fecha tipo calendario. Estado vacío cuando ningún evento coincide.
 */
export function EventsAgenda({
  events,
  locale,
}: {
  events: AgendaEvent[];
  locale: Locale;
}) {
  const t = useTranslations("events");
  const [active, setActive] = useState<EventType | "all">("all");

  const sorted = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

  const filtered = useMemo(
    () => (active === "all" ? sorted : sorted.filter((e) => e.type === active)),
    [sorted, active],
  );

  const filters: (EventType | "all")[] = ["all", ...TYPES];

  return (
    <div className="mt-12">
      {/* Filtros por tipo */}
      <div
        role="tablist"
        aria-label={t("kicker")}
        className="flex flex-wrap gap-2.5"
      >
        {filters.map((key) => {
          const selected = active === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
                selected
                  ? "bg-sky-500 text-paper shadow-soft"
                  : "bg-paper/70 text-sky-700 ring-1 ring-mist-200 hover:ring-sky-300",
              )}
            >
              {key === "all" ? t("all") : t(key)}
            </button>
          );
        })}
      </div>

      {/* Lista / agenda */}
      {filtered.length === 0 ? (
        <Reveal className="mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] bg-paper/60 px-6 py-20 text-center ring-1 ring-mist-200">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-500 ring-1 ring-sky-500/15">
            <CalendarX size={24} strokeWidth={1.6} />
          </span>
          <p className="max-w-md text-pretty text-lg text-mist-600">
            {t("empty")}
          </p>
        </Reveal>
      ) : (
        <ul className="mt-10 flex flex-col gap-5">
          {filtered.map((event, i) => {
            const date = formatDateShort(event.date, locale);
            return (
              <li key={event.slug}>
                <Reveal delay={i * 70}>
                  <Link
                    href={`/eventos/${event.slug}`}
                    className="group block rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    <Card
                      hover
                      className="flex flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6"
                    >
                      {/* Bloque fecha calendario */}
                      <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:justify-center">
                        <div className="flex w-20 shrink-0 flex-col items-center rounded-[var(--radius-sm)] bg-sky-50 px-3 py-3 text-center ring-1 ring-sky-500/15">
                          <span className="font-display text-3xl font-semibold leading-none text-sky-900">
                            {date.day}
                          </span>
                          <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky-600">
                            {date.month}
                          </span>
                        </div>
                      </div>

                      {/* Imagen */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-sm)] ring-1 ring-mist-200 sm:aspect-auto sm:w-44 sm:shrink-0">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 11rem"
                          placeholder="blur"
                          blurDataURL={BLUR}
                          className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Contenido */}
                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge tone="gold">{t(event.type)}</Badge>
                          <span className="inline-flex items-center gap-1.5 text-sm text-mist-600">
                            <Clock size={14} className="text-sky-500" />
                            {event.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-sm text-mist-600">
                            <MapPin size={14} className="text-gold-500" />
                            {event.location}
                          </span>
                        </div>

                        <h3 className="font-display text-xl text-balance text-sky-900 transition-colors group-hover:text-sky-700 lg:text-2xl">
                          {event.title}
                        </h3>

                        <p className="text-pretty text-mist-600">
                          {event.excerpt}
                        </p>

                        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-sky-700">
                          {t("details")}
                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
