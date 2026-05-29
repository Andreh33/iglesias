import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { themeCssVars } from "@/config/theme";
import { site } from "@/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { RadioMiniPlayer } from "@/components/media/RadioMiniPlayer";
import type { Locale } from "@/types";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "identity" });
  return {
    metadataBase: new URL("https://nuevavida.example"),
    title: {
      default: `${site.identity.name} — ${t("tagline")}`,
      template: `%s · ${site.identity.shortName}`,
    },
    description: t("tagline"),
    icons: { icon: "/brand/logo.svg" },
    openGraph: {
      type: "website",
      siteName: site.identity.name,
      images: ["/images/og-default.jpg"],
      locale: locale === "es" ? "es_ES" : "en_GB",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      languages: { es: "/es", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fraunces.variable} ${hanken.variable}`}>
      <body style={themeCssVars()} className="font-body antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sky-900 focus:px-5 focus:py-2 focus:text-paper"
          >
            {locale === "es" ? "Saltar al contenido" : "Skip to content"}
          </a>
          <Header locale={locale as Locale} />
          <main id="main">{children}</main>
          <Footer locale={locale as Locale} />
          <CartDrawer locale={locale as Locale} />
          {site.features.radio && <RadioMiniPlayer locale={locale as Locale} />}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
