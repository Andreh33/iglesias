"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { Send, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { camps } from "@/data/camps";
import { t as tr } from "@/lib/i18n";
import type { Locale } from "@/types";

const schema = z.object({
  name: z.string().min(2),
  age: z.number({ error: "edad" }).int().min(3).max(120),
  email: z.string().email(),
  phone: z.string().min(6),
  camp: z.string().min(1),
  authorization: z.boolean().refine((v) => v === true),
  // Honeypot anti-spam: debe quedar vacío.
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

const fieldClass = (invalid: boolean) =>
  cn(
    "rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400",
    invalid ? "ring-red-400" : "ring-mist-200",
  );

/**
 * Formulario de preinscripción a campamentos (namespace "camps").
 * react-hook-form + zod. Envío simulado + estado de éxito. Sin backend.
 */
export function CampRegisterForm() {
  const t = useTranslations("camps");
  const tc = useTranslations("common");
  const tn = useTranslations("checkout");
  const locale = useLocale() as Locale;
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: Values) => {
    // TODO: conectar API/Resend
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  };

  if (done) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-[var(--radius-md)] bg-paper p-7 shadow-soft ring-1 ring-mist-200/70"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/12 text-sky-600">
          <Check size={22} strokeWidth={1.8} />
        </span>
        <p className="text-pretty text-lg text-sky-900">
          {locale === "es"
            ? "¡Preinscripción recibida! Nos pondremos en contacto contigo muy pronto."
            : "Pre-registration received! We will get in touch with you very soon."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="camp-name" className="text-sm font-semibold text-sky-900">
            {tn("name")}
          </label>
          <input
            id="camp-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <span className="text-xs text-red-500">{tc("required")}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="camp-age" className="text-sm font-semibold text-sky-900">
            {locale === "es" ? "Edad del participante" : "Participant's age"}
          </label>
          <input
            id="camp-age"
            type="number"
            min={3}
            max={120}
            inputMode="numeric"
            {...register("age", { valueAsNumber: true })}
            aria-invalid={errors.age ? "true" : "false"}
            className={fieldClass(!!errors.age)}
          />
          {errors.age && (
            <span className="text-xs text-red-500">
              {locale === "es" ? "Introduce una edad válida" : "Enter a valid age"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="camp-email" className="text-sm font-semibold text-sky-900">
            {tn("email")}
          </label>
          <input
            id="camp-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              {locale === "es" ? "Correo no válido" : "Invalid email"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="camp-phone" className="text-sm font-semibold text-sky-900">
            {tn("phone")}
          </label>
          <input
            id="camp-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            className={fieldClass(!!errors.phone)}
          />
          {errors.phone && <span className="text-xs text-red-500">{tc("required")}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="camp-select" className="text-sm font-semibold text-sky-900">
          {t("title")}
        </label>
        <div className="relative">
          <select
            id="camp-select"
            defaultValue=""
            {...register("camp")}
            aria-invalid={errors.camp ? "true" : "false"}
            className={cn(fieldClass(!!errors.camp), "w-full appearance-none pr-10")}
          >
            <option value="" disabled>
              {locale === "es" ? "Elige un campamento…" : "Choose a camp…"}
            </option>
            {camps.map((camp) => (
              <option key={camp.slug} value={camp.slug}>
                {tr(camp.title, locale)} · {tr(camp.dates, locale)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sky-600"
          />
        </div>
        {errors.camp && <span className="text-xs text-red-500">{tc("required")}</span>}
      </div>

      {/* Honeypot anti-spam: oculto a usuarios, visible para bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="camp-website">{locale === "es" ? "No rellenar" : "Do not fill"}</label>
        <input id="camp-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <label
        htmlFor="camp-authorization"
        className="flex cursor-pointer items-start gap-3 text-sm text-mist-600"
      >
        <input
          id="camp-authorization"
          type="checkbox"
          {...register("authorization")}
          aria-invalid={errors.authorization ? "true" : "false"}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-mist-200 text-sky-500 accent-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400"
        />
        <span className="text-pretty">
          {locale === "es"
            ? "Autorizo la participación del/de la menor y acepto la política de privacidad."
            : "I authorise the minor's participation and accept the privacy policy."}
        </span>
      </label>
      {errors.authorization && (
        <span className="-mt-2 text-xs text-red-500">
          {locale === "es"
            ? "Necesitamos tu autorización para continuar."
            : "We need your authorisation to continue."}
        </span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 font-medium tracking-tight text-paper shadow-soft transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? tc("sending") : t("register")}
        {!isSubmitting && <Send size={17} />}
      </button>
    </form>
  );
}
