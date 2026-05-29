import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Kicker({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]",
        light ? "text-gold-300" : "text-sky-600",
        className,
      )}
    >
      <span
        className={cn("h-px w-7", light ? "bg-gold-300" : "bg-gold-500")}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  light = false,
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && <Kicker light={light}>{kicker}</Kicker>}
      <h2
        className={cn(
          "font-display text-3xl font-semibold text-balance lg:text-4xl",
          light ? "text-paper" : "text-sky-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-pretty",
            light ? "text-sky-100/80" : "text-mist-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
