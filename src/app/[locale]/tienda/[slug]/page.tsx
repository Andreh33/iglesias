import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/data/products";
import { t as tr } from "@/lib/i18n";
import { JsonLd } from "@/lib/jsonld";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const l = locale as Locale;
  return {
    title: tr(product.name, l),
    description: tr(product.shortDescription, l),
    openGraph: {
      type: "website",
      title: tr(product.name, l),
      description: tr(product.shortDescription, l),
      images: [product.images[0]],
    },
  };
}

/**
 * Ficha de producto. Galería + selector de opciones (cliente), descripción
 * editorial, envíos/devoluciones y productos relacionados de la misma categoría.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tc = await getTranslations("common");

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tr(product.name, locale),
    description: tr(product.description, locale),
    image: product.images,
    category: t(product.category),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.rating !== undefined && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        bestRating: 5,
        ratingCount: 1,
      },
    }),
  };

  return (
    <Section tone="ivory">
      <JsonLd data={jsonLd} />

      <Reveal>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          <ArrowLeft size={16} aria-hidden />
          {tc("back")}
        </Link>
      </Reveal>

      <div className="mt-8">
        <ProductDetail product={product} locale={locale} />
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-sky-900 lg:text-3xl">
              {t("related")}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full">
                <ProductCard product={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
