import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { BLUR } from "@/lib/img";

/**
 * Mensaje de bienvenida del pastor. Layout editorial asimétrico: foto solapada
 * a la izquierda, texto cálido + firma + versículo destacado a la derecha.
 */
export async function Welcome() {
  const t = await getTranslations("welcome");

  return (
    <Section tone="paper">
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Composición de imagen con solape y filete dorado */}
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute -left-4 -top-4 h-24 w-24 rounded-[var(--radius-md)] bg-sky-100 sm:-left-6 sm:-top-6"
          />
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-mist-200">
            <Image
              src="/images/pastor.svg"
              alt={t("signature")}
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-3 right-6 h-px w-28 rule-gold sm:right-10"
          />
        </Reveal>

        {/* Texto */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display text-3xl font-semibold leading-tight text-sky-900 text-balance lg:text-4xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-xl text-lg text-mist-600 text-pretty">
              {t("body")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="font-display text-2xl italic text-sky-700">
              {t("signature")}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <VerseCallout text={t("verse")} reference={t("verseRef")} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
