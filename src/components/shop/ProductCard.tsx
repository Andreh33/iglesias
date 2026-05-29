import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { t as tr } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import type { Locale, Product, ProductBadge } from "@/types";
import { AddToCartButton } from "./AddToCartButton";

// El badge "oferta" se acentúa en dorado; el resto en celeste.
const badgeTone: Record<ProductBadge, "sky" | "gold"> = {
  nuevo: "sky",
  oferta: "gold",
  "mas-vendido": "sky",
};

/**
 * Tarjeta de producto del catálogo (Server Component). Imagen con zoom suave en
 * hover, badges traducidos, precio con compareAt tachado y rating opcional.
 */
export async function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = await getTranslations("shop");
  const name = tr(product.name, locale);
  const href = `/tienda/${product.slug}`;
  const onSale = product.compareAt !== undefined && product.compareAt > product.price;
  const soldOut = product.stock <= 0;

  return (
    <Card hover as="article" className="group flex h-full flex-col overflow-hidden">
      <Link
        href={href}
        aria-label={name}
        className="relative block aspect-square overflow-hidden rounded-t-[var(--radius-md)] bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      >
        <Image
          src={product.images[0]}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className={cn(
            "object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105",
            soldOut && "opacity-70",
          )}
        />

        {/* Badges superpuestos */}
        {(product.badges?.length || soldOut) && (
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
            {soldOut ? (
              <Badge tone="deep">{t("outOfStock")}</Badge>
            ) : (
              product.badges?.map((b) => (
                <Badge key={b} tone={badgeTone[b]}>
                  {t(b)}
                </Badge>
              ))
            )}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            {t(product.category)}
          </span>
          {product.rating !== undefined && (
            <span
              className="inline-flex items-center gap-1 text-sm font-medium text-sky-900"
              aria-label={t("ratingLabel", { rating: product.rating.toFixed(1) })}
            >
              <Star size={15} className="fill-gold-500 text-gold-500" aria-hidden />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug text-sky-900 text-pretty">
          <Link
            href={href}
            className="transition-colors hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-mist-600 text-pretty">
          {tr(product.shortDescription, locale)}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold text-sky-900">
              {formatPrice(product.price, locale)}
            </span>
            {onSale && product.compareAt !== undefined && (
              <span className="text-sm text-mist-400 line-through">
                {formatPrice(product.compareAt, locale)}
              </span>
            )}
          </div>

          {!soldOut && (
            <AddToCartButton
              slug={product.slug}
              name={name}
              price={product.price}
              image={product.images[0]}
              locale={locale}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
