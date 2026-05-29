"use client";

import { useState } from "react";
import { Check, Loader2, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "done";

/**
 * Botón "Reservar plaza" en modo demostración: simula el envío y muestra el
 * estado de confirmación. Sin backend.
 */
export function ReserveButton({ className }: { className?: string }) {
  const t = useTranslations("events");
  const [status, setStatus] = useState<Status>("idle");

  const handleReserve = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    // Simula el envío. TODO: conectar API/Resend.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium tracking-tight transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:pointer-events-none";

  if (status === "done") {
    return (
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-sky-500/12 px-6 py-3 text-[0.95rem] font-semibold text-sky-700 ring-1 ring-sky-500/20",
          className,
        )}
      >
        <Check size={18} className="text-gold-600" />
        {t("reserved")}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleReserve}
      disabled={status === "loading"}
      aria-busy={status === "loading"}
      className={cn(
        base,
        "bg-gold-500 text-sky-900 shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:bg-gold-600",
        className,
      )}
    >
      {status === "loading" ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Ticket size={18} />
      )}
      {t("reserve")}
    </button>
  );
}
