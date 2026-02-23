"use client";

import { useTranslations } from 'next-intl';
import { Plus, Calendar, MessageCircle, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (path: string) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const t = useTranslations('dashboard');

  const actions = [
    {
      label: t('addService'),
      icon: Plus,
      path: "/dashboard/services",
      primary: true,
    },
    {
      label: t('viewCalendar'),
      icon: Calendar,
      path: "/dashboard/calendar",
      primary: false,
    },
    {
      label: t('messages'),
      icon: MessageCircle,
      path: "/dashboard/chat",
      primary: false,
    },
    {
      label: t('analytics'),
      icon: BarChart3,
      path: "/dashboard/earnings",
      primary: false,
    },
  ];

  return (
    <div className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border-primary)] p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[var(--color-vendor-warm)] rounded-xl flex items-center justify-center">
          <Plus className="h-5 w-5 text-[var(--color-accent)]" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">{t('quickActions')}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t('manageYourBusiness')}</p>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.path}
            onClick={() => onNavigate(action.path)}
            className={`w-full flex items-center gap-3 h-12 px-4 rounded-xl font-medium text-sm transition-colors ${
              action.primary
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
                : "bg-[var(--color-bg-hover)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-input)]"
            }`}
          >
            <action.icon className="h-5 w-5" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
