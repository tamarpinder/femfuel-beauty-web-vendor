"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import {
  SIDEBAR_NAV_ITEMS,
  SETTINGS_NAV_ITEM,
  SIDEBAR_WIDTH,
} from "./SidebarConfig";

interface SidebarProps {
  className?: string;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export default function Sidebar({
  className = "",
  isMobileMenuOpen = false,
  onMobileMenuClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  // Close mobile menu on navigation
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onMobileMenuClose?.();
    }
  }, [pathname, onMobileMenuClose]);

  // Update CSS custom property for header offset
  useEffect(() => {
    const width = collapsed ? SIDEBAR_WIDTH.COLLAPSED : SIDEBAR_WIDTH.EXPANDED;
    document.documentElement.style.setProperty("--sidebar-width", width);
    return () => {
      document.documentElement.style.removeProperty("--sidebar-width");
    };
  }, [collapsed]);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarTranslateClass = isMobileMenuOpen
    ? "translate-x-0"
    : "-translate-x-full lg:translate-x-0";

  const sidebarClasses = useMemo(
    () =>
      `fixed start-0 top-0 z-30 h-screen
       bg-[var(--color-sidebar-bg)]/80 backdrop-blur-sm
       transition-all duration-300 ease-in-out
       border-e border-[var(--color-border-shell)]
       ${collapsed ? "w-[68px]" : "w-[104px]"}
       ${sidebarTranslateClass}
       ${className}`,
    [collapsed, sidebarTranslateClass, className]
  );

  return (
    <div className={sidebarClasses}>
      {/* Toggle button - desktop only */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="hidden lg:flex absolute -end-3 top-7 w-6 h-6
          bg-[var(--color-sidebar-bg)] border border-[var(--color-border-shell)]/40
          rounded-full items-center justify-center
          text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
          transition-all duration-300 hover:scale-110 hover:shadow-md"
        aria-label={collapsed ? tHeader("expandSidebar") : tHeader("collapseSidebar")}
        type="button"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="flex flex-col justify-between h-full py-6">
        {/* Top: Logo + Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex justify-center mb-6"
            aria-label="FemFuel Vendor Portal"
          >
            <div
              className={`relative ${
                collapsed ? "w-[45px] h-[45px]" : "w-[60px] h-[60px]"
              } transition-all duration-300`}
            >
              <Image
                src="/femfuel-logo.png"
                alt="FemFuel"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col items-center w-full gap-1 overflow-y-auto sidebar-scrollbar">
            {SIDEBAR_NAV_ITEMS.map((entry) => (
              <SidebarItem
                key={entry.id}
                {...entry}
                label={tNav(entry.id)}
                tooltip={tNav(`${entry.id}Tooltip`)}
                isActive={isActive(entry.href)}
                collapsed={collapsed}
              />
            ))}
            <div className="mt-2">
              <SidebarItem
                {...SETTINGS_NAV_ITEM}
                label={tNav(SETTINGS_NAV_ITEM.id)}
                tooltip={tNav(`${SETTINGS_NAV_ITEM.id}Tooltip`)}
                isActive={isActive(SETTINGS_NAV_ITEM.href)}
                collapsed={collapsed}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
