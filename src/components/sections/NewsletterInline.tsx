"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";

const schema = z.object({ email: z.string().email() });
type Values = z.infer<typeof schema>;

export function NewsletterInline({
  locale: _locale,
  variant = "default",
}: {
  locale: Locale;
  variant?: "default" | "footer";
}) {
  const t = useTranslations("newsletter");
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

  const dark = variant === "footer";

  if (done) {
    return (
      <p className={cn("flex items-center gap-2 text-sm font-medium", dark ? "text-gold-300" : "text-sky-600")}>
        <Check size={16} /> {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {dark && <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">{t("title")}</p>}
      <div
        className={cn(
          "flex items-center gap-1 rounded-full p-1",
          dark ? "bg-paper/10" : "bg-paper ring-1 ring-mist-200 shadow-soft",
        )}
      >
        <input
          type="email"
          {...register("email")}
          placeholder={t("email")}
          aria-label={t("email")}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none",
            dark ? "text-paper placeholder:text-sky-100/40" : "text-sky-900 placeholder:text-mist-400",
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={t("subscribe")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sky-900 transition-transform hover:scale-105"
        >
          <Send size={16} />
        </button>
      </div>
      {errors.email && <span className="px-2 text-xs text-red-400">{t("email")}</span>}
    </form>
  );
}
