"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Star } from "lucide-react";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import { t as tr } from "@/lib/i18n";
import type { Locale, Product } from "@/types";

/**
 * Ficha interactiva de producto (cliente): galería con miniaturas, selector de
 * opciones, control de cantidad y AddToCart. El `product` llega serializado
 * (datos planos) desde el Server Component de la página.
 */
export function ProductDetail({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useTranslations("shop");

  const name = tr(product.name, locale);
  const soldOut = product.stock <= 0;
  const onSale =
    product.compareAt !== undefined && product.compareAt > product.price;

  // Imagen activa de la galería.
  const [activeImage, setActiveImage] = useState(0);

  // Opciones seleccionadas: por defecto, el primer valor de cada opción.
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options?.forEach((opt) => {
      initial[tr(opt.name, locale)] = opt.values[0];
    });
    return initial;
  });

  const [quantity, setQuantity] = useState(1);

  const maxQty = Math.max(1, Math.min(product.stock, 10));

  const optionsForCart = useMemo<Record<string, string> | undefined>(() => {
    return Object.keys(selected).length > 0 ? selected : undefined;
  }, [selected]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Galería */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-sky-50 ring-1 ring-mist-200/70 shadow-soft">
          <Image
            src={product.images[activeImage]}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        </div>

        {product.images.length > 1 && (
          <ul
            className="flex flex-wrap gap-3"
            role="list"
            aria-label={name}
          >
            {product.images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`${name} ${i + 1}`}
                  aria-current={i === activeImage}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-[var(--radius-sm)] bg-sky-50 transition-all duration-[var(--dur-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                    i === activeImage
                      ? "ring-2 ring-sky-500"
                      : "ring-1 ring-mist-200 hover:ring-sky-300",
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80px"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detalle */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            {t(product.category)}
          </span>
          <h1 className="font-display text-3xl font-semibold leading-tight text-sky-900 text-balance lg:text-4xl">
            {name}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl font-semibold text-sky-900">
              {formatPrice(product.price, locale)}
            </span>
            {onSale && product.compareAt !== undefined && (
              <span className="text-lg text-mist-400 line-through">
                {formatPrice(product.compareAt, locale)}
              </span>
            )}
            {product.rating !== undefined && (
              <span
                className="inline-flex items-center gap-1 text-sm font-medium text-sky-900"
                aria-label={t("ratingLabel", {
                  rating: product.rating.toFixed(1),
                })}
              >
                <Star
                  size={16}
                  className="fill-gold-500 text-gold-500"
                  aria-hidden
                />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <p
            className={cn(
              "text-sm font-semibold",
              soldOut ? "text-mist-400" : "text-sky-600",
            )}
          >
            {soldOut ? t("outOfStock") : t("inStock")}
          </p>
        </div>

        <p className="text-lg text-mist-600 text-pretty">
          {tr(product.shortDescription, locale)}
        </p>

        {/* Opciones */}
        {product.options?.map((opt) => {
          const label = tr(opt.name, locale);
          return (
            <fieldset key={label} className="flex flex-col gap-2">
              <legend className="text-sm font-semibold text-sky-900">
                {t("selectOption", { option: label })}
              </legend>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((value) => {
                  const isActive = selected[label] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setSelected((prev) => ({ ...prev, [label]: value }))
                      }
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                        isActive
                          ? "bg-sky-500 text-paper shadow-soft"
                          : "bg-paper text-sky-700 ring-1 ring-mist-200 hover:ring-sky-300",
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        {/* Cantidad + carrito */}
        {!soldOut && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-sky-900">
                {t("quantity")}
              </span>
              <div className="flex items-center rounded-full ring-1 ring-mist-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="−"
                  className="flex h-10 w-10 items-center justify-center text-sky-700 transition-colors hover:text-sky-500 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <Minus size={16} />
                </button>
                <span
                  className="w-9 text-center font-medium text-sky-900"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  aria-label="+"
                  className="flex h-10 w-10 items-center justify-center text-sky-700 transition-colors hover:text-sky-500 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 self-end">
              <AddToCartButton
                slug={product.slug}
                name={name}
                price={product.price}
                image={product.images[0]}
                options={optionsForCart}
                quantity={quantity}
                locale={locale}
              />
            </div>
          </div>
        )}

        <p className="text-sm text-mist-600">{t("vatIncluded")}</p>

        {/* Descripción editorial */}
        <div className="mt-2 flex flex-col gap-3 border-t border-mist-200 pt-6">
          <h2 className="font-display text-xl font-semibold text-sky-900">
            {t("description")}
          </h2>
          <p className="text-pretty leading-relaxed text-mist-600">
            {tr(product.description, locale)}
          </p>
        </div>

        {/* Envíos y devoluciones */}
        <div className="rounded-[var(--radius-md)] bg-sky-50 p-5 ring-1 ring-sky-200/60">
          <h2 className="font-display text-base font-semibold text-sky-900">
            {t("shipping")}
          </h2>
          <p className="mt-1 text-sm text-mist-600 text-pretty">
            {t("shippingInfo")}
          </p>
        </div>
      </div>
    </div>
  );
}
