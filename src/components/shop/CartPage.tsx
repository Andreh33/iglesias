"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCart, selectSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

// Umbral de envío gratis (demo) y coste de envío fijo bajo ese umbral.
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 3.95;

/**
 * Página de carrito (cliente): listado editable, control de cantidades,
 * resumen con subtotal, envío demo y total, y CTA al checkout.
 */
export function CartPage({ locale }: { locale: Locale }) {
  const t = useTranslations("cart");
  const { items, setQuantity, remove } = useCart();
  const subtotal = useCart(selectSubtotal);

  if (items.length === 0) {
    return (
      <Section tone="ivory">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-10 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-400">
            <ShoppingBag size={34} strokeWidth={1.6} />
          </span>
          <h1 className="font-display text-3xl font-semibold text-sky-900">
            {t("empty")}
          </h1>
          <p className="text-mist-600 text-pretty">{t("emptyDesc")}</p>
          <Button href="/tienda" variant="primary" size="lg">
            {t("goShop")}
            <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    );
  }

  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <Section tone="ivory">
      <SectionHeading title={t("title")} />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Listado */}
        <ul className="flex flex-col divide-y divide-mist-200/70 rounded-[var(--radius-md)] bg-paper px-5 ring-1 ring-mist-200/70 sm:px-7">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 py-6 sm:gap-6">
              <Link
                href={`/tienda/${item.slug}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <Link
                    href={`/tienda/${item.slug}`}
                    className="font-display text-lg font-medium text-sky-900 transition-colors hover:text-sky-600 text-pretty"
                  >
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(item.key)}
                    aria-label={t("remove")}
                    className="self-start text-mist-400 transition-colors hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {item.options && (
                  <span className="mt-0.5 text-sm text-mist-600">
                    {Object.entries(item.options)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ")}
                  </span>
                )}

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full ring-1 ring-mist-200">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.key, item.quantity - 1)}
                      aria-label="−"
                      className="flex h-9 w-9 items-center justify-center text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-sky-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.key, item.quantity + 1)}
                      aria-label="+"
                      className="flex h-9 w-9 items-center justify-center text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <span className="font-display text-lg font-semibold text-sky-900">
                    {formatPrice(item.price * item.quantity, locale)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumen */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70">
            <h2 className="font-display text-xl font-semibold text-sky-900">
              {t("title")}
            </h2>

            <dl className="flex flex-col gap-2.5 text-sky-900">
              <div className="flex items-center justify-between">
                <dt className="text-mist-600">{t("subtotal")}</dt>
                <dd className="font-medium">{formatPrice(subtotal, locale)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mist-600">{t("shipping")}</dt>
                <dd className="font-medium">
                  {freeShipping
                    ? t("shippingFree")
                    : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-mist-200 pt-3">
                <dt className="font-display text-lg">{t("total")}</dt>
                <dd className="font-display text-2xl font-semibold">
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-mist-600">{t("vatIncluded")}</p>

            <div className="mt-2 flex flex-col gap-2">
              <Button href="/checkout" variant="primary" size="lg" className="w-full">
                {t("checkout")}
                <ArrowRight size={18} />
              </Button>
              <Button href="/tienda" variant="link" className="w-full">
                {t("continue")}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
