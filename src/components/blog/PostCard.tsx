import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { t as tr, formatDate } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import type { Post, Locale } from "@/types";

/**
 * Tarjeta de artículo del blog. `featured` produce una tarjeta grande
 * horizontal (portada a la izquierda en desktop). Server component.
 */
export async function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: Post;
  locale: Locale;
  featured?: boolean;
}) {
  const t = await getTranslations("blog");

  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist-600">
      <span className="font-semibold text-sky-800">{post.author}</span>
      <span aria-hidden className="text-mist-400">
        ·
      </span>
      <span>{formatDate(post.date, locale)}</span>
      <span aria-hidden className="text-mist-400">
        ·
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} className="text-gold-500" />
        {t("readingTime", { min: post.readingTime })}
      </span>
    </p>
  );

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        <Card
          hover
          className="grid overflow-hidden md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-sky-50 md:aspect-auto md:min-h-[22rem]">
            <Image
              src={post.cover}
              alt={tr(post.title, locale)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge tone="gold">{t("featured")}</Badge>
              <Badge tone="soft">{t(post.category)}</Badge>
            </span>
          </div>

          <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
            <h3 className="font-display text-2xl leading-tight text-sky-900 text-balance transition-colors group-hover:text-sky-700 sm:text-3xl">
              {tr(post.title, locale)}
            </h3>
            <p className="text-pretty text-mist-600">{tr(post.excerpt, locale)}</p>
            {meta}
          </div>
        </Card>
      </Link>
    );
  }

  return (
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
          <p className="line-clamp-3 text-pretty text-sm text-mist-600">
            {tr(post.excerpt, locale)}
          </p>
          <div className="mt-auto pt-2">{meta}</div>
        </div>
      </Card>
    </Link>
  );
}
