"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-store";
import type { Locale } from "@/types";

/**
 * Botón de añadir al carrito (cliente). El `name` llega YA resuelto al idioma
 * activo desde el Server Component que lo renderiza. Muestra feedback "Añadido"
 * durante 1.2s tras el clic.
 */
export function AddToCartButton({
  slug,
  name,
  price,
  image,
  options,
  quantity = 1,
  full = false,
  locale,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  options?: Record<string, string>;
  quantity?: number;
  full?: boolean;
  locale: Locale;
}) {
  const t = useTranslations("shop");
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // `locale` se conserva en la firma para coherencia con el resto de la tienda
  // y futuros usos (p. ej. mensajes localizados de error de stock).
  void locale;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleClick() {
    add({ slug, name, price, image, options }, quantity);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("addToCartAria", { name })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-tight",
        "transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        added
          ? "bg-gold-500 text-sky-900 shadow-[var(--shadow-glow)]"
          : "bg-sky-500 text-paper shadow-soft hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift",
        full && "w-full",
      )}
    >
      <span
        aria-live="polite"
        className="inline-flex items-center gap-2"
      >
        {added ? (
          <>
            <Check size={18} strokeWidth={2.2} />
            {t("added")}
          </>
        ) : (
          <>
            <ShoppingBag size={18} strokeWidth={1.8} />
            {t("addToCart")}
          </>
        )}
      </span>
    </button>
  );
}
