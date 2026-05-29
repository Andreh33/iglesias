import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site.config";

/**
 * Mapa + datos de contacto y horarios. Layout en dos columnas. El iframe del
 * mapa se carga de forma diferida (loading="lazy") y la propia incrustación
 * es estática de OpenStreetMap (sin scripts de terceros).
 */
export async function LocationMap() {
  const t = await getTranslations("location");
  const tc = await getTranslations("contact");
  const ts = await getTranslations("services");

  const directionsHref = `https://www.openstreetmap.org/directions?to=${site.contact.coords.lat}%2C${site.contact.coords.lng}`;

  return (
    <Section tone="ivory">
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
        {/* Columna 1: mapa */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-mist-200 shadow-soft">
            <iframe
              src={site.contact.mapEmbed}
              title={`${tc("findUs")} — ${site.identity.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>

        {/* Columna 2: datos y horarios */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
          />

          <Reveal delay={80}>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                  <MapPin size={18} strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                    {tc("findUs")}
                  </span>
                  <span className="text-mist-600">{site.contact.address}</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                  <Phone size={18} strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                    {tc("phone")}
                  </span>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                    className="text-mist-600 underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                  <Mail size={18} strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                    {tc("email")}
                  </span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-mist-600 underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-[var(--radius-md)] border border-mist-200 bg-paper/70 p-6 shadow-soft backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                <Clock size={16} className="text-gold-500" aria-hidden />
                {tc("openingHours")}
              </div>
              <dl className="mt-4 flex flex-col divide-y divide-mist-200/70">
                {site.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <dt className="flex flex-col">
                      <span className="font-display text-lg text-sky-900">
                        {ts(service.titleKey.split(".")[1])}
                      </span>
                      <span className="text-sm text-mist-600">
                        {ts(service.dayKey.split(".")[1])}
                      </span>
                    </dt>
                    <dd className="font-semibold tabular-nums text-sky-700">
                      {service.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <Button
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              <Navigation size={18} />
              {t("directions")}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
