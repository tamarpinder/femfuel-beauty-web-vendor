"use client";

import { ReactNode } from "react";

export interface ChartTooltipRowProps {
  label?: string;
  value: string | number;
  color?: string;
  isTitle?: boolean;
}

export interface ChartTooltipProps {
  active?: boolean;
  title?: string;
  rows?: ChartTooltipRowProps[];
  children?: ReactNode;
  className?: string;
}

export function ChartTooltipRow({
  label,
  value,
  color = "text-[var(--color-text-primary)]",
  isTitle = false,
}: ChartTooltipRowProps) {
  const textSize = isTitle ? "text-[13px] font-medium" : "text-[12px]";

  return (
    <div className={`${color} ${textSize} ${isTitle ? "mb-1" : ""}`}>
      {label ? `${label}: ${value}` : value}
    </div>
  );
}

export function ChartTooltip({
  active,
  title,
  rows,
  children,
  className = "",
}: ChartTooltipProps) {
  if (!active) return null;

  return (
    <div
      className={`bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg px-3 py-2 shadow-lg ${className}`}
    >
      {title && <ChartTooltipRow value={title} isTitle />}
      {rows?.map((row, index) => (
        <ChartTooltipRow key={index} {...row} />
      ))}
      {children}
    </div>
  );
}

export default ChartTooltip;
