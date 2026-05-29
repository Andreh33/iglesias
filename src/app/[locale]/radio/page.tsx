import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RadioPlayer } from "@/components/media/RadioPlayer";
import { NowPlaying } from "@/components/media/NowPlaying";
import { Schedule } from "@/components/media/Schedule";
import { radioSchedule } from "@/data/schedule";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return {
    title: t("radioTitle"),
    description: t("metaRadioDesc"),
  };
}

export default async function RadioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("radioTitle")}
        subtitle={t("radioIntro")}
      />

      {/* Reproductor principal tipo app de música */}
      <Reveal className="mt-12">
        <RadioPlayer />
      </Reveal>

      {/* Ahora sonando + parrilla */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <NowPlaying />
        </Reveal>
        <Reveal delay={120}>
          <Schedule slots={radioSchedule} locale={locale as Locale} />
        </Reveal>
      </div>
    </Section>
  );
}
