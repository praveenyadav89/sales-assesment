export type Theme = "dark" | "light";

export interface KPIs {
  totalSales: number;
  totalProfit: number;
  totalQuantity: number;
  totalOrders: number;
  avgDiscount: number;
  profitMargin: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface MonthlyTrendItem {
  month: string;
  sales: number;
  profit: number;
}

export interface TopProductItem {
  name: string;
  sales: number;
}

export interface Charts {
  salesByCategory: ChartDataItem[];
  salesBySubCategory: ChartDataItem[];
  salesBySegment: ChartDataItem[];
  salesByShipMode: ChartDataItem[];
  salesByCity: ChartDataItem[];
  monthlyTrend: MonthlyTrendItem[];
  topProducts: TopProductItem[];
  profitByCategory: ChartDataItem[];
}

export interface DashboardData {
  kpis: KPIs;
  charts: Charts;
  recordCount: number;
}
