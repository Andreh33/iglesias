import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { posts } from "@/data/posts";
import { t as tr } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

/**
 * Preview de las 3 enseñanzas más recientes (orden por fecha desc). Cada
 * tarjeta muestra portada, categoría, título y tiempo de lectura.
 */
export async function BlogPreview() {
  const t = await getTranslations("blog");
  const locale = (await getLocale()) as Locale;

  const recent = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Reveal className="hidden sm:block">
          <Button href="/blog" variant="link">
            {t("all")}
            <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((post, i) => (
          <Reveal key={post.slug} delay={i * 90}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Card hover className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-sky-50">
                  <Image
                    src={post.cover}
                    alt={tr(post.title, locale)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <Badge tone="soft" className="absolute left-3 top-3">
                    {t(post.category)}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-xl leading-snug text-sky-900 text-balance transition-colors group-hover:text-sky-700">
                    {tr(post.title, locale)}
                  </h3>
                  <p className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-mist-600">
                    <Clock size={15} className="text-gold-500" />
                    {t("readingTime", { min: post.readingTime })}
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 sm:hidden">
        <Button href="/blog" variant="outline" size="md">
          {t("all")}
          <ArrowRight size={16} />
        </Button>
      </Reveal>
    </Section>
  );
}
