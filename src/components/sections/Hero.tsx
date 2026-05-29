import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { CalendarClock, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site.config";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

/**
 * Hero a pantalla con page-load orquestado (kicker → titular → subtítulo →
 * CTAs → tarjeta de culto) usando .animate-rise + .delay-N (CSS, sin JS).
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const locale = (await getLocale()) as Locale;
  const ts = await getTranslations("services");
  const next = site.services[0];

  return (
    <section className="relative overflow-hidden bg-dawn-strong noise-overlay">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <Container className="relative z-10 grid items-center gap-12 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32 lg:pt-28">
        <div className="flex flex-col items-start gap-7">
          <span className="animate-rise delay-1 inline-flex items-center gap-2 rounded-full bg-paper/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 ring-1 ring-mist-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {t("kicker")}
          </span>

          <h1 className="animate-rise delay-2 max-w-xl font-display text-4xl font-semibold leading-[1.02] text-sky-900 text-balance lg:text-5xl">
            {t("title")}
          </h1>

          <p className="animate-rise delay-3 max-w-lg text-lg text-mist-600 text-pretty">
            {t("subtitle")}
          </p>

          <div className="animate-rise delay-4 flex flex-wrap items-center gap-3">
            <Button href="/contacto" variant="primary" size="lg">
              {t("ctaVisit")}
              <ArrowRight size={18} />
            </Button>
            <Button href="/tv" variant="ghost" size="lg">
              <PlayCircle size={18} />
              {t("ctaLive")}
            </Button>
          </div>
        </div>

        {/* Composición: imagen + tarjeta flotante de próximo culto */}
        <div className="animate-rise delay-3 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-paper/60">
            <Image
              src="/images/hero-sky.jpg"
              alt={site.identity.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>

          <div className="animate-rise delay-5 animate-float absolute -bottom-6 -left-4 w-[min(20rem,80%)] rounded-[var(--radius-md)] border border-mist-200 bg-paper/90 p-5 shadow-lift backdrop-blur-xl sm:-left-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sky-600">
              <CalendarClock size={16} className="text-gold-500" />
              {t("card")}
            </div>
            <p className="mt-2 font-display text-2xl text-sky-900">{ts(next.titleKey.split(".")[1])}</p>
            <p className="mt-1 text-mist-600">
              {ts(next.dayKey.split(".")[1])} · {next.time}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
