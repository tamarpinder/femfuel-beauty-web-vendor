"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  className?: string;
  onMobileMenuToggle?: () => void;
}

const PAGE_KEYS: Record<string, string> = {
  "/dashboard": "dashboard",
  "/dashboard/services": "services",
  "/dashboard/bookings": "bookings",
  "/dashboard/calendar": "calendar",
  "/dashboard/earnings": "earnings",
  "/dashboard/chat": "chat",
  "/dashboard/profile": "profile",
  "/dashboard/settings": "settings",
};

export default function Header({
  className = "",
  onMobileMenuToggle,
}: HeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("header");

  const pageKey = PAGE_KEYS[pathname] || "dashboard";
  const pageTitle = t(`pageTitles.${pageKey}`);

  return (
    <div
      className={`header-bar fixed top-0 end-0 z-20 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-[var(--color-border-shell)] bg-[var(--color-sidebar-bg)] transition-all duration-300 ${className}`}
    >
      <style jsx>{`
        .header-bar {
          inset-inline-start: 0;
          inline-size: 100%;
        }
        @media (min-width: 1024px) {
          .header-bar {
            inset-inline-start: var(--sidebar-width, 104px);
            inline-size: calc(100% - var(--sidebar-width, 104px));
          }
        }
      `}</style>

      {/* Left: Mobile menu + Title */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--color-bg-hover)] transition-colors"
          aria-label={t("openMenu")}
        >
          <Menu className="w-5 h-5 text-[var(--color-text-primary)]" />
        </button>

        <h1 className="text-[var(--color-text-secondary)] text-lg sm:text-xl md:text-2xl font-normal truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <LanguageSwitcher />

        <ThemeToggle />

        <div className="border-l border-[var(--color-border-shell)] h-6 mx-2 hidden sm:block" />

        {/* Notifications placeholder */}
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--color-bg-hover)] transition-colors relative"
          aria-label={t("notifications")}
        >
          <Bell className="w-5 h-5 text-[var(--color-text-primary)]" />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full" />
        </button>

        <div className="border-l border-[var(--color-border-shell)] h-6 mx-2" />

        <UserDropdown />
      </div>
    </div>
  );
}
