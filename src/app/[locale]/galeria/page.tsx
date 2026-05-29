import type { Metadata } from "next";
import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GalleryMasonry,
  type ResolvedGalleryItem,
} from "@/components/gallery/GalleryMasonry";
import { gallery } from "@/data/gallery";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: ["/images/og-default.svg"],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const t = await getTranslations("gallery");
  const locale = (await getLocale()) as Locale;

  const items: ResolvedGalleryItem[] = gallery.map((item) => ({
    id: item.id,
    src: item.src,
    alt: tr(item.alt, locale),
    category: item.category,
    span: item.span,
  }));

  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-12">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <GalleryMasonry items={items} />
      </div>
    </Section>
  );
}
