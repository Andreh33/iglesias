import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";
import { site } from "@/config/site.config";
import type { Locale, LocalizedText } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: t("legalNotice") };
}

const content: { h: LocalizedText; p: LocalizedText }[] = [
  {
    h: { es: "Titular del sitio web", en: "Website owner" },
    p: {
      es: `Este sitio web es titularidad de ${site.identity.name}, entidad religiosa sin ánimo de lucro con domicilio en ${site.contact.address}. Puedes contactar con nosotros en ${site.contact.email} o en el teléfono ${site.contact.phone}.`,
      en: `This website is owned by ${site.identity.name}, a non-profit religious entity located at ${site.contact.address}. You can reach us at ${site.contact.email} or by phone at ${site.contact.phone}.`,
    },
  },
  {
    h: { es: "Objeto y condiciones de uso", en: "Purpose and terms of use" },
    p: {
      es: "El presente aviso legal regula el uso del sitio web, que se pone a disposición de las personas usuarias con carácter informativo y comunitario. El acceso y la navegación implican la aceptación de las condiciones aquí recogidas.",
      en: "This legal notice governs the use of the website, which is made available to users for informational and community purposes. Accessing and browsing the site implies acceptance of the conditions set out here.",
    },
  },
  {
    h: { es: "Propiedad intelectual e industrial", en: "Intellectual and industrial property" },
    p: {
      es: "Los contenidos, textos, imágenes, logotipos y demás elementos del sitio están protegidos por la normativa de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa, salvo para uso personal y no comercial.",
      en: "The contents, texts, images, logos and other elements of the site are protected by intellectual property law. Their total or partial reproduction is prohibited without express authorisation, except for personal and non-commercial use.",
    },
  },
  {
    h: { es: "Responsabilidad", en: "Liability" },
    p: {
      es: "Procuramos que la información publicada sea veraz y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad ininterrumpida del servicio. No nos responsabilizamos de los contenidos de sitios de terceros enlazados desde esta web.",
      en: "We strive to keep the published information accurate and up to date, but we do not guarantee the absence of errors or uninterrupted availability of the service. We are not responsible for the content of third-party sites linked from this website.",
    },
  },
  {
    h: { es: "Legislación aplicable", en: "Applicable law" },
    p: {
      es: "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.",
      en: "These terms are governed by Spanish law. For the resolution of any dispute, the parties submit to the courts and tribunals that apply under the law.",
    },
  },
];

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;
  const t = await getTranslations("footer");

  return (
    <LegalShell titleKey="footer.legalNotice" title={t("legalNotice")} locale={lc}>
      {content.map((block, i) => (
        <section key={i} className="flex flex-col gap-3">
          <h2>{block.h[lc]}</h2>
          <p>{block.p[lc]}</p>
        </section>
      ))}
    </LegalShell>
  );
}
