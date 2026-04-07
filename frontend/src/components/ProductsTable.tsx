import React from 'react';
import { TopProductItem, Theme } from '../types';

interface Props { data: TopProductItem[]; theme: Theme; }

const ProductsTable: React.FC<Props> = ({ data, theme }) => {
  const isDark = theme === 'dark';
  const max = Math.max(...data.map(d => d.sales), 1);

  return (
    <div className="products-table">
      <div className="products-table__header">
        <span>Product Name</span>
        <span>Sales in $</span>
      </div>
      <div className="products-table__body">
        {data.map((item, i) => (
          <div key={i} className="products-table__row">
            <div className="products-table__name">{item.name}</div>
            <div className="products-table__bar-wrap">
              <div
                className="products-table__bar"
                style={{ width: `${(item.sales / max) * 100}%` }}
              />
            </div>
            <div className="products-table__value">${item.sales.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
