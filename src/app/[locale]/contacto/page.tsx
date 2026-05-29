import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, MessageCircle, Music2 } from "lucide-react";
import { Instagram, Youtube, Facebook } from "@/components/ui/SocialIcons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { LazyMap } from "@/components/contact/LazyMap";
import { site } from "@/config/site.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const socials = [
  { key: "instagram", href: site.social.instagram, Icon: Instagram, label: "Instagram" },
  { key: "youtube", href: site.social.youtube, Icon: Youtube, label: "YouTube" },
  { key: "facebook", href: site.social.facebook, Icon: Facebook, label: "Facebook" },
  { key: "spotify", href: site.social.spotify, Icon: Music2, label: "Spotify" },
] as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const ts = await getTranslations("services");

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        align="center"
        className="mb-14"
      />

      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Columna 1: formulario */}
        <Reveal>
          <h3 className="mb-5 font-display text-2xl text-sky-900">{t("writeUs")}</h3>
          <ContactForm />
        </Reveal>

        {/* Columna 2: datos, mapa, horarios, redes, WhatsApp */}
        <div className="flex flex-col gap-8">
          <Reveal delay={80}>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                  <MapPin size={18} strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                    {t("findUs")}
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
                    {t("phone")}
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
                    {t("email")}
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

          {/* Mapa con carga diferida */}
          <Reveal delay={120}>
            <LazyMap
              src={site.contact.mapEmbed}
              title={`${t("findUs")} — ${site.identity.name}`}
            />
          </Reveal>

          {/* Horarios */}
          <Reveal delay={160}>
            <div className="rounded-[var(--radius-md)] border border-mist-200 bg-paper/70 p-6 shadow-soft backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
                <Clock size={16} className="text-gold-500" aria-hidden />
                {t("openingHours")}
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

          {/* Redes sociales */}
          <Reveal delay={200}>
            <ul className="flex flex-wrap items-center gap-3">
              {socials.map(({ key, href, Icon, label }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-sky-700 shadow-soft ring-1 ring-mist-200 transition-all hover:-translate-y-0.5 hover:text-sky-500 hover:ring-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <Icon size={20} strokeWidth={1.8} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* WhatsApp grande */}
          <Reveal delay={240}>
            <Button
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="lg"
              className="w-full"
            >
              <MessageCircle size={20} aria-hidden />
              {t("whatsapp")}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
