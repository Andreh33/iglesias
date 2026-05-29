import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale, Product } from "@/types";
import { ProductCard } from "./ProductCard";

/**
 * Rejilla responsive de productos con revelado escalonado (stagger). Si no hay
 * resultados muestra un estado vacío. Server Component.
 */
export async function ProductGrid({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const t = await getTranslations("shop");

  if (products.length === 0) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-mist-200 bg-paper/60 px-6 py-16 text-center">
        <p className="text-lg text-mist-600 text-pretty">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <Reveal
          key={product.slug}
          delay={(i % 4) * 90}
          className="h-full"
        >
          <ProductCard product={product} locale={locale} />
        </Reveal>
      ))}
    </div>
  );
}
