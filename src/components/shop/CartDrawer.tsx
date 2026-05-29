"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart, selectSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { BLUR } from "@/lib/img";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";

export function CartDrawer({ locale }: { locale: Locale }) {
  const t = useTranslations("cart");
  const { items, isOpen, close, setQuantity, remove } = useCart();
  const subtotal = useCart(selectSubtotal);

  return (
    <div
      className={cn("fixed inset-0 z-[80]", isOpen ? "" : "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-sky-900/40 backdrop-blur-sm transition-opacity duration-[var(--dur-mid)]",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={close}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-lift transition-transform duration-[var(--dur-mid)] ease-[var(--ease-out-expo)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
      >
        <header className="flex items-center justify-between border-b border-mist-200 px-6 py-5">
          <h2 className="flex items-center gap-2 font-display text-xl text-sky-900">
            <ShoppingBag size={20} className="text-sky-500" /> {t("title")}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t("title")}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sky-50"
          >
            <X size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-400">
              <ShoppingBag size={28} />
            </div>
            <p className="font-display text-xl text-sky-900">{t("empty")}</p>
            <p className="text-sm text-mist-600">{t("emptyDesc")}</p>
            <Link
              href="/tienda"
              onClick={close}
              className="mt-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-paper hover:bg-sky-600"
            >
              {t("goShop")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist-200/70 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-sky-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR}
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <span className="font-medium text-sky-900">{item.name}</span>
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        aria-label={t("remove")}
                        className="text-mist-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {item.options && (
                      <span className="text-xs text-mist-600">
                        {Object.values(item.options).join(" · ")}
                      </span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full ring-1 ring-mist-200">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label="−"
                          className="flex h-8 w-8 items-center justify-center text-sky-700 hover:text-sky-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label="+"
                          className="flex h-8 w-8 items-center justify-center text-sky-700 hover:text-sky-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-semibold text-sky-900">
                        {formatPrice(item.price * item.quantity, locale)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-mist-200 px-6 py-5">
              <div className="flex items-center justify-between text-sky-900">
                <span className="text-mist-600">{t("subtotal")}</span>
                <span className="font-display text-2xl">{formatPrice(subtotal, locale)}</span>
              </div>
              <p className="mt-1 text-xs text-mist-600">{t("vatIncluded")}</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={close}
                  className="rounded-full bg-sky-500 px-6 py-3.5 text-center font-semibold text-paper transition-colors hover:bg-sky-600"
                >
                  {t("checkout")}
                </Link>
                <Link
                  href="/carrito"
                  onClick={close}
                  className="rounded-full px-6 py-2.5 text-center text-sm font-medium text-sky-700 hover:text-sky-500"
                >
                  {t("viewCart")}
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
