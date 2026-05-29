import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { PostBody } from "@/components/blog/PostBody";
import { AuthorChip } from "@/components/blog/AuthorChip";
import { ShareBar } from "@/components/blog/ShareBar";
import { PostCard } from "@/components/blog/PostCard";
import { posts } from "@/data/posts";
import { t as tr, formatDate } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import { site } from "@/config/site.config";
import type { Locale } from "@/types";

// El slug es idéntico en ambos idiomas: NO se traduce. next-intl combina el
// locale automáticamente, por lo que el toggle de idioma mantiene la ruta.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const lc = locale as Locale;
  const title = tr(post.title, lc);
  const description = tr(post.excerpt, lc);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      images: [post.cover],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations("blog");

  const title = tr(post.title, lc);
  const excerpt = tr(post.excerpt, lc);

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.identity.name,
      logo: { "@type": "ImageObject", url: site.identity.logo.src },
    },
    inLanguage: lc === "es" ? "es-ES" : "en-GB",
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero del artículo */}
      <Section tone="dawn" className="!pb-12 !pt-24 sm:!pt-28">
        <Container size="narrow" className="!px-0">
          <Reveal className="flex flex-col gap-6">
            <Button href="/blog" variant="link" className="self-start !px-0">
              <ArrowLeft size={16} />
              {t("title")}
            </Button>

            <span className="flex flex-wrap items-center gap-2">
              <Badge tone="sky">{t(post.category)}</Badge>
              <span className="text-sm text-mist-600">
                {formatDate(post.date, lc)}
              </span>
            </span>

            <h1 className="font-display text-3xl font-semibold leading-[1.05] text-sky-900 text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="max-w-2xl text-lg text-mist-600 text-pretty">
              {excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-mist-200 pt-6">
              <AuthorChip author={post.author} date={post.date} locale={lc} />
              <span className="text-sm text-mist-600">
                {t("readingTime", { min: post.readingTime })}
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Portada */}
      <Section tone="ivory" container={false} className="!py-0">
        <Container size="narrow" className="-mt-4">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-mist-200">
            <Image
              src={post.cover}
              alt={title}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 820px"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Cuerpo + compartir + autor al pie */}
      <Section tone="ivory" className="!pt-14">
        <Container size="narrow" className="!px-0">
          <PostBody blocks={post.body} locale={lc} />

          <div className="mx-auto mt-14 flex max-w-[44rem] flex-col gap-10">
            <div className="border-t border-mist-200 pt-8">
              <ShareBar title={title} />
            </div>

            <div className="rounded-[var(--radius-lg)] bg-paper p-7 ring-1 ring-mist-200/70 sm:p-8">
              <AuthorChip author={post.author} date={post.date} locale={lc} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Relacionados */}
      {related.length > 0 && (
        <Section tone="sky">
          <h2 className="font-display text-2xl font-semibold text-sky-900 text-balance sm:text-3xl">
            {t("related")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <PostCard post={p} locale={lc} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
