"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional(),
  // Honeypot anti-spam: debe quedar vacío.
  company: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

/**
 * Formulario de inscripción a un curso (namespace "courses").
 * Recibe `courseTitle` ya resuelto al idioma activo.
 * Envío simulado + estado de éxito. Incluye honeypot. Sin backend.
 */
export function EnrollForm({ courseTitle }: { courseTitle: string }) {
  const t = useTranslations("courses");
  const tc = useTranslations("common");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    if (values.company) return; // bot detectado
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
        <p className="text-pretty text-lg text-sky-900">{t("enrollSuccess")}</p>
      </div>
    );
  }

  const fieldClass = (invalid: boolean) =>
    cn(
      "rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400",
      invalid ? "ring-red-400" : "ring-mist-200",
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-7"
    >
      <div>
        <h3 className="font-display text-2xl font-semibold text-sky-900">
          {t("enrollTitle")}
        </h3>
        <p className="mt-1 text-sm text-mist-600">{t("enrollIntro")}</p>
        <p className="mt-3 inline-flex flex-wrap items-baseline gap-1.5 text-sm">
          <span className="font-semibold uppercase tracking-wider text-sky-600">
            {t("enrollFor")}:
          </span>
          <span className="font-display text-base italic text-sky-800">
            {courseTitle}
          </span>
        </p>
      </div>

      {/* Honeypot: oculto visual y semánticamente para humanos. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="enroll-company">No rellenar</label>
        <input
          id="enroll-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enroll-name" className="text-sm font-semibold text-sky-900">
          {t("enrollName")}
        </label>
        <input
          id="enroll-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{tc("required")}</span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="enroll-email"
            className="text-sm font-semibold text-sky-900"
          >
            {t("enrollEmail")}
          </label>
          <input
            id="enroll-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{tc("required")}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="enroll-phone"
            className="text-sm font-semibold text-sky-900"
          >
            {t("enrollPhone")}
          </label>
          <input
            id="enroll-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            className={fieldClass(Boolean(errors.phone))}
          />
          {errors.phone && (
            <span className="text-xs text-red-500">{tc("required")}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="enroll-message"
          className="flex items-center gap-2 text-sm font-semibold text-sky-900"
        >
          {t("enrollMessage")}
          <span className="text-xs font-normal lowercase text-mist-400">
            ({tc("optional")})
          </span>
        </label>
        <textarea
          id="enroll-message"
          rows={4}
          {...register("message")}
          placeholder={t("enrollMessagePlaceholder")}
          className="resize-none rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 ring-mist-200 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 font-medium tracking-tight text-paper shadow-soft transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? tc("sending") : t("enrollSubmit")}
        {!isSubmitting && <Send size={17} />}
      </button>
    </form>
  );
}
