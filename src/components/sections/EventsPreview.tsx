import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { events } from "@/data/events";
import { t as tr, formatDateShort } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Preview de los 3 próximos eventos (orden por fecha asc). Cada tarjeta muestra
 * un bloque de fecha tipo calendario, el tipo como badge, título y ubicación.
 */
export async function EventsPreview() {
  const t = await getTranslations("events");
  const locale = (await getLocale()) as Locale;

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Reveal className="hidden sm:block">
          <Button href="/eventos" variant="link">
            {t("title")}
            <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((event, i) => {
          const date = formatDateShort(event.date, locale);
          return (
            <Reveal key={event.slug} delay={i * 90}>
              <Link
                href={`/eventos/${event.slug}`}
                className="group block h-full rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Card hover className="flex h-full flex-col p-6">
                  <div className="flex items-start gap-4">
                  <div className="flex shrink-0 flex-col items-center rounded-[var(--radius-sm)] bg-sky-50 px-3 py-2 text-center ring-1 ring-sky-500/15">
                    <span className="font-display text-2xl font-semibold leading-none text-sky-900">
                      {date.day}
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky-600">
                      {date.month}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-0.5">
                    <Badge tone="gold">{t(event.type)}</Badge>
                    <span className="text-sm text-mist-600">{event.time}</span>
                  </div>
                </div>

                  <h3 className="mt-5 font-display text-xl text-sky-900 text-balance transition-colors group-hover:text-sky-700">
                    {tr(event.title, locale)}
                  </h3>

                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-mist-600">
                    <MapPin size={15} className="text-gold-500" />
                    {tr(event.location, locale)}
                  </p>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 sm:hidden">
        <Button href="/eventos" variant="outline" size="md">
          {t("title")}
          <ArrowRight size={16} />
        </Button>
      </Reveal>
    </Section>
  );
}
