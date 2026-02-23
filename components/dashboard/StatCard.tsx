"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border-primary)] p-5 transition-[background-color,border-color,box-shadow] duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] text-[var(--color-text-muted)]">
          {title}
        </span>
        <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-surface)] flex items-center justify-center">
          <Icon className="w-[18px] h-[18px] text-[var(--color-primary)]" />
        </div>
      </div>

      <div className="text-[24px] font-semibold text-[var(--color-text-primary)] mb-1">
        {value}
      </div>

      <div className="flex items-center gap-1.5 text-[12px]">
        {trend && (
          <span
            className={
              trend.positive
                ? "text-emerald-500 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>
        )}
        <span className="text-[var(--color-text-muted)]">{description}</span>
      </div>
    </div>
  );
}
