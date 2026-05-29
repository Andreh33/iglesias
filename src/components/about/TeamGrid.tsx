import Image from "next/image";
import { getLocale } from "next-intl/server";
import { t as tr } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { BLUR } from "@/lib/img";
import type { Locale, TeamMember } from "@/types";

/**
 * Grid de tarjetas del equipo pastoral (Server Component).
 * Avatar, nombre, rol y bio resueltos al idioma activo.
 */
export async function TeamGrid({ members }: { members: TeamMember[] }) {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <Reveal key={m.name} delay={(i % 3) * 90}>
          <Card hover className="flex h-full flex-col items-center p-7 text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-mist-200 shadow-soft">
              <Image
                src={m.avatar}
                alt={m.name}
                fill
                sizes="112px"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-sky-900">
              {m.name}
            </h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
              {tr(m.role, locale)}
            </p>
            <p className="mt-4 text-mist-600 text-pretty">{tr(m.bio, locale)}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
