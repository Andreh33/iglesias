import {
  Users,
  Building2,
  Images,
  CalendarDays,
  Tent,
  BookOpen,
  Sparkles,
  Heart,
  Droplets,
  Radio,
  Tv,
  Newspaper,
  Music,
  Globe,
  HandHelping,
  Baby,
  Coffee,
  Church,
  type LucideIcon,
} from "lucide-react";

// Mapa nombre→icono para iconos referenciados por string en site.config / data.
const map: Record<string, LucideIcon> = {
  Users,
  Building2,
  Images,
  CalendarDays,
  Tent,
  BookOpen,
  Sparkles,
  Heart,
  Droplets,
  Radio,
  Tv,
  Newspaper,
  Music,
  Globe,
  HandHelping,
  Baby,
  Coffee,
  Church,
};

export function Icon({
  name,
  className,
  size = 20,
  strokeWidth = 1.6,
}: {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />;
}
