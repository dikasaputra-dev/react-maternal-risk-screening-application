import { apiClient } from "@/api/client";
import {
  mapScreeningDtoToResult,
  mapScreeningFormToPayload,
} from "@/features/screenings/mappers/screening.mapper";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type { ScreeningDto } from "@/features/screenings/types/screening.dto";
import type {
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";
import { unwrapApiData } from "@/lib/api-response";

export type ScreeningHistoryParams = {
  search?: string;
  riskCategory?: string;
  startDate?: string;
  endDate?: string;
};

export async function submitScreening(
  values: ScreeningFormValues,
): Promise<ScreeningResult> {
  const payload = mapScreeningFormToPayload(values);

  const response = await apiClient.post("/api/screenings/", payload);

  const dto = unwrapApiData<ScreeningDto>(response.data);

  return mapScreeningDtoToResult(dto);
}

export async function getScreeningHistory(params?: ScreeningHistoryParams) {
  const response = await apiClient.get<ScreeningHistory[]>(
    "/api/screenings/history/",
    {
      params,
    },
  );

  return unwrapApiData<ScreeningHistory[]>(response.data);
}
