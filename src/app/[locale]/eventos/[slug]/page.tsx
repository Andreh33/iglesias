import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { CalendarDays, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AddToCalendar } from "@/components/events/AddToCalendar";
import { ReserveButton } from "@/components/events/ReserveButton";
import { JsonLd } from "@/lib/jsonld";
import { events } from "@/data/events";
import { t as tr, formatDate } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import { site } from "@/config/site.config";
import type { Locale } from "@/types";

const BASE = "https://nuevavida.example";

export function generateStaticParams() {
  // next-intl combina cada slug con los locales disponibles.
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  const loc = locale as Locale;
  const title = tr(event.title, loc);
  const description = tr(event.excerpt, loc);
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const t = await getTranslations("events");
  const activeLocale = (await getLocale()) as Locale;

  const title = tr(event.title, activeLocale);
  const location = tr(event.location, activeLocale);
  const description = tr(event.description, activeLocale);
  const when = formatDate(event.date, activeLocale);
  const timeRange = event.endTime ? `${event.time} – ${event.endTime}` : event.time;

  // Event JSON-LD (schema.org/Event) para SEO.
  const startIso = `${event.date}T${event.time}:00`;
  const endIso = event.endTime ? `${event.date}T${event.endTime}:00` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description,
    startDate: startIso,
    ...(endIso ? { endDate: endIso } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`${BASE}${event.image}`],
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.address,
        addressCountry: "ES",
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.identity.name,
      url: BASE,
    },
    url: `${BASE}/${activeLocale}/eventos/${event.slug}`,
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      {/* Cabecera con imagen y atmósfera */}
      <header className="relative overflow-hidden bg-dawn-strong noise-overlay">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-mesh opacity-60"
        />
        <Container className="relative z-10 grid items-center gap-12 pb-20 pt-16 lg:grid-cols-[1fr_0.9fr] lg:pb-28 lg:pt-24">
          <div className="flex flex-col items-start gap-6">
            <Button href="/eventos" variant="ghost" size="sm">
              <ArrowLeft size={16} />
              {t("title")}
            </Button>

            <Badge tone="gold">{t(event.type)}</Badge>

            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.04] text-sky-900 text-balance lg:text-5xl">
              {title}
            </h1>

            <p className="max-w-xl text-lg text-mist-600 text-pretty">
              {tr(event.excerpt, activeLocale)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <AddToCalendar
                fileName={event.slug}
                event={{
                  title,
                  description,
                  location,
                  date: event.date,
                  time: event.time,
                  endTime: event.endTime,
                }}
              />
              <ReserveButton />
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-paper/60">
              <Image
                src={event.image}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </header>

      {/* Cuerpo: detalles + cuándo/dónde */}
      <div className="bg-ivory py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-sky-900 lg:text-3xl">
              {t("details")}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-mist-600">
              {description}
            </p>
          </Reveal>

          <Reveal
            delay={120}
            as="aside"
            className="flex flex-col gap-5 rounded-[var(--radius-md)] bg-paper p-7 shadow-soft ring-1 ring-mist-200/70"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-500/15">
                <CalendarDays size={18} strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                  {t("when")}
                </p>
                <p className="mt-1 font-display text-lg text-sky-900">{when}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-mist-600">
                  <Clock size={15} className="text-gold-500" />
                  {timeRange}
                </p>
              </div>
            </div>

            <span aria-hidden className="rule-gold" />

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-500/15">
                <MapPin size={18} strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                  {t("where")}
                </p>
                <p className="mt-1 font-display text-lg text-sky-900">
                  {location}
                </p>
                <p className="mt-1 text-mist-600">{site.contact.address}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </article>
  );
}
