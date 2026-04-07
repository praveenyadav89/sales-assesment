import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartDataItem, Theme } from "../types";

interface Props {
  data: ChartDataItem[];
  theme: Theme;
}

const SalesByCityChart: React.FC<Props> = ({ data, theme }) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#8892a4" : "#64748b";
  const splitColor = isDark ? "#1e2d45" : "#e8edf5";

  const sorted = [...data].sort((a, b) => a.value - b.value);
  const max = Math.max(...sorted.map((d) => d.value));

  const axisMax = Math.ceil(max / 10) * 10;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "none" },
      formatter: (params: any[]) =>
        `${params[0].name}: $${Number(params[0].value).toLocaleString()}`,
      backgroundColor: isDark ? "#1a2234" : "#ffffff",
      borderColor: isDark ? "#2a3a55" : "#e2e8f0",
      textStyle: { color: isDark ? "#e2e8f0" : "#1e293b" },
    },
    grid: {
      left: 80,
      right: 16,
      top: 8,
      bottom: 24,
      containLabel: false,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: axisMax,

      axisLabel: {
        color: textColor,
        fontSize: 11,
        formatter: (v: number) => `$${v}`,
      },
      splitLine: {
        show: true,
        lineStyle: { color: splitColor, type: "solid" },
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "category",
      data: sorted.map((d) => d.name),
      axisLabel: {
        color: textColor,
        fontSize: 12,
        align: "right",
        margin: 8,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d, i) => ({
          value: d.value,
          itemStyle: {
            color: i % 2 === 0 ? "#4dc9c9" : "#2a9ec7",
            borderRadius: [0, 3, 3, 0],
          },
        })),
        barWidth: 14,
        showBackground: true,
        backgroundStyle: {
          color: isDark ? "#1a2a40" : "#dde8f0",
          borderRadius: [0, 3, 3, 0],
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      notMerge={true}
      style={{ height: Math.max(240, sorted.length * 36) }}
    />
  );
};

export default SalesByCityChart;
