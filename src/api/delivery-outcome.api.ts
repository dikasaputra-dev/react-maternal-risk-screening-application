import { isAxiosError } from "axios";

import { apiClient } from "./client";

import { unwrapApiData } from "@/lib/api-response";
import {
  mapDeliveryOutcomeDtoToDeliveryOutcome,
  mapDeliveryOutcomeFormToPayload,
} from "@/features/delivery-outcomes/mappers/delivery-outcome.mapper";
import type { DeliveryOutcomeDto } from "@/features/delivery-outcomes/types/delivery-outcome.dto";
import type {
  DeliveryOutcome,
  DeliveryOutcomeFormValues,
} from "@/features/delivery-outcomes/types/delivery-outcome.type";

export async function getDeliveryOutcome(
  patientId: string,
): Promise<DeliveryOutcome | null> {
  try {
    const response = await apiClient.get(
      `/api/patients/${patientId}/delivery-outcome/`,
    );

    const dto = unwrapApiData<DeliveryOutcomeDto>(response.data);

    return mapDeliveryOutcomeDtoToDeliveryOutcome(dto);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createDeliveryOutcome(
  patientId: string,
  values: DeliveryOutcomeFormValues,
): Promise<DeliveryOutcome> {
  const payload = mapDeliveryOutcomeFormToPayload(values);

  const response = await apiClient.post(
    `/api/patients/${patientId}/delivery-outcome/`,
    payload,
  );

  const dto = unwrapApiData<DeliveryOutcomeDto>(response.data);

  return mapDeliveryOutcomeDtoToDeliveryOutcome(dto);
}
