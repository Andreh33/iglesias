import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Filters } from "@/components/shop/Filters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/data/products";
import { t as tr } from "@/lib/i18n";
import type {
  Locale,
  Product,
  ProductBadge,
  ProductCategory,
} from "@/types";

type SearchParams = { [key: string]: string | undefined };

const CATEGORIES: ProductCategory[] = [
  "biblias",
  "joyeria",
  "ropa",
  "libros",
  "musica",
  "regalos",
];
const BADGES: ProductBadge[] = ["nuevo", "oferta", "mas-vendido"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

/**
 * Catálogo de la tienda. Filtra por categoría/etiqueta y ordena según los
 * searchParams sincronizados con <Filters/>. Server Component.
 */
export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const sp = await searchParams;
  const t = await getTranslations("shop");

  const category =
    sp.category && CATEGORIES.includes(sp.category as ProductCategory)
      ? (sp.category as ProductCategory)
      : undefined;
  const badge =
    sp.badge && BADGES.includes(sp.badge as ProductBadge)
      ? (sp.badge as ProductBadge)
      : undefined;
  const sort = sp.sort ?? "featured";

  let list: Product[] = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (badge && !(p.badges ?? []).includes(badge)) return false;
    return true;
  });

  list = [...list].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return tr(a.name, locale).localeCompare(tr(b.name, locale), locale);
      default:
        // "featured": agotados al final, conservando el orden del catálogo.
        return Number(a.stock <= 0) - Number(b.stock <= 0);
    }
  });

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Filters />
        </aside>

        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="text-sm font-medium text-mist-600" aria-live="polite">
              {t("results", { n: list.length })}
            </p>
          </Reveal>
          <ProductGrid products={list} locale={locale} />
        </div>
      </div>
    </Section>
  );
}
