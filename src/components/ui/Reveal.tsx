"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Revelado al hacer scroll: fade + translate-y. Respeta prefers-reduced-motion
 * (si está activo, el contenido aparece visible sin transición).
 * `delay` en ms para escalonar (stagger) dentro de grids.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] will-change-[opacity,transform]",
        shown ? "opacity-100 translate-y-0" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? undefined : `translateY(${y}px)`,
      }}
    >
      {children}
    </Tag>
  );
}
