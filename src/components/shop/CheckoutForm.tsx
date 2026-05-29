"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Check, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCart, selectSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 3.95;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(4),
  city: z.string().min(2),
  zip: z.string().min(4),
  province: z.string().min(2),
});
type Values = z.infer<typeof schema>;

/**
 * Formulario de checkout en modo demostración (sin pasarela real). Valida con
 * react-hook-form + zod, simula el envío, muestra confirmación y limpia el
 * carrito. Si el carrito está vacío, ofrece volver a la tienda.
 */
export function CheckoutForm({ locale }: { locale: Locale }) {
  const t = useTranslations("checkout");
  const tc = useTranslations("common");
  const tcart = useTranslations("cart");

  const { items, clear } = useCart();
  const subtotal = useCart(selectSubtotal);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: Values) => {
    // TODO: integrar pasarela (Redsys/Stripe/PayPal).
    await new Promise((r) => setTimeout(r, 600));
    clear();
    setDone(true);
  };

  // Estado de éxito.
  if (done) {
    return (
      <Section tone="ivory">
        <div
          role="status"
          className="mx-auto flex max-w-lg flex-col items-center gap-5 py-10 text-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
            <Check size={36} strokeWidth={1.8} />
          </span>
          <h1 className="font-display text-3xl font-semibold text-sky-900">
            {t("successTitle")}
          </h1>
          <p className="text-mist-600 text-pretty">{t("successBody")}</p>
          <Button href="/" variant="primary" size="lg">
            {t("backHome")}
          </Button>
        </div>
      </Section>
    );
  }

  // Carrito vacío (y no recién completado).
  if (items.length === 0) {
    return (
      <Section tone="ivory">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-10 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-400">
            <ShoppingBag size={34} strokeWidth={1.6} />
          </span>
          <h1 className="font-display text-3xl font-semibold text-sky-900">
            {t("emptyRedirect")}
          </h1>
          <Button href="/tienda" variant="primary" size="lg">
            {tcart("goShop")}
            <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    );
  }

  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const fields: {
    name: keyof Values;
    label: string;
    type: string;
    autoComplete: string;
    full?: boolean;
  }[] = [
    { name: "name", label: t("name"), type: "text", autoComplete: "name", full: true },
    { name: "email", label: t("email"), type: "email", autoComplete: "email" },
    { name: "phone", label: t("phone"), type: "tel", autoComplete: "tel" },
    { name: "address", label: t("address"), type: "text", autoComplete: "street-address", full: true },
    { name: "city", label: t("city"), type: "text", autoComplete: "address-level2" },
    { name: "zip", label: t("zip"), type: "text", autoComplete: "postal-code" },
    { name: "province", label: t("province"), type: "text", autoComplete: "address-level1" },
  ];

  return (
    <Section tone="ivory">
      <SectionHeading title={t("title")} />

      <div
        role="note"
        className="mt-8 flex items-center gap-2.5 rounded-[var(--radius-md)] bg-gold-500/12 px-5 py-3.5 text-sm font-medium text-sky-900 ring-1 ring-gold-500/25"
      >
        <Lock size={16} className="text-gold-600" aria-hidden />
        {t("demoNotice")}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8"
        >
          {/* Honeypot anti-spam (oculto a usuarios) */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="checkout-company">Company</label>
            <input id="checkout-company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <fieldset className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-7">
            <legend className="px-2 font-display text-lg font-semibold text-sky-900">
              {t("contactData")}
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.slice(0, 3).map((f) => (
                <Field key={f.name} field={f} register={register} error={!!errors[f.name]} requiredLabel={tc("required")} />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-7">
            <legend className="px-2 font-display text-lg font-semibold text-sky-900">
              {t("shippingAddress")}
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.slice(3).map((f) => (
                <Field key={f.name} field={f} register={register} error={!!errors[f.name]} requiredLabel={tc("required")} />
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-8 py-4 font-medium tracking-tight text-paper shadow-soft transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? tc("sending") : t("placeOrder")}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Resumen del pedido */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70">
            <h2 className="font-display text-xl font-semibold text-sky-900">
              {t("summary")}
            </h2>

            <ul className="flex flex-col gap-2 text-sm">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-start justify-between gap-3 text-sky-900"
                >
                  <span className="text-mist-600 text-pretty">
                    {item.name}
                    <span className="text-mist-400"> × {item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(item.price * item.quantity, locale)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="flex flex-col gap-2.5 border-t border-mist-200 pt-4 text-sky-900">
              <div className="flex items-center justify-between">
                <dt className="text-mist-600">{tcart("subtotal")}</dt>
                <dd className="font-medium">{formatPrice(subtotal, locale)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mist-600">{tcart("shipping")}</dt>
                <dd className="font-medium">
                  {freeShipping ? tcart("shippingFree") : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-mist-200 pt-3">
                <dt className="font-display text-lg">{tcart("total")}</dt>
                <dd className="font-display text-2xl font-semibold">
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-mist-600">{tcart("vatIncluded")}</p>

            <Link
              href="/carrito"
              className="text-center text-sm font-medium text-sky-700 transition-colors hover:text-sky-500"
            >
              {tcart("viewCart")}
            </Link>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Field({
  field,
  register,
  error,
  requiredLabel,
}: {
  field: {
    name: keyof Values;
    label: string;
    type: string;
    autoComplete: string;
    full?: boolean;
  };
  register: ReturnType<typeof useForm<Values>>["register"];
  error: boolean;
  requiredLabel: string;
}) {
  const id = `checkout-${field.name}`;
  return (
    <div className={cn("flex flex-col gap-1.5", field.full && "sm:col-span-2")}>
      <label htmlFor={id} className="text-sm font-semibold text-sky-900">
        {field.label}
      </label>
      <input
        id={id}
        type={field.type}
        autoComplete={field.autoComplete}
        {...register(field.name)}
        aria-invalid={error ? "true" : "false"}
        className={cn(
          "rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400",
          error ? "ring-red-400" : "ring-mist-200",
        )}
      />
      {error && <span className="text-xs text-red-500">{requiredLabel}</span>}
    </div>
  );
}
