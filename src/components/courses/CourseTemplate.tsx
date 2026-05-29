import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Users, Clock, MonitorPlay, UserRound } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CourseSyllabus } from "@/components/courses/CourseSyllabus";
import { EnrollForm } from "@/components/courses/EnrollForm";
import { courses } from "@/data/courses";
import { t as tr } from "@/lib/i18n";
import { BLUR } from "@/lib/img";
import type { CourseKey, Locale } from "@/types";

/**
 * Plantilla reutilizable de una subpágina de curso.
 * Busca el curso por `courseKey`, pinta hero + meta + temario + inscripción.
 */
export async function CourseTemplate({
  courseKey,
  locale,
}: {
  courseKey: CourseKey;
  locale: Locale;
}) {
  const course = courses.find((c) => c.key === courseKey);
  if (!course) notFound();

  const t = await getTranslations("courses");
  const tc = await getTranslations("common");

  const title = tr(course.title, locale);
  const meta = [
    { icon: Users, label: t("audience"), value: tr(course.audience, locale) },
    { icon: Clock, label: t("duration"), value: tr(course.duration, locale) },
    { icon: MonitorPlay, label: t("format"), value: tr(course.format, locale) },
    { icon: UserRound, label: t("facilitator"), value: course.facilitator },
  ];

  return (
    <>
      {/* Hero del curso */}
      <section className="relative overflow-hidden bg-dawn-strong noise-overlay">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-mesh opacity-60"
        />
        <Container className="relative z-10 grid items-center gap-12 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
          <div className="flex flex-col items-start gap-6">
            <Button href="/cursos" variant="link" size="sm" className="px-0">
              ← {tc("back")}
            </Button>
            <span className="animate-rise delay-1 inline-flex items-center gap-2 rounded-full bg-paper/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 ring-1 ring-mist-200 backdrop-blur">
              <Icon name={course.icon} size={16} className="text-gold-500" />
              {t("kicker")}
            </span>
            <h1 className="animate-rise delay-2 max-w-xl font-display text-4xl font-semibold leading-[1.04] text-sky-900 text-balance lg:text-5xl">
              {title}
            </h1>
            <p className="animate-rise delay-3 max-w-lg text-lg text-mist-600 text-pretty">
              {tr(course.tagline, locale)}
            </p>
          </div>

          <div className="animate-rise delay-3 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-lift ring-1 ring-paper/60">
              <Image
                src={`/images/course-${course.key}.svg`}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Descripción + metadatos */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="flex flex-col gap-5">
            <p className="text-lg text-mist-600 text-pretty">
              {tr(course.description, locale)}
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-3">
            {meta.map(({ icon: MetaIcon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-[var(--radius-md)] bg-paper p-5 shadow-soft ring-1 ring-mist-200/70"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
                  <MetaIcon size={18} strokeWidth={1.7} aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <Badge tone="soft">{label}</Badge>
                  <span className="text-pretty text-sky-900">{value}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Temario + inscripción */}
      <Section tone="sky">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <CourseSyllabus modules={course.modules} locale={locale} />
          </Reveal>
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <EnrollForm courseTitle={title} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
