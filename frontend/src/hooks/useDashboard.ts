import { useState, useEffect } from "react";
import { fetchStates, fetchDates } from "../api/stateApi";
import { fetchDashboard } from "../api/dashboardApi";
import { DashboardData } from "../types";

export const useDashboard = () => {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchStates()
      .then((data) => {
        setStates(data);
        if (data.length > 0) setSelectedState(data[0]);
      })
      .catch(() =>
        setError("backend not respond or may be some internal server error"),
      );
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const { minDate, maxDate } = await fetchDates(selectedState);

        setMinDate(minDate);
        setMaxDate(maxDate);
        setFromDate(minDate);
        setToDate(maxDate);

        const data = await fetchDashboard(selectedState, minDate, maxDate);

        setDashboardData(data);
        setInitialLoad(false);
      } catch {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !fromDate || !toDate) return;

    setLoading(true);

    fetchDashboard(selectedState, fromDate, toDate)
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        setError("Failed to load data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fromDate, toDate]);

  return {
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
  };
};
