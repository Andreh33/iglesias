import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/data/gallery";
import { BLUR } from "@/lib/img";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Vista previa de la galería: mosaico masonry con CSS multi-column
 * (columns-2 md:columns-3 + break-inside-avoid). Sin lightbox aquí;
 * el CTA lleva a la galería completa.
 */
export async function GalleryPreview() {
  const t = await getTranslations("gallery");
  const locale = (await getLocale()) as Locale;
  const items = gallery.slice(0, 8);

  return (
    <Section tone="paper">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Reveal delay={120} className="shrink-0">
            <Button href="/galeria" variant="outline" size="md">
              {t("viewGallery")}
              <ArrowRight size={18} />
            </Button>
          </Reveal>
        </div>

        <Reveal>
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {items.map((item, i) => (
              <figure
                key={item.id}
                className="group relative block break-inside-avoid overflow-hidden rounded-[var(--radius-md)] ring-1 ring-mist-200/70 shadow-soft"
              >
                <Image
                  src={item.src}
                  alt={tr(item.alt, locale)}
                  width={item.span === "wide" ? 800 : 600}
                  height={
                    item.span === "tall"
                      ? 800
                      : item.span === "wide"
                        ? 450
                        : 600
                  }
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="h-auto w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent opacity-0 transition-opacity duration-[var(--dur-mid)] group-hover:opacity-100"
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
