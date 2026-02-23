"use client";

import { memo } from "react";
import Link from "next/link";
import type { NavItem } from "./SidebarConfig";

interface SidebarItemProps extends NavItem {
  isActive: boolean;
  collapsed: boolean;
}

const SidebarItem = memo<SidebarItemProps>(function SidebarItem({
  icon,
  label,
  href,
  isActive,
  tooltip,
  collapsed,
}) {
  const iconContainerClasses = `
    relative flex items-center justify-center
    transition-all duration-300 ease-in-out
    ${collapsed ? "w-9 h-9 rounded-lg" : "w-12 h-12 rounded-xl"}
    ${
      isActive
        ? "text-[var(--color-primary)] bg-[var(--color-sidebar-active-bg)] border border-[var(--color-sidebar-active-border)]"
        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
    }
  `;

  const labelClasses = `
    text-xs font-medium leading-tight text-center max-w-[72px]
    transition-all duration-300 ease-in-out
    ${collapsed ? "opacity-0 h-0" : "opacity-100"}
    ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]"}
  `;

  return (
    <Link
      href={href}
      className="relative flex flex-col items-center gap-2 py-2.5 group"
      title={collapsed ? tooltip : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={iconContainerClasses}>
        <div className={`transition-all duration-300 ${collapsed ? "scale-90" : "scale-100"}`}>
          {icon}
        </div>
        {isActive && (
          <div className="absolute start-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-primary)] rounded-e-full" />
        )}
      </div>
      {!collapsed && (
        <span className={labelClasses}>{label}</span>
      )}
    </Link>
  );
});

export default SidebarItem;
