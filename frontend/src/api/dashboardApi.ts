import axiosInstance from "./axiosInstance";
import { DashboardData } from "../types";

export const fetchDashboard = async (
  state: string,
  fromDate: string,
  toDate: string,
): Promise<DashboardData> => {
  const { data } = await axiosInstance.get<DashboardData>("/dashboard", {
    params: {
      state,
      fromDate,
      toDate,
    },
  });
  return data;
};
