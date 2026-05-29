import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-[1240px]",
        size === "wide" && "max-w-[1440px]",
        size === "narrow" && "max-w-[820px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
