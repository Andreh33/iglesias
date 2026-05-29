"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link2, Check, Share2, Globe, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Barra de compartir para artículos del blog. Copia el enlace con
 * navigator.clipboard y abre X/Facebook/WhatsApp con la URL actual.
 * El enlace se resuelve en el cliente (window.location) para reflejar
 * siempre el idioma activo de la URL.
 */
export function ShareBar({ title }: { title: string }) {
  const t = useTranslations("blog.shareBar");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard no disponible (contexto no seguro): no hacemos nada.
    }
  };

  const enc = encodeURIComponent;
  const links = [
    {
      key: "x",
      label: t("x"),
      icon: Share2,
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    },
    {
      key: "facebook",
      label: t("facebook"),
      icon: Globe,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      key: "whatsapp",
      label: t("whatsapp"),
      icon: MessageCircle,
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    },
  ] as const;

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-sky-700 ring-1 ring-mist-200 transition-all duration-[var(--dur-mid)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sky-50 hover:ring-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600">
        {t("title")}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("copied") : t("copy")}
          className={cn(btn, copied && "bg-sky-50 text-sky-600 ring-sky-300")}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
        {links.map(({ key, label, icon: Ico, href }) => (
          <a
            key={key}
            href={href || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={btn}
          >
            <Ico size={18} />
          </a>
        ))}
      </div>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm text-sky-600 transition-opacity",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        {copied ? t("copied") : ""}
      </span>
    </div>
  );
}
