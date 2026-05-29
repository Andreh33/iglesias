import { cn } from "@/lib/cn";

/**
 * Cita bíblica destacada: Fraunces itálica, comillas grandes y filete dorado.
 * Nunca uses cursiva del cuerpo para versículos — usa este componente.
 */
export function VerseCallout({
  text,
  reference,
  light = false,
  className,
}: {
  text: string;
  reference?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative my-2 max-w-2xl border-l-2 border-gold-500 pl-7",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -left-1 -top-6 font-display text-7xl leading-none text-gold-500/40 select-none"
      >
        “
      </span>
      <blockquote
        className={cn(
          "font-display text-2xl italic leading-snug text-balance",
          light ? "text-paper" : "text-sky-800",
        )}
      >
        {text}
      </blockquote>
      {reference && (
        <figcaption
          className={cn(
            "mt-3 text-sm font-semibold uppercase tracking-[0.16em]",
            light ? "text-gold-300" : "text-sky-600",
          )}
        >
          — {reference}
        </figcaption>
      )}
    </figure>
  );
}
