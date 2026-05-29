"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { ProductBadge, ProductCategory } from "@/types";

const CATEGORIES: ProductCategory[] = [
  "biblias",
  "joyeria",
  "ropa",
  "libros",
  "musica",
  "regalos",
];

const BADGES: ProductBadge[] = ["nuevo", "oferta", "mas-vendido"];

const SORTS = [
  { value: "featured", labelKey: "sortFeatured" },
  { value: "price-asc", labelKey: "sortPriceAsc" },
  { value: "price-desc", labelKey: "sortPriceDesc" },
  { value: "name-asc", labelKey: "sortNameAsc" },
] as const;

/**
 * Filtros de catálogo (categoría, etiqueta, orden) sincronizados con la URL via
 * searchParams. Navega con el router consciente del locale conservando el resto
 * de parámetros. Client Component.
 */
export function Filters() {
  const t = useTranslations("shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeBadge = searchParams.get("badge") ?? "";
  const activeSort = searchParams.get("sort") ?? "featured";
  const hasFilters =
    activeCategory !== "" || activeBadge !== "" || activeSort !== "featured";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function clearAll() {
    router.push(pathname);
  }

  return (
    <section
      aria-label={t("filters")}
      className="flex flex-col gap-6 rounded-[var(--radius-md)] border border-mist-200 bg-paper/70 p-5 backdrop-blur sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-sky-900">
          <SlidersHorizontal size={18} className="text-sky-600" aria-hidden />
          {t("filters")}
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <X size={15} aria-hidden />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Categoría */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-wider text-mist-600">
          {t("categories")}
        </legend>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={activeCategory === ""}
            onClick={() => update("category", "")}
          >
            {t("all")}
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              active={activeCategory === c}
              onClick={() => update("category", activeCategory === c ? "" : c)}
            >
              {t(c)}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Etiquetas / badges */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-wider text-mist-600">
          {t("badges")}
        </legend>
        <div className="flex flex-wrap gap-2">
          <Chip active={activeBadge === ""} onClick={() => update("badge", "")}>
            {t("all")}
          </Chip>
          {BADGES.map((b) => (
            <Chip
              key={b}
              active={activeBadge === b}
              onClick={() => update("badge", activeBadge === b ? "" : b)}
            >
              {t(b)}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Orden */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="shop-sort"
          className="text-xs font-semibold uppercase tracking-wider text-mist-600"
        >
          {t("sortBy")}
        </label>
        <select
          id="shop-sort"
          value={activeSort}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full rounded-full border border-mist-200 bg-paper px-4 py-2.5 text-[0.95rem] text-sky-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {t(s.labelKey)}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        active
          ? "bg-sky-500 text-paper shadow-soft"
          : "bg-paper text-sky-700 ring-1 ring-mist-200 hover:ring-sky-300",
      )}
    >
      {children}
    </button>
  );
}
