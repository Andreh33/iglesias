"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Send, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  reason: z.enum(["reasonVisit", "reasonPrayer", "reasonInfo", "reasonCourses"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  // Honeypot anti-spam: debe quedar vacío. Si se rellena, descartamos el envío.
  company: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

/**
 * Formulario de contacto (namespace "contact").
 * react-hook-form + zod. Incluye honeypot anti-spam (campo oculto "company").
 * Envío simulado + estado de éxito. Sin backend.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "reasonVisit", company: "" },
  });

  const onSubmit = async (values: Values) => {
    // Si el honeypot trae contenido, es un bot: cortamos sin avisar.
    if (values.company) return;
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
          <Check size={22} strokeWidth={1.8} aria-hidden />
        </span>
        <p className="text-pretty text-lg text-sky-900">{t("success")}</p>
      </div>
    );
  }

  const inputBase =
    "rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-7"
    >
      {/* Honeypot anti-spam: oculto para personas, tentador para bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">No rellenar</label>
        <input
          id="contact-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-reason" className="text-sm font-semibold text-sky-900">
          {t("reason")}
        </label>
        <div className="relative">
          <select
            id="contact-reason"
            {...register("reason")}
            className={cn(
              inputBase,
              "w-full appearance-none pr-10",
              errors.reason ? "ring-red-400" : "ring-mist-200",
            )}
          >
            <option value="reasonVisit">{t("reasonVisit")}</option>
            <option value="reasonPrayer">{t("reasonPrayer")}</option>
            <option value="reasonInfo">{t("reasonInfo")}</option>
            <option value="reasonCourses">{t("reasonCourses")}</option>
          </select>
          <ChevronDown
            size={18}
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mist-400"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-semibold text-sky-900">
            {t("name")}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            className={cn(inputBase, errors.name ? "ring-red-400" : "ring-mist-200")}
          />
          {errors.name && <span className="text-xs text-red-500">{tc("required")}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className="text-sm font-semibold text-sky-900">
            {t("phone")}{" "}
            <span className="font-normal text-mist-400">({tc("optional")})</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={cn(inputBase, "ring-mist-200")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-semibold text-sky-900">
          {t("email")}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          className={cn(inputBase, errors.email ? "ring-red-400" : "ring-mist-200")}
        />
        {errors.email && <span className="text-xs text-red-500">{tc("required")}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-semibold text-sky-900">
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          className={cn(
            inputBase,
            "resize-none",
            errors.message ? "ring-red-400" : "ring-mist-200",
          )}
        />
        {errors.message && <span className="text-xs text-red-500">{tc("required")}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 font-medium tracking-tight text-paper shadow-soft transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? tc("sending") : t("send")}
        {!isSubmitting && <Send size={17} aria-hidden />}
      </button>
    </form>
  );
}
