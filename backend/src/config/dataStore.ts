import path from "path";
import fs from "fs";
import { SaleRecord } from "../models/SaleRecord";

const dataPath = path.join(__dirname, "../../sales.json");

let salesData: SaleRecord[] = [];

export const loadData = (): void => {
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    salesData = JSON.parse(rawData);
    console.log(` Loaded ${salesData.length} records from sales.json`);
  } catch (err) {
    console.error(" Failed to load sales.json:", err);
    process.exit(1);
  }
};

export const getData = (): SaleRecord[] => salesData;
