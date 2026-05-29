"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronDown, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site.config";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { LanguageToggle } from "./LanguageToggle";
import type { Locale } from "@/types";

export function MobileNav({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper shadow-lift">
        <div className="flex items-center justify-between border-b border-mist-200 px-6 py-4">
          <LanguageToggle />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("header.closeMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-sky-900 hover:bg-sky-50"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Móvil">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item, i) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = expanded === item.labelKey;
              return (
                <li
                  key={item.labelKey}
                  className="animate-rise border-b border-mist-200/60"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.labelKey)}
                        className="flex w-full items-center justify-between px-2 py-3.5 text-left font-display text-xl text-sky-900"
                        aria-expanded={isOpen}
                      >
                        {t(item.labelKey)}
                        <ChevronDown
                          size={20}
                          className={cn("transition-transform text-sky-500", isOpen && "rotate-180")}
                        />
                      </button>
                      {isOpen && (
                        <ul className="flex flex-col gap-0.5 pb-2 pl-2">
                          {item.children!.map((child) => (
                            <li key={child.labelKey}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sky-800 hover:bg-sky-50"
                              >
                                {child.icon && <Icon name={child.icon} size={18} className="text-sky-500" />}
                                {t(child.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-2 py-3.5 font-display text-xl text-sky-900"
                    >
                      {t(item.labelKey)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-mist-200 px-6 py-5">
          <Link
            href="/contacto"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 font-semibold text-sky-900"
          >
            {t("nav.visitUs")}
          </Link>
          <a
            href={`tel:${site.contact.phone}`}
            className="inline-flex items-center justify-center gap-2 text-sm text-sky-700"
          >
            <Phone size={16} /> {site.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
