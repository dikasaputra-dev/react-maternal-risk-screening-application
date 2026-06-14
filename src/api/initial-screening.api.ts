import { apiClient } from "./client";

import { unwrapApiData } from "@/lib/api-response";
import {
  mapInitialScreeningDtoToInitialScreening,
  mapInitialScreeningFormToPayload,
} from "@/features/initial-screening/mappers/initial-screening.mapper";
import type { InitialScreeningDto } from "@/features/initial-screening/types/initial-screening.dto";
import type {
  InitialScreening,
  InitialScreeningFormValues,
} from "@/features/initial-screening/types/initial-screening.type";

export async function getInitialScreening(
  patientId: string,
): Promise<InitialScreening> {
  const response = await apiClient.get(
    `/api/patients/${patientId}/initial-screening/`,
  );

  const dto = unwrapApiData<InitialScreeningDto>(response.data);

  return mapInitialScreeningDtoToInitialScreening(dto);
}

export async function createInitialScreening(
  patientId: string,
  values: InitialScreeningFormValues,
): Promise<InitialScreening> {
  const payload = mapInitialScreeningFormToPayload(values);

  const response = await apiClient.post(
    `/api/patients/${patientId}/initial-screening/`,
    payload,
  );

  const dto = unwrapApiData<InitialScreeningDto>(response.data);

  return mapInitialScreeningDtoToInitialScreening(dto);
}
