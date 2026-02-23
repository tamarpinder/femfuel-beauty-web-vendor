"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

interface UserDropdownProps {
  className?: string;
}

export default function UserDropdown({ className = "" }: UserDropdownProps) {
  const { profile, signOut } = useAuth();
  const router = useRouter();
  const t = useTranslations("header");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const displayName = profile?.business_name || profile?.full_name || "Proveedor";

  return (
    <div className={`relative group ${className}`}>
      <button className="flex items-center gap-2.5 px-2 hover:bg-[var(--color-bg-hover)] rounded-xl h-10 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-surface)] flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-[var(--color-primary)]" />
        </div>
        <span className="text-[var(--color-text-primary)] text-sm hidden sm:block truncate max-w-[120px]">
          {displayName}
        </span>
      </button>

      {/* Dropdown menu */}
      <div className="absolute end-0 top-full mt-1 w-48 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="p-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            {t("configuration")}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
