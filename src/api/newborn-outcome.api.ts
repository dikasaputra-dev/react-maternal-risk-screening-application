import { isAxiosError } from "axios";

import { apiClient } from "./client";

import {
  mapNewbornOutcomeDtoToNewbornOutcome,
  mapNewbornOutcomeFormToPayload,
} from "@/features/newborn-outcomes/mappers/newborn-outcome.mapper";
import type { NewbornOutcomeDto } from "@/features/newborn-outcomes/types/newborn-outcome.dto";
import type {
  NewbornOutcome,
  NewbornOutcomeFormValues,
} from "@/features/newborn-outcomes/types/newborn-outcome.type";
import { unwrapApiData } from "@/lib/api-response";

export async function getNewbornOutcome(
  patientId: string,
): Promise<NewbornOutcome | null> {
  try {
    const response = await apiClient.get(
      `/api/patients/${patientId}/newborn-outcome/`,
    );

    const dto = unwrapApiData<NewbornOutcomeDto>(response.data);

    return mapNewbornOutcomeDtoToNewbornOutcome(dto);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createNewbornOutcome(
  patientId: string,
  values: NewbornOutcomeFormValues,
): Promise<NewbornOutcome> {
  const payload = mapNewbornOutcomeFormToPayload(values);

  const response = await apiClient.post(
    `/api/patients/${patientId}/newborn-outcome/`,
    payload,
  );

  const dto = unwrapApiData<NewbornOutcomeDto>(response.data);

  return mapNewbornOutcomeDtoToNewbornOutcome(dto);
}
