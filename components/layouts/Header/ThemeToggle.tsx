"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslations } from "next-intl";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("header");
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--color-bg-hover)] transition-colors overflow-hidden"
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
    >
      <div
        className="absolute transition-all duration-300 ease-in-out"
        style={{
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(0)",
          opacity: isDark ? 1 : 0,
        }}
      >
        <Moon className="w-5 h-5 text-[var(--color-text-primary)]" />
      </div>

      <div
        className="absolute transition-all duration-300 ease-in-out"
        style={{
          transform: isDark ? "rotate(-180deg) scale(0)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
        }}
      >
        <Sun className="w-5 h-5 text-[var(--color-text-primary)]" />
      </div>
    </button>
  );
}
