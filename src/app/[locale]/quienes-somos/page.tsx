import type { Metadata } from "next";
import {
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  Eye,
  Compass,
  Heart,
  Users,
  HandHelping,
  Globe,
  Car,
  Baby,
  Clock,
  Shirt,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Kicker } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/about/Timeline";
import { TeamGrid } from "@/components/about/TeamGrid";
import { BeliefsAccordion } from "@/components/about/BeliefsAccordion";
import { beliefs, history } from "@/data/beliefs";
import { team } from "@/data/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("previewBody"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values: { key: "Faith" | "Family" | "Service" | "Mission"; icon: LucideIcon }[] = [
    { key: "Faith", icon: Heart },
    { key: "Family", icon: Users },
    { key: "Service", icon: HandHelping },
    { key: "Mission", icon: Globe },
  ];

  const visit: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: t("visitParking"), desc: t("visitParkingDesc"), icon: Car },
    { title: t("visitKids"), desc: t("visitKidsDesc"), icon: Baby },
    { title: t("visitDuration"), desc: t("visitDurationDesc"), icon: Clock },
    { title: t("visitDress"), desc: t("visitDressDesc"), icon: Shirt },
  ];

  return (
    <>
      {/* 1 ─ Hero secundario */}
      <section className="relative overflow-hidden bg-dawn-strong noise-overlay">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
        <Container className="relative z-10 flex flex-col items-center gap-6 py-24 text-center lg:py-32">
          <span className="animate-rise delay-1">
            <Kicker>{t("kicker")}</Kicker>
          </span>
          <h1 className="animate-rise delay-2 max-w-3xl font-display text-4xl font-semibold leading-[1.04] text-sky-900 text-balance lg:text-6xl">
            {t("title")}
          </h1>
          <p className="animate-rise delay-3 max-w-2xl text-lg text-mist-600 text-pretty">
            {t("previewBody")}
          </p>
        </Container>
      </section>

      {/* 2 ─ Nuestra historia */}
      <Section tone="ivory">
        <SectionHeading
          align="center"
          kicker={t("historyKicker")}
          title={t("historyTitle")}
        />
        <Timeline milestones={history} />
      </Section>

      {/* 3 ─ Visión y misión */}
      <Section tone="sky">
        <SectionHeading
          align="center"
          kicker={t("kicker")}
          title={t("visionTitle")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="flex h-full flex-col gap-5 p-8 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-[var(--radius-md)] bg-sky-500/12 text-sky-600 ring-1 ring-sky-500/20">
                <Eye size={26} strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-semibold text-sky-900">
                {t("vision")}
              </h3>
              <p className="text-lg text-mist-600 text-pretty">{t("visionBody")}</p>
            </Card>
          </Reveal>
          <Reveal delay={120}>
            <Card className="flex h-full flex-col gap-5 p-8 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-[var(--radius-md)] bg-gold-500/15 text-gold-600 ring-1 ring-gold-500/25">
                <Compass size={26} strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-semibold text-sky-900">
                {t("mission")}
              </h3>
              <p className="text-lg text-mist-600 text-pretty">{t("missionBody")}</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 4 ─ Declaración de fe */}
      <Section tone="paper">
        <SectionHeading
          align="center"
          kicker={t("beliefsKicker")}
          title={t("beliefsTitle")}
        />
        <BeliefsAccordion beliefs={beliefs} />
      </Section>

      {/* 5 ─ Equipo pastoral */}
      <Section tone="ivory">
        <SectionHeading
          align="center"
          kicker={t("teamKicker")}
          title={t("teamTitle")}
        />
        <TeamGrid members={team} />
      </Section>

      {/* 6 ─ Valores */}
      <Section tone="deep">
        <SectionHeading
          align="center"
          light
          kicker={t("kicker")}
          title={t("values")}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ key, icon: Ico }, i) => (
            <Reveal key={key} delay={(i % 4) * 80}>
              <div className="flex h-full flex-col gap-4 rounded-[var(--radius-md)] bg-paper/5 p-7 ring-1 ring-paper/10 backdrop-blur">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500/15 text-gold-300 ring-1 ring-gold-300/25">
                  <Ico size={22} strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="font-display text-xl font-semibold text-paper">
                  {t(`value${key}`)}
                </h3>
                <p className="text-sky-100/80 text-pretty">{t(`value${key}Desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 ─ CTA Planifica tu primera visita */}
      <Section tone="dawn">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading
              kicker={t("visitKicker")}
              title={t("visitTitle")}
              subtitle={t("visitBody")}
            />
            <div>
              <Button href="/contacto" variant="gold" size="lg">
                {t("planVisit")}
                <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {visit.map(({ title, desc, icon: Ico }, i) => (
              <Reveal key={title} delay={(i % 2) * 100}>
                <Card hover className="flex h-full flex-col gap-3 p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sky-500/12 text-sky-600 ring-1 ring-sky-500/20">
                    <Ico size={22} strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-sky-900">
                    {title}
                  </h3>
                  <p className="text-mist-600 text-pretty">{desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
