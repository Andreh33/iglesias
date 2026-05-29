import { getTranslations } from "next-intl/server";
import { Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Marco editorial para páginas legales (aviso legal, privacidad, cookies).
 * Tipografía display para títulos, cuerpo legible y aviso de demostración.
 * Server component: recibe el título ya resuelto y el contenido como children.
 */
export async function LegalShell({
  title,
  locale,
  children,
}: {
  /** Clave i18n opcional (no se renderiza; sólo para trazabilidad/SEO interno). */
  titleKey?: string;
  title: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = await getTranslations("legal");
  // Fecha de "última actualización" fija para la demo.
  const updated = formatDate("2026-01-15", locale);

  return (
    <Section tone="paper" container="narrow">
      <Reveal className="flex flex-col gap-4">
        <h1 className="font-display text-4xl font-semibold text-balance text-sky-900 lg:text-5xl">
          {title}
        </h1>
        <p className="text-sm font-medium text-mist-600">
          {t("lastUpdated")}: {updated}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div
          role="note"
          className="mt-8 flex items-start gap-3 rounded-[var(--radius-md)] border border-gold-500/30 bg-gold-500/10 p-5"
        >
          <Info size={20} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
          <p className="text-pretty text-sm text-sky-800">{t("demoNotice")}</p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="legal-prose mt-10 flex flex-col gap-6 text-pretty leading-relaxed text-mist-600 [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-sky-900 [&_a]:text-sky-700 [&_a]:underline-offset-4 hover:[&_a]:underline">
          {children}
        </div>
      </Reveal>
    </Section>
  );
}
