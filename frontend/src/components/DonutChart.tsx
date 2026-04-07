import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartDataItem, Theme } from "../types";

interface Props {
  data: ChartDataItem[];
  theme: Theme;
  colors?: string[];
}

const CATEGORY_COLORS = ["#4dc9c9", "#e8734a", "#f5c542"];
const SEGMENT_COLORS = ["#4dc9c9", "#e8734a", "#f5c542"];

const DonutChart: React.FC<Props> = ({ data, theme, colors }) => {
  const isDark = theme === "dark";
  const COLORS = colors || CATEGORY_COLORS;
  const textColor = isDark ? "#8892a4" : "#64748b";

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c} ({d}%)",
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderColor: isDark ? "#2a3a55" : "#e2e8f0",
      textStyle: { color: isDark ? "#e2e8f0" : "#1e293b" },
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { color: textColor, fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
      icon: "rect",
    },
    series: [
      {
        type: "pie",
        radius: ["48%", "75%"],
        center: ["50%", "45%"],
        data: data.map((d, i) => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: COLORS[i % COLORS.length] },
        })),
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.3)" },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 220 }} />;
};

export default DonutChart;
