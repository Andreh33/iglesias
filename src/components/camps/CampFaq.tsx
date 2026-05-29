"use client";

import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { t as tr } from "@/lib/i18n";
import type { Locale, LocalizedText } from "@/types";

type Faq = { q: LocalizedText; a: LocalizedText };

// Preguntas frecuentes de campamentos (bilingüe inline).
const faqs: Faq[] = [
  {
    q: { es: "¿Qué tengo que llevar?", en: "What should I bring?" },
    a: {
      es: "Saco de dormir, ropa cómoda y de abrigo, gorra, calzado deportivo, bañador y toalla, neceser con protección solar y una botella reutilizable. Te enviaremos la lista completa al confirmar la plaza.",
      en: "A sleeping bag, comfortable and warm clothes, a cap, sports shoes, swimwear and a towel, a toiletry bag with sunscreen and a reusable bottle. We will send the full list once your spot is confirmed.",
    },
  },
  {
    q: { es: "¿El campamento tiene seguro?", en: "Is the camp insured?" },
    a: {
      es: "Sí. Todos los participantes están cubiertos por un seguro de accidentes y responsabilidad civil durante toda la estancia, y contamos con personal de primeros auxilios en cada turno.",
      en: "Yes. Every participant is covered by accident and civil liability insurance throughout the stay, and we have first-aid staff on site during each session.",
    },
  },
  {
    q: { es: "¿Qué normas de convivencia hay?", en: "What are the house rules?" },
    a: {
      es: "Buscamos un ambiente de respeto, cuidado y diversión sana. No se permiten dispositivos electrónicos durante las actividades ni salir del recinto sin un monitor. Las normas completas se firman al llegar.",
      en: "We aim for an atmosphere of respect, care and healthy fun. Electronic devices are not allowed during activities, and no one may leave the grounds without a leader. The full rules are signed on arrival.",
    },
  },
  {
    q: { es: "¿Cómo son los monitores?", en: "Who are the leaders?" },
    a: {
      es: "Nuestro equipo está formado por monitores titulados de tiempo libre con experiencia y certificado de delitos sexuales. La ratio es de un monitor por cada ocho participantes.",
      en: "Our team is made up of qualified leisure-time leaders with experience and a clean background check. The ratio is one leader for every eight participants.",
    },
  },
  {
    q: {
      es: "¿Puedo contactar con mi hijo o hija durante el campamento?",
      en: "Can I contact my child during the camp?",
    },
    a: {
      es: "Sí. Cada día publicamos fotos en un canal privado y hay una franja horaria para llamadas. Ante cualquier necesidad, la coordinación está disponible por teléfono las 24 horas.",
      en: "Yes. We post photos daily in a private channel and there is a time slot for calls. For anything urgent, the coordination team is reachable by phone 24 hours a day.",
    },
  },
];

export function CampFaq({ title }: { title: string }) {
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-mist-200/70 rounded-[var(--radius-md)] bg-paper shadow-soft ring-1 ring-mist-200/70">
      <h2 className="sr-only">{title}</h2>
      {faqs.map((faq, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sky-50/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400"
              >
                <span className="font-display text-lg text-sky-900">{tr(faq.q, locale)}</span>
                <Plus
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-sky-600 transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)]",
                    expanded && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className="px-6 pb-6 text-pretty text-mist-600"
            >
              {tr(faq.a, locale)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
