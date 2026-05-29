import type { Metadata } from "next";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventsAgenda, type AgendaEvent } from "@/components/events/EventsAgenda";
import { events } from "@/data/events";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const activeLocale = (await getLocale()) as Locale;

  // Resolvemos el contenido bilingüe a una forma serializable para el cliente.
  const serialized: AgendaEvent[] = events.map((event) => ({
    slug: event.slug,
    title: tr(event.title, activeLocale),
    type: event.type,
    date: event.date,
    time: event.time,
    location: tr(event.location, activeLocale),
    image: event.image,
    excerpt: tr(event.excerpt, activeLocale),
  }));

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <EventsAgenda events={serialized} locale={activeLocale} />
    </Section>
  );
}
