"use client";

import React, { forwardRef } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import { ChartTooltip } from "./chartTooltip";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BarChartDataItem = Record<string, any>;

export interface BarChartProps {
  data: BarChartDataItem[];
  xAxisKey: string;
  dataKey: string;
  barColor?: string;
  textColor?: string;
  minHeight?: number;
  yAxisFormatter?: (value: number) => string;
  xAxisAngle?: number;
  barRadius?: number | [number, number, number, number];
  showGrid?: boolean;
  gridColor?: string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  renderTooltip?: TooltipProps<number, string>["content"];
  className?: string;
}

const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      xAxisKey,
      dataKey,
      barColor = "var(--color-primary)",
      textColor = "var(--color-text-muted)",
      minHeight = 200,
      yAxisFormatter = (value) => `${value}`,
      xAxisAngle = 0,
      barRadius = [4, 4, 0, 0],
      showGrid = false,
      gridColor = "var(--color-border-primary)",
      margin = { top: 10, right: 10, left: -10, bottom: 20 },
      renderTooltip,
      className = "",
    },
    ref
  ) => {
    const isBrowser = typeof window !== "undefined";
    const isSmallScreen = isBrowser ? window.innerWidth < 640 : false;

    const defaultTooltip: TooltipProps<number, string>["content"] = ({
      active,
      payload,
      label,
    }) => {
      if (active && payload && payload.length) {
        return (
          <ChartTooltip
            active={active}
            title={label as string}
            rows={[
              {
                value: yAxisFormatter(payload[0].value as number),
              },
            ]}
          />
        );
      }
      return null;
    };

    return (
      <div
        ref={ref}
        className={`flex-1 w-full [&_svg]:outline-none [&_svg]:border-none [&_*]:outline-none [&_*]:border-none ${className}`}
        style={{ minHeight }}
      >
        <ResponsiveContainer
          width="100%"
          height={minHeight}
          style={{ outline: "none" }}
        >
          <RechartsBarChart
            data={data}
            margin={margin}
            style={{
              direction: "ltr",
              outline: "none",
              border: "none",
            }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: textColor,
                fontSize: isSmallScreen ? 8 : 10,
              }}
              angle={xAxisAngle}
              textAnchor={xAxisAngle !== 0 ? "end" : "middle"}
              height={xAxisAngle !== 0 ? 60 : 30}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: textColor,
                fontSize: isSmallScreen ? 8 : 10,
              }}
              tickFormatter={yAxisFormatter}
              width={45}
            />
            <Tooltip content={renderTooltip || defaultTooltip} />
            <Bar dataKey={dataKey} radius={barRadius} fill={barColor} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

BarChart.displayName = "BarChart";

export default BarChart;
