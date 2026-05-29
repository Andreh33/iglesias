import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Play, TvMinimalPlay, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { TvPlayer } from "@/components/media/TvPlayer";
import { Schedule } from "@/components/media/Schedule";
import { tvSchedule, pastServices } from "@/data/schedule";
import { site } from "@/config/site.config";
import { t as tr, formatDateShort } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return {
    title: t("tvTitle"),
    description: t("metaTvDesc"),
  };
}

export default async function TvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");
  const loc = locale as Locale;

  return (
    <>
      {/* Directo + reproductor diferido */}
      <Section tone="ivory">
        <SectionHeading
          kicker={t("kicker")}
          title={t("tvTitle")}
          subtitle={t("tvIntro")}
        />

        <Reveal className="mt-12">
          <TvPlayer />
        </Reveal>
      </Section>

      {/* Cultos anteriores */}
      <Section tone="paper">
        <SectionHeading
          kicker={t("liveNow")}
          title={t("previousServices")}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pastServices.map((video, i) => {
            const d = formatDateShort(video.date, loc);
            return (
              <Reveal key={video.id} delay={(i % 3) * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] bg-paper ring-1 ring-mist-200/70 transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift hover:ring-sky-200">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={tr(video.title, loc)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-sky-900/45 to-transparent opacity-0 transition-opacity duration-[var(--dur-mid)] group-hover:opacity-100"
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 text-paper ring-1 ring-paper/30 backdrop-blur transition-all duration-[var(--dur-mid)] group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-sky-900"
                    >
                      <Play size={22} className="ml-0.5 fill-current" />
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-sky-900/80 px-2.5 py-1 text-xs font-semibold tabular-nums text-paper backdrop-blur">
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <Badge tone="soft">
                      {d.day} {d.month}
                    </Badge>
                    <h3 className="font-display text-xl text-sky-900 text-balance">
                      {tr(video.title, loc)}
                    </h3>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Parrilla TV */}
      <Section tone="ivory">
        <Reveal>
          <Schedule slots={tvSchedule} locale={loc} />
        </Reveal>
      </Section>

      {/* CTA suscríbete */}
      <Section tone="deep">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-mesh opacity-20"
        />
        <Reveal className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-gold-500/25">
            <TvMinimalPlay size={14} />
            {t("watchTv")}
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-paper text-balance lg:text-4xl">
            {t("subscribe")}
          </h2>
          <p className="max-w-xl text-pretty text-sky-100/75">
            {t("subscribeDesc")}
          </p>
          <Button
            href={site.media.tv.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            variant="gold"
            size="lg"
          >
            <TvMinimalPlay size={18} />
            {t("subscribe")}
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
