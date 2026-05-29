"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, ShoppingBag, Search, Menu, Radio } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site.config";
import { useCart, selectCount } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { AnnouncementBar } from "./AnnouncementBar";
import type { Locale } from "@/types";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 240 && openMenu === null);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu]);

  return (
    <>
      {site.features.announcementBar && <AnnouncementBar />}

      <header
        className={cn(
          "sticky top-0 z-50 transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)]",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div
          className={cn(
            "border-b transition-all duration-[var(--dur-mid)]",
            scrolled || openMenu
              ? "border-mist-200 bg-paper/90 backdrop-blur-xl shadow-soft"
              : "border-transparent bg-paper/40 backdrop-blur",
          )}
        >
          <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center" aria-label={site.identity.name}>
              <Image
                src={site.identity.logo.src}
                alt={site.identity.logo.alt}
                width={188}
                height={42}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Nav escritorio */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
              {site.nav.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <div
                    key={item.labelKey}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenMenu(item.labelKey)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-sky-900/85 transition-colors hover:text-sky-600",
                        openMenu === item.labelKey && "text-sky-600",
                      )}
                      aria-expanded={hasChildren ? openMenu === item.labelKey : undefined}
                    >
                      {t(item.labelKey)}
                      {hasChildren && (
                        <ChevronDown
                          size={15}
                          className={cn(
                            "transition-transform",
                            openMenu === item.labelKey && "rotate-180",
                          )}
                        />
                      )}
                    </Link>

                    {hasChildren && openMenu === item.labelKey && (
                      <div
                        className={cn(
                          "absolute left-1/2 top-full -translate-x-1/2 pt-3",
                          item.mega ? "w-[640px]" : "w-[340px]",
                        )}
                      >
                        <div className="animate-fade rounded-[var(--radius-md)] border border-mist-200 bg-paper/95 p-3 shadow-lift backdrop-blur-xl">
                          <div className={cn("grid gap-1", item.mega ? "grid-cols-2" : "grid-cols-1")}>
                            {item.children!.map((child) => (
                              <Link
                                key={child.labelKey}
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className="group flex items-start gap-3 rounded-[var(--radius-sm)] p-3 transition-colors hover:bg-sky-50"
                              >
                                {child.icon && (
                                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-paper">
                                    <Icon name={child.icon} size={18} />
                                  </span>
                                )}
                                <span className="flex flex-col">
                                  <span className="font-medium text-sky-900">{t(child.labelKey)}</span>
                                  {child.descKey && (
                                    <span className="text-sm text-mist-600">{t(child.descKey)}</span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <LanguageToggle className="hidden sm:inline-flex" />

              {site.features.shop && (
                <>
                  <Link
                    href="/tienda"
                    aria-label={t("header.searchShop")}
                    className="hidden h-10 w-10 items-center justify-center rounded-full text-sky-900/80 transition-colors hover:bg-sky-50 hover:text-sky-600 sm:flex"
                  >
                    <Search size={20} strokeWidth={1.7} />
                  </Link>

                  <button
                    type="button"
                    onClick={openCart}
                    aria-label={t("header.cart")}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-sky-900/80 transition-colors hover:bg-sky-50 hover:text-sky-600"
                  >
                    <ShoppingBag size={20} strokeWidth={1.7} />
                    {mounted && count > 0 && (
                      <span
                        key={count}
                        className="animate-pulse-live absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-sky-900"
                      >
                        {count}
                      </span>
                    )}
                  </button>
                </>
              )}

              <Link
                href="/contacto"
                className="hidden rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-sky-900 shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 hover:bg-gold-600 lg:inline-flex"
              >
                {t("nav.visitUs")}
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t("header.openMenu")}
                className="flex h-10 w-10 items-center justify-center rounded-full text-sky-900 transition-colors hover:bg-sky-50 lg:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} locale={locale} />
    </>
  );
}
