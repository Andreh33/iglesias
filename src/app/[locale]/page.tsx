import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { ServiceTimes } from "@/components/sections/ServiceTimes";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { MinistriesGrid } from "@/components/sections/MinistriesGrid";
import { VerseMarquee } from "@/components/sections/VerseMarquee";
import { MediaLive } from "@/components/sections/MediaLive";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { ShopFeatured } from "@/components/sections/ShopFeatured";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CampsTeaser } from "@/components/sections/CampsTeaser";
import { PrayerCTA } from "@/components/sections/PrayerCTA";
import { LocationMap } from "@/components/sections/LocationMap";
import { JsonLd, churchJsonLd } from "@/lib/jsonld";
import { site } from "@/config/site.config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={churchJsonLd()} />
      <Hero />
      <Welcome />
      <ServiceTimes />
      <AboutPreview />
      <MinistriesGrid />
      <VerseMarquee />
      {site.features.radio && <MediaLive />}
      <EventsPreview />
      {site.features.shop && <ShopFeatured />}
      {site.features.blog && <BlogPreview />}
      <Testimonials />
      <GalleryPreview />
      {site.features.camps && <CampsTeaser />}
      <PrayerCTA />
      <LocationMap />
    </>
  );
}
