"use client";

import { useTranslations } from 'next-intl';
import { Star, Scissors, TrendingUp } from "lucide-react";

interface PerformanceOverviewProps {
  averageRating: number;
  completedBookings: number;
  totalBookings: number;
}

export default function PerformanceOverview({
  averageRating,
  completedBookings,
  totalBookings,
}: PerformanceOverviewProps) {
  const t = useTranslations('dashboard');

  const completionRate = totalBookings > 0
    ? Math.round((completedBookings / totalBookings) * 100)
    : 0;

  const metrics = [
    {
      icon: Star,
      value: averageRating > 0 ? averageRating.toFixed(1) : '--',
      label: t('avgRating'),
      color: "var(--color-warning)",
    },
    {
      icon: Scissors,
      value: completedBookings.toString(),
      label: t('completedServices'),
      color: "var(--color-success)",
    },
    {
      icon: TrendingUp,
      value: `${completionRate}%`,
      label: t('completionRate'),
      color: "var(--color-info)",
    },
  ];

  return (
    <div className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border-primary)] p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[var(--color-success)]/10 rounded-xl flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-[var(--color-success)]" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">{t('performance')}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t('performanceGeneral')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div
              className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `color-mix(in srgb, ${metric.color} 15%, transparent)` }}
            >
              <metric.icon className="h-8 w-8" style={{ color: metric.color }} />
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: metric.color }}>
              {metric.value}
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
