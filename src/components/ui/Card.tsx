import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-[var(--radius-md)] bg-paper ring-1 ring-mist-200/70",
        hover &&
          "transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift hover:ring-sky-200",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
