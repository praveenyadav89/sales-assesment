import axiosInstance from "./axiosInstance";

export const fetchStates = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<{ states: string[] }>("/states");
  return data.states;
};

export const fetchDates = async (
  state: string,
): Promise<{ minDate: string; maxDate: string }> => {
  const { data } = await axiosInstance.get("/dates", {
    params: { state },
  });
  return data;
};
