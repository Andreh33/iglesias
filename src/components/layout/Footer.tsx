import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { Instagram, Youtube, Facebook } from "@/components/ui/SocialIcons";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site.config";
import { NewsletterInline } from "@/components/sections/NewsletterInline";
import { FooterLiveWidget } from "@/components/media/FooterLiveWidget";
import type { Locale } from "@/types";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-deep text-paper noise-overlay">
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          {/* Identidad */}
          <div className="flex flex-col gap-5">
            <Image
              src="/brand/logo-light.svg"
              alt={site.identity.logo.alt}
              width={188}
              height={42}
              className="h-10 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-sky-100/70">
              {t("footer.mission")}
            </p>
            <div className="flex gap-2">
              {[
                { href: site.social.instagram, icon: Instagram, label: "Instagram" },
                { href: site.social.youtube, icon: Youtube, label: "YouTube" },
                { href: site.social.facebook, icon: Facebook, label: "Facebook" },
              ].map(({ href, icon: I, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-gold-500 hover:text-sky-900"
                >
                  <I size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de navegación */}
          {site.footer.columns.map((col) => (
            <nav key={col.titleKey} aria-label={t(col.titleKey)} className="flex flex-col gap-4">
              <h3 className="font-display text-lg text-paper">{t(col.titleKey)}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-sky-100/70 transition-colors hover:text-gold-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto + en directo + newsletter */}
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-lg text-paper">{t("footer.contact")}</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-sky-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
                {site.contact.address}
              </li>
              <li>
                <a href={`tel:${site.contact.phone}`} className="flex items-center gap-2.5 hover:text-gold-300">
                  <Phone size={16} className="text-gold-300" /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2.5 hover:text-gold-300">
                  <Mail size={16} className="text-gold-300" /> {site.contact.email}
                </a>
              </li>
            </ul>
            {site.features.radio && <FooterLiveWidget locale={locale} />}
            <NewsletterInline locale={locale} variant="footer" />
          </div>
        </div>

        {/* Sello FEREDE */}
        {site.features.feredeBadge && (
          <div className="mt-14 flex flex-col items-center gap-3 border-t border-paper/10 pt-10 text-center">
            <Image
              src={site.identity.federationBadge}
              alt={t("footer.ferede")}
              width={72}
              height={72}
              className="h-16 w-16 opacity-90 invert"
            />
            <p className="text-sm font-medium text-sky-100/80">{t("footer.ferede")}</p>
            <p className="max-w-md text-xs text-sky-100/50">{t("footer.feredeNote")}</p>
          </div>
        )}

        {/* Barra legal */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-sky-100/55 sm:flex-row">
          <p>
            © {year} {site.identity.name}. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {t(l.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
