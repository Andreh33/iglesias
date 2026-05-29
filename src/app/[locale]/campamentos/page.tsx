import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Home, Utensils, Activity, Users, MapPin, CalendarDays, Baby, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { DayTimeline } from "@/components/camps/DayTimeline";
import { CampFaq } from "@/components/camps/CampFaq";
import { CampRegisterForm } from "@/components/camps/CampRegisterForm";
import { camps } from "@/data/camps";
import { gallery } from "@/data/gallery";
import { t as tr } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "camps" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: ["/images/camps-hero.svg"],
    },
  };
}

const includes = [
  { key: "includeLodging", icon: Home },
  { key: "includeMeals", icon: Utensils },
  { key: "includeActivities", icon: Activity },
  { key: "includeMonitors", icon: Users },
] as const;

export default async function CampsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations("camps");
  const tc = await getTranslations("common");

  // Imágenes de campamentos para la galería (filtradas por categoría).
  const campGallery = gallery.filter((g) => g.category === "campamentos").slice(0, 6);

  return (
    <>
      {/* 1 — Hero inmersivo */}
      <section className="relative overflow-hidden bg-deep noise-overlay text-paper">
        <Image
          src="/images/camps-hero.svg"
          alt={t("title")}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-sky-900/85 via-sky-900/55 to-sky-900/35"
        />
        <Container className="relative z-10 flex min-h-[60vh] flex-col items-start justify-end gap-5 pb-20 pt-32 sm:min-h-[68vh] sm:pb-24 sm:pt-40">
          <span className="animate-rise delay-1 inline-flex items-center gap-2 rounded-full bg-paper/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-paper ring-1 ring-paper/25 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            {t("kicker")}
          </span>
          <h1 className="animate-rise delay-2 max-w-2xl font-display text-4xl font-semibold leading-[1.03] text-balance sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="animate-rise delay-3 max-w-xl text-lg text-sky-100/90 text-pretty">
            {t("subtitle")}
          </p>
          <div className="animate-rise delay-4">
            <Button href="#preinscripcion" variant="gold" size="lg">
              {t("register")}
              <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* 2 — Tipos de campamento */}
      <Section tone="ivory" id="campamentos">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
          {camps.map((camp, i) => (
            <Reveal key={camp.slug} delay={i * 80}>
              <Card hover className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={camp.image}
                    alt={tr(camp.title, locale)}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover"
                  />
                  <span className="absolute right-4 top-4">
                    <Badge tone="gold">{t("spotsLeft", { n: camp.spots })}</Badge>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                  <h3 className="font-display text-2xl text-sky-900">{tr(camp.title, locale)}</h3>
                  <p className="text-pretty text-mist-600">{tr(camp.description, locale)}</p>

                  <dl className="mt-1 grid gap-2.5 text-sm">
                    <div className="flex items-center gap-2.5 text-sky-800">
                      <Baby size={16} className="shrink-0 text-sky-500" aria-hidden />
                      <dt className="sr-only">{t("ages")}</dt>
                      <dd>{tr(camp.ages, locale)}</dd>
                    </div>
                    <div className="flex items-center gap-2.5 text-sky-800">
                      <CalendarDays size={16} className="shrink-0 text-sky-500" aria-hidden />
                      <dt className="sr-only">{t("dates")}</dt>
                      <dd>{tr(camp.dates, locale)}</dd>
                    </div>
                    <div className="flex items-center gap-2.5 text-sky-800">
                      <MapPin size={16} className="shrink-0 text-sky-500" aria-hidden />
                      <dt className="sr-only">{t("place")}</dt>
                      <dd>{tr(camp.place, locale)}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-mist-200/70 pt-5">
                    <p className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-mist-400">
                        {tc("from")}
                      </span>
                      <span className="font-display text-2xl text-sky-900">
                        {formatPrice(camp.price, locale)}
                      </span>
                    </p>
                    <Button href="#preinscripcion" variant="primary" size="sm">
                      {t("register")}
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Galería + testimonio */}
      <Section tone="sky">
        <SectionHeading
          kicker={tc("date")}
          title={locale === "es" ? "Así se vive un campamento" : "What a camp feels like"}
          subtitle={
            locale === "es"
              ? "Aventura, amistad y momentos que se quedan para siempre."
              : "Adventure, friendship and moments that last forever."
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campGallery.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 60}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : undefined}
            >
              <div
                className={`relative w-full overflow-hidden rounded-[var(--radius-md)] shadow-soft ring-1 ring-mist-200/70 ${
                  i === 0 ? "aspect-[16/10] sm:h-full" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={tr(item.alt, locale)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mt-12 flex justify-center">
          <VerseCallout
            text={
              locale === "es"
                ? "Volví del campamento con amigos para toda la vida y la certeza de que Dios me acompaña."
                : "I came back from camp with lifelong friends and the certainty that God walks with me."
            }
            reference={locale === "es" ? "Marta, 15 años" : "Marta, age 15"}
          />
        </Reveal>
      </Section>

      {/* 4 — Qué incluye */}
      <Section tone="paper">
        <SectionHeading
          kicker={t("kicker")}
          title={t("includesTitle")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <Reveal key={item.key} delay={i * 80}>
                <Card className="flex h-full flex-col items-start gap-4 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                    <ItemIcon size={24} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-xl text-sky-900">{t(item.key)}</h3>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 5 — Itinerario de un día tipo */}
      <Section tone="ivory">
        <SectionHeading
          kicker={t("kicker")}
          title={t("dayTitle")}
          subtitle={
            locale === "es"
              ? "Un equilibrio entre aventura, descanso y tiempos de fe, de la mañana a la noche."
              : "A balance of adventure, rest and faith moments, from morning to night."
          }
          align="center"
          className="mx-auto"
        />
        <div className="mt-14">
          <DayTimeline />
        </div>
      </Section>

      {/* 6 — FAQ */}
      <Section tone="sky">
        <SectionHeading
          kicker={tc("learnMore")}
          title={t("faqTitle")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <CampFaq title={t("faqTitle")} />
        </div>
      </Section>

      {/* 7 — Preinscripción */}
      <Section tone="paper" id="preinscripcion" container="narrow">
        <SectionHeading
          kicker={t("register")}
          title={t("registerTitle")}
          subtitle={
            locale === "es"
              ? "Reserva la plaza de tu peque o únete tú. Te confirmaremos por correo en pocos días."
              : "Reserve a spot for your child or join in yourself. We'll confirm by email within a few days."
          }
          align="center"
          className="mx-auto"
        />
        <Reveal delay={80} className="mt-12">
          <CampRegisterForm />
        </Reveal>
      </Section>
    </>
  );
}
