import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import KpiCard from "./components/KpiCard";
import SalesByCityChart from "./components/SalesByCityChart";
import ProductsTable from "./components/ProductsTable";
import SubCategoryTable from "./components/SubCategoryTable";
import DonutChart from "./components/DonutChart";
import { useDashboard } from "./hooks/useDashboard";
import { Theme } from "./types";
import "./assets/css/style.css";
import Spinner from "./components/Spinner";
import avatarImg from "./assets/profile/avtar.png";

const IconSales = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2ec4a9"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 7h6M8 10h6M10 7c2 0 3 1 3 2s-1 2-3 2h-2l4 4" />
  </svg>
);
const IconQty = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3aaed8"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h2M11 9h6M7 13h10" />
  </svg>
);
const IconDiscount = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d89c3a"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18" />
    <path d="M6 7h12" />
    <path d="M6 7l-3 5h6l-3-5z" />
    <path d="M18 7l-3 5h6l-3-5z" />
  </svg>
);
const IconProfit = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d84a5f"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h10M7 12h6M7 16h8" />
    <circle cx="17" cy="14" r="2" />
  </svg>
);

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load states
  const {
    states,
    selectedState,
    setSelectedState,
    minDate,
    maxDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    dashboardData,
    loading,
    initialLoad,
    error,
  } = useDashboard();

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const kpis = dashboardData?.kpis;
  const charts = dashboardData?.charts;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`app app--${theme}`}>
      {initialLoad && <Spinner fullPage text="Loading dashboard..." />}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <div
        className={`app__body${sidebarCollapsed ? " app__body--expanded" : ""}`}
      >
        <header className="topnav">
          <span className="topnav__title"></span>
          <div className="topnav__user">
            <span>Hello User</span>
            <div className="topnav__avatar">
              <img src={avatarImg} alt="User" />
            </div>
          </div>
        </header>

        {/* Page body  */}
        <div className={`page${loading ? " page--loading" : ""}`}>
          <div className="page__header">
            <h2 className="page__title">Sales Overview</h2>
            <div className="page__filters">
              <div className="filter-group">
                <label className="filter-group__label">Select a state</label>
                <div className="filter-group__select-wrap">
                  <select
                    className="filter-group__select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-group__label">Select From date</label>
                <div className="filter-group__select-wrap">
                  <input
                    type="date"
                    className="filter-group__select"
                    value={fromDate}
                    min={minDate}
                    max={toDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-group__label">Select To date</label>
                <div className="filter-group__select-wrap">
                  <input
                    type="date"
                    className="filter-group__select"
                    value={toDate}
                    min={fromDate}
                    max={maxDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <div className="error-bar">⚠ {error}</div>}
          {loading && !initialLoad && (
            <div className="page-refresh-overlay">
              <div className="page-refresh-spinner">
                <Spinner size={20} />
                <span>Updating...</span>
              </div>
            </div>
          )}

          <div className="kpi-row">
            <KpiCard
              title="Total Sales"
              value={kpis ? fmt(kpis.totalSales) : "—"}
              icon={<IconSales />}
              iconBg="rgba(46,196,169,0.15)"
            />
            <KpiCard
              title="Quantity Sold"
              value={kpis ? kpis.totalQuantity.toLocaleString() : "—"}
              icon={<IconQty />}
              iconBg="rgba(74,154,232,0.15)"
            />
            <KpiCard
              title="Discount%"
              value={kpis ? `${kpis.avgDiscount.toFixed(1)}%` : "—"}
              icon={<IconDiscount />}
              iconBg="rgba(240,168,50,0.15)"
            />
            <KpiCard
              title="Profit"
              value={kpis ? fmt(kpis.totalProfit) : "—"}
              icon={<IconProfit />}
              iconBg="rgba(232,90,122,0.15)"
            />
          </div>

          <div className="mid-row">
            <div className="card card--city">
              <h3 className="card__title">Sales by City</h3>
              {charts?.salesByCity && charts.salesByCity.length > 0 ? (
                <SalesByCityChart data={charts.salesByCity} theme={theme} />
              ) : (
                <div className="card__empty">No data</div>
              )}
            </div>
            <div className="card card--products">
              <h3 className="card__title">Sales by Products</h3>
              {charts?.topProducts && charts.topProducts.length > 0 ? (
                <ProductsTable data={charts.topProducts} theme={theme} />
              ) : (
                <div className="card__empty">No data</div>
              )}
            </div>
          </div>

          <div className="bot-row">
            <div className="card card--donut">
              <h3 className="card__title">Sales By Category</h3>
              {charts?.salesByCategory && charts.salesByCategory.length > 0 ? (
                <DonutChart data={charts.salesByCategory} theme={theme} />
              ) : (
                <div className="card__empty">No data</div>
              )}
            </div>
            <div className="card card--subcat">
              <h3 className="card__title">Sales By Sub Category</h3>
              {charts?.salesBySubCategory &&
              charts.salesBySubCategory.length > 0 ? (
                <SubCategoryTable
                  data={charts.salesBySubCategory.slice(0, 10)}
                  theme={theme}
                />
              ) : (
                <div className="card__empty">No data</div>
              )}
            </div>
            <div className="card card--donut">
              <h3 className="card__title">Sales By Segment</h3>
              {charts?.salesBySegment && charts.salesBySegment.length > 0 ? (
                <DonutChart
                  data={charts.salesBySegment}
                  theme={theme}
                  colors={["#4dc9c9", "#e8734a", "#f5c542"]}
                />
              ) : (
                <div className="card__empty">No data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
