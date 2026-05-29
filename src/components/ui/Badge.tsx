import { cn } from "@/lib/cn";

type Tone = "sky" | "gold" | "deep" | "soft";

const tones: Record<Tone, string> = {
  sky: "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/20",
  gold: "bg-gold-500/15 text-gold-600 ring-1 ring-gold-500/25",
  deep: "bg-sky-900 text-paper",
  soft: "bg-paper/80 text-sky-700 ring-1 ring-mist-200 backdrop-blur",
};

export function Badge({
  children,
  tone = "sky",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
