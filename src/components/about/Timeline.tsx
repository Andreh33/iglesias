import { getLocale } from "next-intl/server";
import { t as tr } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/types";
import type { Milestone } from "@/data/beliefs";

/**
 * Línea de tiempo vertical (Server Component) con revelado escalonado.
 * Eje central con nodos dorados y tarjetas alternadas en escritorio.
 */
export async function Timeline({ milestones }: { milestones: Milestone[] }) {
  const locale = (await getLocale()) as Locale;

  return (
    <ol className="relative mx-auto mt-16 max-w-3xl">
      {/* Eje vertical */}
      <span
        aria-hidden
        className="absolute left-[1.05rem] top-2 bottom-2 w-px bg-gradient-to-b from-sky-200 via-sky-300 to-transparent md:left-1/2 md:-translate-x-1/2"
      />

      {milestones.map((m, i) => (
        <li key={m.year} className="relative md:grid md:grid-cols-2 md:gap-x-12">
          <Reveal
            delay={i * 90}
            className={
              "relative pb-12 pl-12 md:pb-16 " +
              (i % 2 === 0
                ? "md:col-start-1 md:pl-0 md:pr-12 md:text-right"
                : "md:col-start-2 md:pl-12")
            }
          >
            {/* Nodo en el eje */}
            <span
              aria-hidden
              className={
                "absolute top-1 grid h-9 w-9 place-items-center rounded-full bg-paper ring-1 ring-mist-200 shadow-soft left-0 " +
                (i % 2 === 0
                  ? "md:left-auto md:-right-[1.125rem]"
                  : "md:-left-[1.125rem]")
              }
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
            </span>

            <p className="font-display text-3xl font-semibold text-gradient-sky lg:text-4xl">
              {m.year}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-sky-900">
              {tr(m.title, locale)}
            </h3>
            <p className="mt-2 text-mist-600 text-pretty">{tr(m.body, locale)}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
