import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import {
  Check,
  Coffee,
  Clock,
  Accessibility,
  Ear,
  DoorOpen,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { facilities } from "@/data/facilities";
import { BLUR } from "@/lib/img";
import { t as tr } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Facility, Locale, LocalizedText } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "facilities" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: ["/images/og-default.svg"],
    },
  };
}

/** Mini-carta de la cafetería (demo). Precios en EUR. */
const cafeMenu: { name: LocalizedText; price: number }[] = [
  {
    name: { es: "Café con leche", en: "Café latte" },
    price: 1.6,
  },
  {
    name: { es: "Té e infusiones", en: "Tea & infusions" },
    price: 1.4,
  },
  {
    name: { es: "Tostada con tomate y AOVE", en: "Toast with tomato & olive oil" },
    price: 2.2,
  },
  {
    name: { es: "Bizcocho casero", en: "Homemade sponge cake" },
    price: 2.5,
  },
  {
    name: { es: "Zumo de naranja natural", en: "Fresh orange juice" },
    price: 2.8,
  },
];

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const t = await getTranslations("facilities");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      {/* Encabezado */}
      <Section tone="dawn" className="pb-12 sm:pb-16 lg:pb-20">
        <SectionHeading
          align="center"
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </Section>

      {/* Recorrido por los espacios */}
      <Section tone="ivory" className="pt-4 sm:pt-6 lg:pt-8">
        <div className="flex flex-col gap-20 lg:gap-28">
          {facilities.map((facility, i) =>
            facility.highlight ? (
              <CafeHighlight
                key={facility.id}
                facility={facility}
                locale={locale}
                reversed={i % 2 === 1}
                labels={{
                  hours: t("hours"),
                  cafeHours: t("cafeHours"),
                  cafeMenu: t("cafeMenu"),
                  cafeNote: t("cafeNote"),
                }}
              />
            ) : (
              <FacilityRow
                key={facility.id}
                facility={facility}
                locale={locale}
                reversed={i % 2 === 1}
                detailsTitle={t("detailsTitle")}
              />
            ),
          )}
        </div>
      </Section>

      {/* Accesibilidad */}
      <Section tone="sky">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/12 text-sky-600 ring-1 ring-sky-500/20">
            <Accessibility size={26} strokeWidth={1.6} />
          </span>
          <h2 className="font-display text-3xl font-semibold text-balance text-sky-900 lg:text-4xl">
            {t("accessibilityTitle")}
          </h2>
          <p className="text-lg text-pretty text-mist-600">
            {t("accessibilityBody")}
          </p>
          <ul className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <AccessChip
              icon={<DoorOpen size={16} />}
              label={locale === "es" ? "Acceso con rampa" : "Ramp access"}
            />
            <AccessChip
              icon={<Accessibility size={16} />}
              label={locale === "es" ? "Baño adaptado" : "Adapted restroom"}
            />
            <AccessChip
              icon={<Ear size={16} />}
              label={locale === "es" ? "Bucle magnético" : "Hearing loop"}
            />
          </ul>
        </Reveal>
      </Section>

      {/* CTA reserva de visita */}
      <Section tone="deep">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-balance text-paper lg:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-pretty text-sky-100/80">{t("ctaBody")}</p>
          <Button href="/contacto" variant="gold" size="lg">
            {t("bookVisit")}
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      </Section>
    </>
  );
}

/** Fila de un espacio con la imagen alternando de lado (asimetría). */
function FacilityRow({
  facility,
  locale,
  reversed,
  detailsTitle,
}: {
  facility: Facility;
  locale: Locale;
  reversed: boolean;
  detailsTitle: string;
}) {
  return (
    <Reveal>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Imagen */}
        <div className={cn("relative", reversed && "lg:order-2")}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-mist-200/70">
            <Image
              src={facility.image}
              alt={tr(facility.name, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </div>

        {/* Texto */}
        <div className={cn("flex flex-col gap-5", reversed && "lg:order-1")}>
          <h2 className="font-display text-2xl font-semibold text-balance text-sky-900 lg:text-3xl">
            {tr(facility.name, locale)}
          </h2>
          <p className="text-lg text-pretty text-mist-600">
            {tr(facility.description, locale)}
          </p>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600">
              {detailsTitle}
            </span>
            <ul className="flex flex-col gap-2.5">
              {facility.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sky-900">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600"
                  >
                    <Check size={15} strokeWidth={2.4} />
                  </span>
                  <span className="text-pretty">{tr(detail, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Cafetería destacada con mini-carta y horario. */
function CafeHighlight({
  facility,
  locale,
  reversed,
  labels,
}: {
  facility: Facility;
  locale: Locale;
  reversed: boolean;
  labels: { hours: string; cafeHours: string; cafeMenu: string; cafeNote: string };
}) {
  return (
    <Reveal>
      <div className="grid items-center gap-8 rounded-[var(--radius-lg)] bg-dawn p-6 ring-1 ring-mist-200/70 shadow-soft sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        {/* Imagen */}
        <div className={cn("relative", reversed && "lg:order-2")}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-md)] shadow-lift ring-1 ring-paper/60">
            <Image
              src={facility.image}
              alt={tr(facility.name, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </div>

        {/* Texto + carta */}
        <div className={cn("flex flex-col gap-5", reversed && "lg:order-1")}>
          <Badge tone="gold" className="w-fit">
            <Coffee size={13} />
            {tr(facility.name, locale)}
          </Badge>
          <h2 className="font-display text-2xl font-semibold text-balance text-sky-900 lg:text-3xl">
            {tr(facility.name, locale)}
          </h2>
          <p className="text-pretty text-mist-600">
            {tr(facility.description, locale)}
          </p>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-paper/80 px-4 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-mist-200">
            <Clock size={15} className="text-gold-500" />
            <span className="sr-only">{labels.hours}: </span>
            {labels.cafeHours}
          </div>

          {/* Mini-carta */}
          <div className="mt-1 rounded-[var(--radius-md)] bg-paper/90 p-5 ring-1 ring-mist-200">
            <h3 className="mb-3 font-display text-lg text-sky-900">
              {labels.cafeMenu}
            </h3>
            <ul className="flex flex-col">
              {cafeMenu.map((entry, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 border-b border-dashed border-mist-200 py-2 last:border-0"
                >
                  <span className="text-sky-900">{tr(entry.name, locale)}</span>
                  <span
                    aria-hidden
                    className="mx-1 h-px flex-1 translate-y-1 border-b border-dotted border-mist-400/60"
                  />
                  <span className="font-semibold tabular-nums text-sky-700">
                    {formatPrice(entry.price, locale)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-pretty text-mist-600">
              {labels.cafeNote}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function AccessChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li>
      <span className="inline-flex items-center gap-2 rounded-full bg-paper/80 px-4 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-mist-200">
        <span aria-hidden className="text-sky-600">
          {icon}
        </span>
        {label}
      </span>
    </li>
  );
}
