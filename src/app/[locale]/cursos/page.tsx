import type { Metadata } from "next";
import { ArrowRight, Users, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { courses } from "@/data/courses";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function CoursesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;

  const t = await getTranslations("courses");

  return (
    <Section tone="ivory">
      <SectionHeading
        align="center"
        kicker={t("hubKicker")}
        title={t("hubTitle")}
        subtitle={t("hubSubtitle")}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {courses.map((course, i) => (
          <Reveal key={course.key} delay={i * 80} className="h-full">
            <Card
              hover
              className="group flex h-full flex-col gap-5 p-7 focus-within:ring-sky-200 sm:p-9"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-sky-500/12 text-sky-600 transition-colors group-hover:bg-sky-500/18">
                <Icon name={course.icon} size={26} className="text-sky-600" />
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-semibold text-sky-900">
                  <Link
                    href={`/cursos/${course.key}`}
                    className="rounded-[var(--radius-sm)] outline-none after:absolute after:inset-0 after:rounded-[var(--radius-md)] focus-visible:underline focus-visible:decoration-sky-400"
                  >
                    {tr(course.title, lc)}
                  </Link>
                </h3>
                <p className="text-pretty text-mist-600">
                  {tr(course.tagline, lc)}
                </p>
              </div>

              <dl className="mt-auto flex flex-col gap-2 text-sm text-mist-600">
                <div className="flex items-start gap-2">
                  <Users
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-sky-600"
                  />
                  <span>
                    <span className="font-semibold text-sky-900">
                      {t("audience")}:{" "}
                    </span>
                    {tr(course.audience, lc)}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-sky-600"
                  />
                  <span>
                    <span className="font-semibold text-sky-900">
                      {t("duration")}:{" "}
                    </span>
                    {tr(course.duration, lc)}
                  </span>
                </div>
              </dl>

              <span className="inline-flex items-center gap-2 font-medium text-sky-700">
                {t("viewCourse")}
                <ArrowRight
                  size={17}
                  aria-hidden
                  className="transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                />
              </span>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
