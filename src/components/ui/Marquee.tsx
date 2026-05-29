import { cn } from "@/lib/cn";

/**
 * Franja de versículos en movimiento lento. Se duplica el contenido para un
 * bucle continuo; la animación se detiene con prefers-reduced-motion.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden border-y border-sky-500/15 bg-sky-50/60 py-4",
        className,
      )}
      aria-hidden
    >
      <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap font-display text-lg italic text-sky-700"
          >
            {item}
            <span className="text-gold-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
