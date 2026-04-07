import React from "react";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, iconBg }) => (
  <div className="kpi-card">
    <div className="kpi-card__icon" style={{ background: iconBg }}>
      {icon}
    </div>
    <div className="kpi-card__content">
      <div className="kpi-card__title">{title}</div>
      <div className="kpi-card__value">{value}</div>
    </div>
  </div>
);

export default KpiCard;
