"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nv-cookie-consent")) setShow(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem("nv-cookie-consent", value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-5 sm:max-w-md">
      <div className="animate-rise rounded-[var(--radius-md)] border border-mist-200 bg-paper/95 p-5 shadow-lift backdrop-blur-xl">
        <p className="text-sm text-sky-900/80">
          {t("message")}{" "}
          <Link href="/cookies" className="font-medium text-sky-600 underline-offset-2 hover:underline">
            {t("policy")}
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex-1 rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-sky-600"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="flex-1 rounded-full bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100"
          >
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}
