import { Request, Response } from "express";
import { getData } from "../config/dataStore";

export const getStates = (_req: Request, res: Response): void => {
  const data = getData();
  const states = [...new Set(data.map((r) => r.State))].sort();
  res.json({ states });
};

export const getDates = (req: Request, res: Response): void => {
  const { state } = req.query;

  if (!state || typeof state !== "string") {
    res.status(400).json({ error: "state query param is required" });
    return;
  }

  const data = getData();
  const filtered = data.filter((r) => r.State === state);

  if (filtered.length === 0) {
    res.status(404).json({ error: `No records found for state: ${state}` });
    return;
  }

  const dates = filtered.map((r) => r["Order Date"]).sort();
  res.json({
    minDate: dates[0],
    maxDate: dates[dates.length - 1],
  });
};
