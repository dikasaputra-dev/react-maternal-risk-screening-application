import { apiClient } from "@/api/client";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type { ScreeningFormValues } from "@/features/screenings/types/screening.type";

export type ScreeningHistoryParams = {
  search?: string;
  riskCategory?: string;
  startDate?: string;
  endDate?: string;
};

export async function submitScreening(values: ScreeningFormValues) {
  const response = await apiClient.post("/api/screenings/", values);

  return response.data;
}

export async function getScreeningHistory(params?: ScreeningHistoryParams) {
  const response = await apiClient.get<ScreeningHistory[]>(
    "/api/screenings/history",
    {
      params,
    },
  );

  return response.data;
}
