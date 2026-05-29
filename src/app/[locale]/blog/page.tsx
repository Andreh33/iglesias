import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogIndex, type SerializedPost } from "@/components/blog/BlogIndex";
import { posts } from "@/data/posts";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `/${locale}/blog` },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const t = await getTranslations("blog");

  const serialized: SerializedPost[] = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({
      slug: p.slug,
      title: tr(p.title, lc),
      excerpt: tr(p.excerpt, lc),
      category: p.category,
      author: p.author,
      date: p.date,
      readingTime: p.readingTime,
      cover: p.cover,
      featured: p.featured,
    }));

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="mt-12">
        <BlogIndex posts={serialized} locale={lc} />
      </div>
    </Section>
  );
}
