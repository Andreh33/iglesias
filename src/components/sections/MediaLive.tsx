import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Radio, Tv, ArrowRight, PlayCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { RadioPlayButton } from "@/components/media/RadioPlayButton";
import { site } from "@/config/site.config";
import { BLUR } from "@/lib/img";

/**
 * Sección "Conéctate en directo" sobre fondo oscuro (deep): tarjeta de radio
 * tipo "ahora sonando" con portada y botón de reproducción, y tarjeta de TV
 * que enlaza al último culto. Nunca hay autoplay.
 */
export async function MediaLive() {
  const t = await getTranslations("media");
  const radio = site.media.radio;

  return (
    <Section tone="deep">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh opacity-20"
      />

      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        light
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Tarjeta de radio: "ahora sonando" */}
        <Reveal>
          <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[var(--radius-lg)] bg-paper/5 p-6 ring-1 ring-paper/15 backdrop-blur-sm sm:flex-row sm:items-center sm:p-7">
            <div className="relative shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-[var(--radius-md)] shadow-lift ring-1 ring-paper/20">
                <Image
                  src={radio.logo}
                  alt={radio.name}
                  fill
                  sizes="128px"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </div>
              <RadioPlayButton className="absolute -bottom-4 -right-4" />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-gold-500/25">
                <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-gold-300" />
                {t("live")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-100/70">
                {t("nowPlaying")}
              </p>
              <h3 className="font-display text-2xl text-paper">{radio.name}</h3>
              <p className="text-sky-100/75 text-pretty">{t("radioIntro")}</p>
            </div>
          </article>
        </Reveal>

        {/* Tarjeta de TV: último culto */}
        <Reveal delay={120}>
          <Link
            href="/tv"
            className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-paper/15 transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:ring-gold-300/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
          >
            <div className="absolute inset-0">
              <Image
                src={radio.logo}
                alt={t("watchTv")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover opacity-40 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-sky-900 via-sky-900/70 to-sky-900/20"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-3 p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur transition-colors group-hover:bg-gold-500 group-hover:text-sky-900">
                <PlayCircle size={26} />
              </span>
              <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-300">
                <Tv size={14} />
                {t("liveNow")}
              </span>
              <h3 className="font-display text-2xl text-paper">
                {t("watchTv")}
              </h3>
              <p className="max-w-md text-sky-100/75 text-pretty">
                {t("tvIntro")}
              </p>
            </div>
          </Link>
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-3">
        <Button href="/radio" variant="gold" size="lg">
          <Radio size={18} />
          {t("listenRadio")}
        </Button>
        <Button href="/tv" variant="ghost" size="lg">
          {t("watchTv")}
          <ArrowRight size={18} />
        </Button>
      </Reveal>
    </Section>
  );
}
