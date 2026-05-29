import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Heart, Users, HandHelping, Globe } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BLUR } from "@/lib/img";

type Pillar = {
  icon: typeof Heart;
  titleKey: string;
  descKey: string;
};

const pillars: Pillar[] = [
  { icon: Heart, titleKey: "valueFaith", descKey: "valueFaithDesc" },
  { icon: Users, titleKey: "valueFamily", descKey: "valueFamilyDesc" },
  { icon: HandHelping, titleKey: "valueService", descKey: "valueServiceDesc" },
  { icon: Globe, titleKey: "valueMission", descKey: "valueMissionDesc" },
];

/**
 * Avance de "Quiénes somos": bloque editorial con imagen solapada a la izquierda
 * y, a la derecha, los 4 pilares de la iglesia + CTA hacia /quienes-somos.
 */
export async function AboutPreview() {
  const t = await getTranslations("about");

  return (
    <Section tone="paper">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Imagen solapada */}
        <Reveal className="relative order-last lg:order-first">
          <div
            aria-hidden
            className="absolute -bottom-5 -right-5 hidden h-40 w-40 rounded-[var(--radius-lg)] bg-sky-100 sm:block"
          />
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-mist-200">
            <Image
              src="/images/about-1.svg"
              alt={t("previewTitle")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Texto + pilares */}
        <div className="flex flex-col gap-7">
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight text-sky-900 text-balance lg:text-4xl">
              {t("previewTitle")}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-lg text-lg text-mist-600 text-pretty">
              {t("previewBody")}
            </p>
          </Reveal>

          <div className="mt-2 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <Reveal key={pillar.titleKey} delay={240 + i * 80}>
                  <div className="flex gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                      <PillarIcon size={20} strokeWidth={1.6} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg text-sky-900">
                        {t(pillar.titleKey)}
                      </h3>
                      <p className="text-pretty text-mist-600">
                        {t(pillar.descKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={560}>
            <Button href="/quienes-somos" variant="ghost" size="lg">
              {t("title")}
              <ArrowRight size={18} />
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
