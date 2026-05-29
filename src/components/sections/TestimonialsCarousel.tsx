"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";

/** Testimonio ya resuelto a string (serializable) para pasar de server a client. */
export type ResolvedTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

/**
 * Carrusel de testimonios con embla (SIN autoplay). Navegación por botones,
 * teclado (flechas) y puntos. Accesible (roles, aria-labels) y respeta el
 * scroll-snap nativo de embla. Sección oscura → textos claros.
 */
export function TestimonialsCarousel({
  items,
  labels,
}: {
  items: ResolvedTestimonial[];
  labels: { prev: string; next: string };
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="group"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="flex touch-pan-y">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-full px-3 sm:basis-[80%] lg:basis-[58%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
            >
              <figure className="flex h-full flex-col gap-6 rounded-[var(--radius-lg)] border border-paper/10 bg-paper/[0.06] p-8 backdrop-blur-sm sm:p-10">
                <Quote
                  aria-hidden
                  className="text-gold-300"
                  size={36}
                  strokeWidth={1.4}
                />
                <blockquote className="font-display text-2xl italic leading-snug text-paper text-balance sm:text-[1.75rem]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-300/40">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="56px"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-lg text-paper">
                      {item.name}
                    </span>
                    <span className="text-sm uppercase tracking-[0.14em] text-sky-100/70">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={labels.prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/20 backdrop-blur transition-all duration-[var(--dur-mid)] hover:bg-paper/20 hover:ring-gold-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`${i + 1} / ${snaps.length}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-[var(--dur-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
                i === selected
                  ? "w-7 bg-gold-300"
                  : "w-2 bg-paper/30 hover:bg-paper/50",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label={labels.next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/20 backdrop-blur transition-all duration-[var(--dur-mid)] hover:bg-paper/20 hover:ring-gold-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
