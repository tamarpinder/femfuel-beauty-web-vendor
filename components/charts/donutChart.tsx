"use client";

import React, { useState, forwardRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  title?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showLegend?: boolean;
  translateLabel?: (key: string) => string;
  valueFormatter?: (value: number) => string;
  totalValue?: number;
  totalLabel?: string;
}

const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      title,
      height = 380,
      innerRadius = 60,
      outerRadius = 80,
      paddingAngle = -10,
      showLegend = true,
      translateLabel = (key: string) => key,
      valueFormatter = (value) => `${value}%`,
      totalValue,
      totalLabel = "Total",
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const t = translateLabel;

    const onPieEnter = (_: unknown, index: number) => {
      setActiveIndex(index);
    };

    const onPieLeave = () => {
      setActiveIndex(null);
    };

    const renderCenterContent = () => {
      const item = activeIndex !== null ? data[activeIndex] : data[0];

      return (
        <div className="text-center">
          <div
            className="text-3xl font-bold transition-all duration-300"
            style={{ color: item.color }}
          >
            {valueFormatter(item.value)}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">
            {t(item.name)}
          </div>
        </div>
      );
    };

    const calculatedTotal =
      totalValue || data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div
        className="relative h-full w-full rounded-xl border border-[var(--color-border-primary)] p-4 xl:p-6 overflow-visible bg-[var(--color-bg-card)]/60"
        ref={ref}
        style={{ maxHeight: `${height}px` }}
      >
        {title && (
          <div className="mb-2">
            <h3 className="text-[var(--color-text-secondary)] text-base xl:text-lg font-normal">
              {title}
            </h3>
          </div>
        )}

        <div className="flex items-start justify-start h-full -mt-1">
          <div className="relative flex-shrink-0 -ms-2 xl:-ms-3">
            <div
              className="relative"
              onMouseDown={(e) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement) {
                  e.target.blur();
                }
              }}
            >
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="45%"
                    cy="50%"
                    outerRadius={outerRadius}
                    innerRadius={innerRadius}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={800}
                    startAngle={90}
                    endAngle={450}
                    stroke="none"
                    cornerRadius={50}
                    paddingAngle={paddingAngle}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={index === activeIndex ? 0.9 : 1}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="absolute inset-0 flex items-center justify-center -ms-1.5 xl:-ms-2 mt-0 pointer-events-none">
              {renderCenterContent()}
            </div>
          </div>

          {showLegend && (
            <div className="flex-1 ms-1 xl:ms-2 mt-13">
              <div className="space-y-1">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5 xl:gap-2">
                    <div
                      className="w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[var(--color-text-primary)] text-xs xl:text-sm font-medium">
                      {t(item.name)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {totalValue !== undefined && (
          <div className="absolute bottom-4 xl:bottom-6 start-4 xl:start-6 end-4 xl:end-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)] text-xs xl:text-sm">
                {totalLabel}
              </span>
              <div className="flex items-center gap-4 xl:gap-6 relative">
                <div className="">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="w-3.5 h-3.5 xl:w-4 xl:h-4 rounded-full absolute top-1 xl:top-1.5"
                      style={{
                        backgroundColor: item.color,
                        insetInlineStart: `${index * 7}px`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[var(--color-text-primary)] text-base xl:text-lg font-bold ms-5 xl:ms-6">
                  {calculatedTotal}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DonutChart.displayName = "DonutChart";

export default DonutChart;
