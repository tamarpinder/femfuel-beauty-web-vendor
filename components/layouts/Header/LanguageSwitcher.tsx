"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<string, string> = {
  es: "ES",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.refresh();
  };

  const nextLocale = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => switchLocale(nextLocale)}
      className="flex items-center gap-1.5 px-2 h-9 rounded-xl hover:bg-[var(--color-bg-hover)] transition-colors"
      aria-label={`Switch to ${LOCALE_LABELS[nextLocale]}`}
    >
      <Globe className="w-4 h-4 text-[var(--color-text-primary)]" />
      <span className="text-xs font-medium text-[var(--color-text-primary)]">
        {LOCALE_LABELS[locale]}
      </span>
    </button>
  );
}
