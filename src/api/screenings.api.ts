import { apiClient } from "@/api/client";
import {
  mapScreeningDtoToResult,
  mapScreeningFormToPayload,
  mapScreeningHistoryDtosToHistories,
} from "@/features/screenings/mappers/screening.mapper";

import type {
  ScreeningDto,
  ScreeningHistoryDto,
} from "@/features/screenings/types/screening.dto";
import type {
  RiskCategory,
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";
import { unwrapApiData, unwrapApiList } from "@/lib/api-response";

export type ScreeningHistoryParams = {
  search?: string;
  risk?: "all" | RiskCategory;
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
  const response = await apiClient.get("/api/screenings/history/", {
    params: {
      search: params?.search,
      risk_category: params?.risk === "all" ? undefined : params?.risk,
      start_date: params?.startDate,
      end_date: params?.endDate,
    },
  });

  const dtos = unwrapApiList<ScreeningHistoryDto>(response.data);

  return mapScreeningHistoryDtosToHistories(dtos);
}
