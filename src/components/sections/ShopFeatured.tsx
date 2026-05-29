import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";
import { t as tr } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

/**
 * Escaparate de 6 productos destacados de la tienda. Mini-card propia con
 * imagen, badge opcional, nombre y precio (con compareAt tachado si aplica).
 */
export async function ShopFeatured() {
  const t = await getTranslations("shopFeatured");
  const ts = await getTranslations("shop");
  const locale = (await getLocale()) as Locale;

  const featured = products.slice(0, 6);

  return (
    <Section tone="paper">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Reveal className="hidden sm:block">
          <Button href="/tienda" variant="link">
            {t("viewShop")}
            <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-3">
        {featured.map((product, i) => {
          const badge = product.badges?.[0];
          return (
            <Reveal key={product.slug} delay={i * 70}>
              <Link
                href={`/tienda/${product.slug}`}
                className="group block h-full rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Card hover className="flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-sky-50">
                    <Image
                      src={product.images[0]}
                      alt={tr(product.name, locale)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    {badge && (
                      <Badge
                        tone={badge === "oferta" ? "gold" : "sky"}
                        className="absolute left-3 top-3 shadow-soft"
                      >
                        {ts(badge)}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-display text-base leading-snug text-sky-900 text-pretty transition-colors group-hover:text-sky-700">
                      {tr(product.name, locale)}
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2 pt-2">
                      <span className="font-semibold text-sky-900">
                        {formatPrice(product.price, locale)}
                      </span>
                      {product.compareAt && (
                        <span className="text-sm text-mist-400 line-through">
                          {formatPrice(product.compareAt, locale)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 sm:hidden">
        <Button href="/tienda" variant="outline" size="md">
          {t("viewShop")}
          <ArrowRight size={16} />
        </Button>
      </Reveal>
    </Section>
  );
}
