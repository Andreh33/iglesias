"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import type { PostCategory, Locale } from "@/types";

/** Forma serializada (textos ya resueltos al locale) que recibe el índice. */
export type SerializedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: string;
  date: string;
  readingTime: number;
  cover: string;
  featured?: boolean;
};

const CATEGORIES: PostCategory[] = [
  "ensenanzas",
  "versiculos",
  "vida-cristiana",
  "testimonios",
  "familia",
];

export function BlogIndex({
  posts,
  locale,
}: {
  posts: SerializedPost[];
  locale: Locale;
}) {
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<PostCategory | "all">("all");

  const fmtDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = active === "all" || p.category === active;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [posts, query, active]);

  // El destacado solo se muestra sin filtros activos para no romper la rejilla.
  const showFeatured = active === "all" && query.trim() === "";
  const featured = showFeatured
    ? filtered.find((p) => p.featured)
    : undefined;
  const rest = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  const pills: Array<{ key: PostCategory | "all"; label: string }> = [
    { key: "all", label: t("all") },
    ...CATEGORIES.map((c) => ({ key: c, label: t(c) })),
  ];

  const meta = (p: SerializedPost) => (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist-600">
      <span className="font-semibold text-sky-800">{p.author}</span>
      <span aria-hidden className="text-mist-400">
        ·
      </span>
      <span>{fmtDate.format(new Date(p.date))}</span>
      <span aria-hidden className="text-mist-400">
        ·
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} className="text-gold-500" />
        {t("readingTime", { min: p.readingTime })}
      </span>
    </p>
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Controles: buscador + pills de categoría */}
      <div className="flex flex-col gap-5">
        <label className="relative block max-w-md">
          <span className="sr-only">{t("searchPlaceholder")}</span>
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full bg-paper py-3 pl-11 pr-4 text-sky-900 ring-1 ring-mist-200 transition placeholder:text-mist-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          />
        </label>

        <div
          role="tablist"
          aria-label={t("kicker")}
          className="flex flex-wrap gap-2"
        >
          {pills.map(({ key, label }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
                  isActive
                    ? "bg-sky-500 text-paper shadow-soft"
                    : "bg-paper/70 text-sky-700 ring-1 ring-mist-200 hover:bg-paper hover:ring-sky-300",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-mist-600">{t("results", { n: filtered.length })}</p>
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-mist-200 bg-paper/60 px-6 py-20 text-center">
          <p className="font-display text-xl text-sky-900 text-balance">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Card hover className="grid overflow-hidden md:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-sky-50 md:aspect-auto md:min-h-[22rem]">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge tone="gold">{t("featured")}</Badge>
                    <Badge tone="soft">{t(featured.category)}</Badge>
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                  <h3 className="font-display text-2xl leading-tight text-sky-900 text-balance transition-colors group-hover:text-sky-700 sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-pretty text-mist-600">{featured.excerpt}</p>
                  {meta(featured)}
                </div>
              </Card>
            </Link>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block h-full rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Card hover className="flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sky-50">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <Badge tone="soft" className="absolute left-3 top-3">
                      {t(p.category)}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl leading-snug text-sky-900 text-balance transition-colors group-hover:text-sky-700">
                      {p.title}
                    </h3>
                    <p className="line-clamp-3 text-pretty text-sm text-mist-600">
                      {p.excerpt}
                    </p>
                    <div className="mt-auto pt-2">{meta(p)}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
