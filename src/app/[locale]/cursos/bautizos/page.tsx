import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CourseTemplate } from "@/components/courses/CourseTemplate";
import { courses } from "@/data/courses";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

const COURSE_KEY = "bautizos" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lc = locale as Locale;
  const course = courses.find((c) => c.key === COURSE_KEY);
  return {
    title: course ? tr(course.title, lc) : undefined,
    description: course ? tr(course.tagline, lc) : undefined,
  };
}

export default async function BautizosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CourseTemplate courseKey={COURSE_KEY} locale={locale as Locale} />;
}
