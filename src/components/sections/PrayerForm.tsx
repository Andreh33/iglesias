"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Send, Check, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2),
  request: z.string().min(5),
  private: z.boolean().optional(),
});
type Values = z.infer<typeof schema>;

/**
 * Formulario de petición de oración (namespace "prayer").
 * Envío simulado + estado de éxito. Sin backend.
 */
export function PrayerForm() {
  const t = useTranslations("prayer");
  const tc = useTranslations("common");
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
        <p className="text-pretty text-lg text-sky-900">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-paper p-6 shadow-soft ring-1 ring-mist-200/70 sm:p-7"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="prayer-name" className="text-sm font-semibold text-sky-900">
          {t("name")}
        </label>
        <input
          id="prayer-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          className={cn(
            "rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400",
            errors.name ? "ring-red-400" : "ring-mist-200",
          )}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{tc("required")}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="prayer-request" className="text-sm font-semibold text-sky-900">
          {t("request")}
        </label>
        <textarea
          id="prayer-request"
          rows={4}
          {...register("request")}
          placeholder={t("placeholder")}
          aria-invalid={errors.request ? "true" : "false"}
          className={cn(
            "resize-none rounded-[var(--radius-sm)] bg-ivory px-4 py-3 text-sky-900 outline-none ring-1 transition-all placeholder:text-mist-400 focus-visible:ring-2 focus-visible:ring-sky-400",
            errors.request ? "ring-red-400" : "ring-mist-200",
          )}
        />
        {errors.request && (
          <span className="text-xs text-red-500">{tc("required")}</span>
        )}
      </div>

      <label
        htmlFor="prayer-private"
        className="flex cursor-pointer items-center gap-3 text-sm text-mist-600"
      >
        <input
          id="prayer-private"
          type="checkbox"
          {...register("private")}
          className="h-4 w-4 rounded border-mist-200 text-sky-500 accent-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400"
        />
        <span className="inline-flex items-center gap-1.5">
          <Lock size={14} className="text-sky-600" aria-hidden />
          {t("private")}
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 font-medium tracking-tight text-paper shadow-soft transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? tc("sending") : t("send")}
        {!isSubmitting && <Send size={17} />}
      </button>
    </form>
  );
}
