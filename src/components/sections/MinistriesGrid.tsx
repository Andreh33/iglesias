import { getTranslations } from "next-intl/server";
import {
  Sparkles,
  Heart,
  Baby,
  Music,
  Globe,
  HandHelping,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

type Ministry = {
  key: string;
  icon: LucideIcon;
};

const ministries: Ministry[] = [
  { key: "youth", icon: Sparkles },
  { key: "couples", icon: Heart },
  { key: "kids", icon: Baby },
  { key: "worship", icon: Music },
  { key: "missions", icon: Globe },
  { key: "prayer", icon: HandHelping },
];

/**
 * Rejilla de ministerios y áreas (6). Cada tarjeta con icono, título y
 * descripción, con hover suave y revelado escalonado al scroll.
 */
export async function MinistriesGrid() {
  const t = await getTranslations("ministries");

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry, i) => {
          const MinistryIcon = ministry.icon;
          return (
            <Reveal key={ministry.key} delay={i * 80}>
              <Card hover className="group h-full p-7">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition-colors duration-[var(--dur-mid)] group-hover:bg-sky-500 group-hover:text-paper">
                  <MinistryIcon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-xl text-sky-900">
                  {t(ministry.key)}
                </h3>
                <p className="mt-2 text-pretty text-mist-600">
                  {t(`${ministry.key}Desc`)}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
