import { Request, Response } from "express";
import { getData } from "../config/dataStore";
import { SaleRecord, DashboardResponse } from "../models/SaleRecord";

const groupSum = (
  data: SaleRecord[],
  keyFn: (r: SaleRecord) => string,
  valueFn: (r: SaleRecord) => number,
): Record<string, number> => {
  return data.reduce(
    (acc, r) => {
      const key = keyFn(r);
      acc[key] = (acc[key] || 0) + valueFn(r);
      return acc;
    },
    {} as Record<string, number>,
  );
};

const round2 = (n: number): number => Math.round(n * 100) / 100;

const toChartArray = (obj: Record<string, number>, sort = false) => {
  const entries = Object.entries(obj).map(([name, value]) => ({
    name,
    value: round2(value),
  }));
  return sort ? entries.sort((a, b) => b.value - a.value) : entries;
};

export const getDashboard = (req: Request, res: Response): void => {
  const { state, fromDate, toDate, customerId } = req.query;

  let data = getData();

  if (state && typeof state === "string") {
    data = data.filter((r) => r.State === state);
  }
  if (fromDate && typeof fromDate === "string") {
    data = data.filter((r) => r["Order Date"] >= fromDate);
  }
  if (toDate && typeof toDate === "string") {
    data = data.filter((r) => r["Order Date"] <= toDate);
  }
  if (customerId && typeof customerId === "string") {
    data = data.filter((r) => r["Customer ID"] === customerId);
  }

  const totalSales = data.reduce((s, r) => s + r.Sales, 0);
  const totalProfit = data.reduce((s, r) => s + r.Profit, 0);
  const totalQuantity = data.reduce((s, r) => s + r.Quantity, 0);
  const totalOrders = new Set(data.map((r) => r["Order ID"])).size;
  const avgDiscount = data.length
    ? data.reduce((s, r) => s + r.Discount, 0) / data.length
    : 0;
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  const salesByCategory = toChartArray(
    groupSum(
      data,
      (r) => r.Category,
      (r) => r.Sales,
    ),
  );

  const salesBySubCategory = toChartArray(
    groupSum(
      data,
      (r) => r["Sub-Category"],
      (r) => r.Sales,
    ),
    true,
  );

  const salesBySegment = toChartArray(
    groupSum(
      data,
      (r) => r.Segment,
      (r) => r.Sales,
    ),
  );

  const salesByShipMode = toChartArray(
    groupSum(
      data,
      (r) => r["Ship Mode"],
      (r) => r.Sales,
    ),
  );

  const salesByCity = toChartArray(
    groupSum(
      data,
      (r) => r.City,
      (r) => r.Sales,
    ),
    true,
  ).slice(0, 10);

  const profitByCategory = toChartArray(
    groupSum(
      data,
      (r) => r.Category,
      (r) => r.Profit,
    ),
  );

  const monthlyMap: Record<string, { sales: number; profit: number }> = {};
  data.forEach((r) => {
    const month = r["Order Date"].substring(0, 7);
    if (!monthlyMap[month]) monthlyMap[month] = { sales: 0, profit: 0 };
    monthlyMap[month].sales += r.Sales;
    monthlyMap[month].profit += r.Profit;
  });
  const monthlyTrend = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, d]) => ({
      month,
      sales: round2(d.sales),
      profit: round2(d.profit),
    }));

  // Top 10 products by sales
  const topProducts = toChartArray(
    groupSum(
      data,
      (r) => r["Product Name"],
      (r) => r.Sales,
    ),
    true,
  )
    .slice(0, 10)
    .map(({ name, value }) => ({ name, sales: value }));

  const response: DashboardResponse = {
    kpis: {
      totalSales: round2(totalSales),
      totalProfit: round2(totalProfit),
      totalQuantity,
      totalOrders,
      avgDiscount: round2((avgDiscount * 10000) / 100), // as %
      profitMargin: round2(profitMargin),
    },
    charts: {
      salesByCategory,
      salesBySubCategory,
      salesBySegment,
      salesByShipMode,
      salesByCity,
      monthlyTrend,
      topProducts,
      profitByCategory,
    },
    recordCount: data.length,
  };

  res.json(response);
};
