import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Tent } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/SectionHeading";
import { BLUR } from "@/lib/img";

/**
 * Banner inmersivo a ancho casi completo: imagen de fondo con overlay celeste,
 * titular grande, claim y CTA hacia la página de campamentos.
 */
export async function CampsTeaser() {
  const t = await getTranslations("camps");

  return (
    <Section tone="ivory">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] shadow-lift noise-overlay">
          <Image
            src="/images/camps-hero.jpg"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1240px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL={BLUR}
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-900/85 via-sky-800/70 to-sky-600/55"
          />

          <div className="relative flex flex-col items-start gap-6 px-7 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-28">
            <Kicker light>
              <span className="inline-flex items-center gap-2">
                <Tent size={16} className="text-gold-300" aria-hidden />
                {t("kicker")}
              </span>
            </Kicker>

            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-paper text-balance lg:text-5xl">
              {t("title")}
            </h2>

            <p className="max-w-xl text-lg text-sky-100/90 text-pretty">
              {t("teaser")}
            </p>

            <Button href="/campamentos" variant="gold" size="lg" className="mt-2">
              {t("teaserCta")}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
