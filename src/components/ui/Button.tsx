import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "gold" | "link" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-sky-500 text-paper shadow-soft hover:bg-sky-600 hover:shadow-lift hover:-translate-y-0.5",
  gold: "rounded-full bg-gold-500 text-sky-900 shadow-[var(--shadow-glow)] hover:bg-gold-600 hover:-translate-y-0.5",
  ghost:
    "rounded-full bg-paper/70 text-sky-900 ring-1 ring-mist-200 backdrop-blur hover:bg-paper hover:ring-sky-300",
  outline:
    "rounded-full bg-transparent text-sky-700 ring-1 ring-sky-300 hover:bg-sky-50",
  link: "text-sky-700 underline-offset-4 hover:underline hover:text-sky-500",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props;
    const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (external) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
