import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";
import type { Locale, LocalizedText } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: t("cookies") };
}

const content: { h: LocalizedText; p: LocalizedText }[] = [
  {
    h: { es: "¿Qué son las cookies?", en: "What are cookies?" },
    p: {
      es: "Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Sirven para que la página funcione correctamente, recordar tus preferencias y, en algunos casos, analizar el uso del sitio.",
      en: "Cookies are small files stored on your device when you visit a website. They help the page work properly, remember your preferences and, in some cases, analyse how the site is used.",
    },
  },
  {
    h: { es: "Cookies que utilizamos", en: "Cookies we use" },
    p: {
      es: "Empleamos cookies técnicas necesarias para el funcionamiento básico (por ejemplo, recordar tu idioma o el estado del carrito) y, sólo con tu consentimiento, cookies de medición para entender de forma agregada cómo se utiliza la web.",
      en: "We use technical cookies necessary for basic operation (for example, remembering your language or cart state) and, only with your consent, measurement cookies to understand in aggregate how the site is used.",
    },
  },
  {
    h: { es: "Gestión y consentimiento", en: "Management and consent" },
    p: {
      es: "Al acceder por primera vez te mostramos un aviso para que aceptes o rechaces las cookies no esenciales. Puedes cambiar tu decisión en cualquier momento desde la configuración de tu navegador.",
      en: "On your first visit we show a banner so you can accept or reject non-essential cookies. You can change your choice at any time through your browser settings.",
    },
  },
  {
    h: { es: "Cookies de terceros", en: "Third-party cookies" },
    p: {
      es: "Algunos contenidos incrustados, como mapas o reproductores de vídeo, pueden instalar cookies propias del proveedor. Por eso cargamos estos elementos de forma diferida, sólo cuando interactúas con ellos.",
      en: "Some embedded content, such as maps or video players, may set the provider's own cookies. That is why we load these elements lazily, only when you interact with them.",
    },
  },
  {
    h: { es: "Actualizaciones de esta política", en: "Updates to this policy" },
    p: {
      es: "Podemos actualizar esta política para reflejar cambios técnicos o legales. Te recomendamos revisarla periódicamente para estar al día.",
      en: "We may update this policy to reflect technical or legal changes. We recommend reviewing it periodically to stay informed.",
    },
  },
];

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lc = locale as Locale;
  const t = await getTranslations("footer");

  return (
    <LegalShell titleKey="footer.cookies" title={t("cookies")} locale={lc}>
      {content.map((block, i) => (
        <section key={i} className="flex flex-col gap-3">
          <h2>{block.h[lc]}</h2>
          <p>{block.p[lc]}</p>
        </section>
      ))}
    </LegalShell>
  );
}
