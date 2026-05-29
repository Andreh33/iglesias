import { getTranslations, getLocale } from "next-intl/server";
import { HeartHandshake, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PrayerForm } from "@/components/sections/PrayerForm";
import { NewsletterInline } from "@/components/sections/NewsletterInline";
import type { Locale } from "@/types";

/**
 * Bloque de Home: petición de oración (izquierda) + boletín (derecha).
 * Server component: resuelve locale y traducciones de los namespaces
 * "prayer" y "newsletter", y delega los formularios a componentes cliente.
 */
export async function PrayerCTA() {
  const locale = (await getLocale()) as Locale;
  const tp = await getTranslations("prayer");
  const tn = await getTranslations("newsletter");

  return (
    <Section tone="dawn">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />
      <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Izquierda — petición de oración */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Kicker>{tp("kicker")}</Kicker>
            <h2 className="font-display text-3xl font-semibold text-sky-900 text-balance lg:text-4xl">
              {tp("title")}
            </h2>
            <p className="max-w-md text-lg text-mist-600 text-pretty">
              {tp("subtitle")}
            </p>
          </div>
          <PrayerForm />
        </Reveal>

        {/* Derecha — boletín */}
        <Reveal delay={120} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Kicker>{tn("kicker")}</Kicker>
            <h2 className="font-display text-3xl font-semibold text-sky-900 text-balance lg:text-4xl">
              {tn("title")}
            </h2>
            <p className="max-w-md text-lg text-mist-600 text-pretty">
              {tn("subtitle")}
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper/70 p-7 shadow-soft ring-1 ring-mist-200 backdrop-blur sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 ring-1 ring-gold-500/25">
              <Mail size={22} strokeWidth={1.7} aria-hidden />
            </span>
            <div className="mt-5">
              <NewsletterInline locale={locale} />
            </div>
            <p className="mt-4 text-xs text-mist-600">{tn("consent")}</p>
          </div>

          <p className="flex items-center gap-2 text-sm text-mist-600">
            <HeartHandshake size={16} className="text-sky-600" aria-hidden />
            {tp("subtitle")}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
