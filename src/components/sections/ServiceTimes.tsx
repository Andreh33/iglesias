import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site.config";

/**
 * Horarios de culto: una tarjeta limpia por día con icono, hora destacada y
 * CTA "Cómo llegar" hacia /contacto. Lee site.services y traduce day/title
 * con las claves raíz services.*.
 */
export async function ServiceTimes() {
  const t = await getTranslations("services");
  // getTranslations() raíz para resolver claves completas tipo "services.sunday".
  const tRoot = await getTranslations();

  return (
    <Section tone="ivory">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((service, i) => {
          const isSunday = service.id === "domingo";
          return (
            <Reveal key={service.id} delay={i * 90}>
              <Card hover className="flex h-full flex-col gap-5 p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Icon name={isSunday ? "Church" : "CalendarDays"} size={22} />
                  </span>
                  <span className="font-display text-3xl font-semibold text-sky-900">
                    {service.time}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600">
                    {tRoot(service.dayKey)}
                  </p>
                  <h3 className="font-display text-xl text-sky-900">
                    {tRoot(service.titleKey)}
                  </h3>
                </div>

                <Link
                  href="/contacto"
                  className="group mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sky-700 underline-offset-4 transition-colors hover:text-sky-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t("directions")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-[var(--dur-mid)] group-hover:translate-x-1"
                  />
                </Link>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
