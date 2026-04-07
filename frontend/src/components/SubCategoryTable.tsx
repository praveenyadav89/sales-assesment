import React from "react";
import { ChartDataItem, Theme } from "../types";

interface Props {
  data: ChartDataItem[];
  theme: Theme;
}

const SubCategoryTable: React.FC<Props> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="products-table">
      <div className="products-table__header">
        <span>Sub Category</span>
        <span>Sales in $</span>
      </div>
      <div className="products-table__body">
        {data.map((item, i) => (
          <div key={i} className="products-table__row">
            <div className="products-table__name">{item.name}</div>
            <div className="products-table__bar-wrap">
              <div
                className="products-table__bar"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <div className="products-table__value">
              $
              {item.value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryTable;
