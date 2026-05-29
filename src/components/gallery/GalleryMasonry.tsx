"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import type { GalleryCategory } from "@/types";

/** Item ya resuelto a string (serializable) para pasar de server a client. */
export type ResolvedGalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "tall" | "wide" | "normal";
};

const CATEGORIES: GalleryCategory[] = [
  "cultos",
  "comunidad",
  "bautizos",
  "campamentos",
  "eventos",
  "instalaciones",
];

const TOUCH_THRESHOLD = 48;

/**
 * Galería masonry (CSS multi-column) con filtros por categoría y lightbox
 * accesible. El lightbox abre al click, cierra con Esc/botón, navega con
 * flechas del teclado, botones prev/next y swipe táctil. Respeta el orden de
 * foco y bloquea el scroll del fondo mientras está abierto.
 */
export function GalleryMasonry({ items }: { items: ResolvedGalleryItem[] }) {
  const t = useTranslations("gallery");
  const labels = {
    all: t("all"),
    empty: t("empty"),
    open: t("open"),
    close: t("close"),
    prev: t("prev"),
    next: t("next"),
    imageOf: (n: number, total: number) => t("imageOf", { n, total }),
    category: (c: GalleryCategory) => t(c),
  };
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.category === filter),
    [items, filter],
  );

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = openIndex !== null;
  const total = visible.length;

  const open = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(null);
    // Devuelve el foco al disparador para continuidad de navegación.
    triggerRef.current?.focus();
  }, []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total));
  }, [total]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % total));
  }, [total]);

  // Cambiar de filtro cierra el lightbox para evitar índices fuera de rango.
  const changeFilter = useCallback((next: GalleryCategory | "all") => {
    setFilter(next);
    setOpenIndex(null);
  }, []);

  // Teclado global + bloqueo de scroll mientras el lightbox está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, goPrev, goNext]);

  const current = openIndex !== null ? visible[openIndex] : null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > TOUCH_THRESHOLD) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Filtros (pills) */}
      <div
        role="group"
        aria-label={labels.all}
        className="flex flex-wrap items-center gap-2.5"
      >
        <FilterPill
          active={filter === "all"}
          onClick={() => changeFilter("all")}
          label={labels.all}
        />
        {CATEGORIES.map((c) => (
          <FilterPill
            key={c}
            active={filter === c}
            onClick={() => changeFilter(c)}
            label={labels.category(c)}
          />
        ))}
      </div>

      {/* Masonry */}
      {visible.length === 0 ? (
        <p className="rounded-[var(--radius-md)] bg-paper/70 px-6 py-16 text-center text-mist-600 ring-1 ring-mist-200">
          {labels.empty}
        </p>
      ) : (
        <ul className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {visible.map((item, i) => (
            <li
              key={item.id}
              className="break-inside-avoid animate-rise"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  open(i);
                }}
                aria-label={`${labels.open}: ${item.alt}`}
                className="group relative block w-full overflow-hidden rounded-[var(--radius-md)] ring-1 ring-mist-200/70 shadow-soft transition-shadow duration-[var(--dur-mid)] hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.span === "wide" ? 900 : 640}
                  height={
                    item.span === "tall"
                      ? 880
                      : item.span === "wide"
                        ? 500
                        : 640
                  }
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="h-auto w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  loading={i < 4 ? "eager" : "lazy"}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-sky-900/40 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-[var(--dur-mid)] group-hover:opacity-100"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-sky-700 shadow-soft">
                    <ZoomIn size={18} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-sky-900/85 p-4 backdrop-blur-sm animate-fade sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            ref={closeBtnRef}
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-sky-900 shadow-lift transition-transform duration-[var(--dur-mid)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:right-6 sm:top-6"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label={labels.prev}
            className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-sky-900 shadow-lift transition-transform duration-[var(--dur-mid)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:left-6"
          >
            <ChevronLeft size={24} />
          </button>

          <figure
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative max-h-[78vh] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                width={1280}
                height={960}
                sizes="(max-width: 1024px) 100vw, 1024px"
                placeholder="blur"
                blurDataURL={BLUR}
                className="h-auto max-h-[78vh] w-full object-contain animate-fade"
                priority
              />
            </div>
            <figcaption className="flex flex-col items-center gap-1 text-center text-paper">
              <span className="text-pretty text-sm text-sky-100/90">
                {current.alt}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-sky-100/60">
                {labels.imageOf(openIndex + 1, total)}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={goNext}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-sky-900 shadow-lift transition-transform duration-[var(--dur-mid)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:right-6"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        active
          ? "bg-sky-500 text-paper shadow-soft"
          : "bg-paper/70 text-sky-700 ring-1 ring-mist-200 backdrop-blur hover:bg-paper hover:ring-sky-300",
      )}
    >
      {label}
    </button>
  );
}
