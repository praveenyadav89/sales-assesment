// SaleRecord Model
// Represents one row from sales.json

export interface SaleRecord {
  "Row ID": number;
  "Order ID": string;
  "Order Date": string;
  "Ship Date": string;
  "Ship Mode": string;
  "Customer ID": string;
  "Customer Name": string;
  Segment: string;
  Country: string;
  City: string;
  State: string;
  "Postal Code": number;
  Region: string;
  "Product ID": string;
  Category: string;
  "Sub-Category": string;
  "Product Name": string;
  Sales: number;
  Quantity: number;
  Discount: number;
  Profit: number;
}

//shape types

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

export interface KPIs {
  totalSales: number;
  totalProfit: number;
  totalQuantity: number;
  totalOrders: number;
  avgDiscount: number;
  profitMargin: number;
}

export interface DashboardCharts {
  salesByCategory: ChartDataItem[];
  salesBySubCategory: ChartDataItem[];
  salesBySegment: ChartDataItem[];
  salesByShipMode: ChartDataItem[];
  salesByCity: ChartDataItem[];
  monthlyTrend: MonthlyTrendItem[];
  topProducts: TopProductItem[];
  profitByCategory: ChartDataItem[];
}

export interface DashboardResponse {
  kpis: KPIs;
  charts: DashboardCharts;
  recordCount: number;
}
