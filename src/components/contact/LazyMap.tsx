"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

/**
 * Mapa incrustado con carga diferida: el iframe sólo se monta cuando entra en
 * el viewport (IntersectionObserver) o tras pulsar el botón. Evita cargar
 * recursos de terceros hasta que el usuario realmente ve/usa el mapa.
 */
export function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);
  const t = useTranslations("media");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoad(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius-lg)] bg-sky-50 ring-1 ring-mist-200 shadow-soft"
    >
      {load ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoad(true)}
          className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-mesh text-sky-700 transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/80 text-sky-600 shadow-soft ring-1 ring-mist-200 backdrop-blur transition-transform group-hover:-translate-y-0.5">
            <MapPin size={22} strokeWidth={1.8} aria-hidden />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.14em]">
            {t("loadPlayer")}
          </span>
        </button>
      )}
    </div>
  );
}
