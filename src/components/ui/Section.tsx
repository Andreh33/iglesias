import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "ivory" | "paper" | "dawn" | "deep" | "sky";

const toneClass: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  paper: "bg-paper text-ink",
  dawn: "bg-dawn text-ink",
  deep: "bg-deep text-paper noise-overlay",
  sky: "bg-sky-50 text-ink",
};

export function Section({
  children,
  className,
  tone = "ivory",
  container = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  container?: "default" | "wide" | "narrow" | false;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 sm:py-28 lg:py-32",
        toneClass[tone],
        className,
      )}
    >
      {container === false ? (
        children
      ) : (
        <Container size={container} className="relative z-10">
          {children}
        </Container>
      )}
    </section>
  );
}
