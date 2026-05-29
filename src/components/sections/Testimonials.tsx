import { getTranslations, getLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";
import {
  TestimonialsCarousel,
  type ResolvedTestimonial,
} from "./TestimonialsCarousel";

/**
 * Sección de testimonios sobre fondo celeste profundo (tone="deep").
 * Resuelve el contenido bilingüe en el servidor y delega la interacción
 * (carrusel embla) a un componente cliente con props serializables.
 */
export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const tg = await getTranslations("gallery");
  const locale = (await getLocale()) as Locale;

  const items: ResolvedTestimonial[] = testimonials.map((item) => ({
    id: item.id,
    name: item.name,
    role: tr(item.role, locale),
    quote: tr(item.quote, locale),
    avatar: item.avatar,
  }));

  return (
    <Section tone="deep">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh opacity-30"
      />
      <div className="relative z-10 flex flex-col gap-12">
        <SectionHeading
          align="center"
          light
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <TestimonialsCarousel
          items={items}
          labels={{ prev: tg("prev"), next: tg("next") }}
        />
      </div>
    </Section>
  );
}
