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
  return { title: t("privacy") };
}

const content: { h: LocalizedText; p: LocalizedText }[] = [
  {
    h: { es: "Responsable del tratamiento", en: "Data controller" },
    p: {
      es: `${site.identity.name} es responsable del tratamiento de los datos personales que nos facilites. Puedes dirigirte a nosotros en ${site.contact.email} para cualquier cuestión relacionada con tu privacidad.`,
      en: `${site.identity.name} is the controller of the personal data you provide. You can contact us at ${site.contact.email} for any matter related to your privacy.`,
    },
  },
  {
    h: { es: "Finalidad y base jurídica", en: "Purpose and legal basis" },
    p: {
      es: "Tratamos tus datos para atender tus consultas, gestionar inscripciones a actividades y enviarte comunicaciones cuando lo has consentido. La base jurídica es tu consentimiento y el interés legítimo de mantener nuestra relación contigo.",
      en: "We process your data to respond to your enquiries, manage registrations for activities and send you communications when you have consented. The legal basis is your consent and the legitimate interest in maintaining our relationship with you.",
    },
  },
  {
    h: { es: "Conservación de los datos", en: "Data retention" },
    p: {
      es: "Conservamos tus datos durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y mientras no solicites su supresión, así como durante los plazos legalmente exigibles.",
      en: "We keep your data for as long as necessary to fulfil the purpose for which it was collected and until you request its deletion, as well as for the periods legally required.",
    },
  },
  {
    h: { es: "Tus derechos (RGPD)", en: "Your rights (GDPR)" },
    p: {
      es: "Conforme al Reglamento General de Protección de Datos, puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos al correo indicado. También puedes reclamar ante la Agencia Española de Protección de Datos.",
      en: "Under the General Data Protection Regulation, you may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to the email above. You may also lodge a complaint with the Spanish Data Protection Agency.",
    },
  },
  {
    h: { es: "Comunicación de datos a terceros", en: "Sharing data with third parties" },
    p: {
      es: "No cedemos tus datos a terceros salvo obligación legal o cuando sea imprescindible para prestar el servicio solicitado, en cuyo caso aplicamos las garantías adecuadas con nuestros proveedores.",
      en: "We do not share your data with third parties except by legal obligation or when essential to provide the requested service, in which case we apply appropriate safeguards with our providers.",
    },
  },
  {
    h: { es: "Seguridad", en: "Security" },
    p: {
      es: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente al acceso no autorizado, la pérdida o la alteración.",
      en: "We apply reasonable technical and organisational measures to protect your data against unauthorised access, loss or alteration.",
    },
  },
];

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;
  const t = await getTranslations("footer");

  return (
    <LegalShell titleKey="footer.privacy" title={t("privacy")} locale={lc}>
      {content.map((block, i) => (
        <section key={i} className="flex flex-col gap-3">
          <h2>{block.h[lc]}</h2>
          <p>{block.p[lc]}</p>
        </section>
      ))}
    </LegalShell>
  );
}
