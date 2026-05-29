import { site } from "@/config/site.config";

const BASE = "https://nuevavida.example";

/** JSON-LD para la organización/iglesia (usar en el layout o Home). */
export function churchJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.identity.name,
    url: BASE,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.coords.lat,
      longitude: site.contact.coords.lng,
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

/** Inyecta un objeto JSON-LD como <script type="application/ld+json">. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
