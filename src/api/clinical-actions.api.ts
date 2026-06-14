import { apiClient } from "./client";

import { unwrapApiData, unwrapApiList } from "@/lib/api-response";
import {
  mapClinicalActionDtoToClinicalAction,
  mapClinicalActionDtosToClinicalActions,
  mapClinicalActionFormToPayload,
} from "@/features/clinical-actions/mappers/clinical-action.mapper";
import type { ClinicalActionDto } from "@/features/clinical-actions/types/clinical-action.dto";
import type {
  ClinicalAction,
  ClinicalActionFormValues,
} from "@/features/clinical-actions/types/clinical-action.type";

export async function getClinicalActions(
  patientId: string,
): Promise<ClinicalAction[]> {
  const response = await apiClient.get(
    `/api/patients/${patientId}/clinical-actions/`,
  );

  const dtos = unwrapApiList<ClinicalActionDto>(response.data);

  return mapClinicalActionDtosToClinicalActions(dtos);
}

export async function createClinicalAction(
  patientId: string,
  values: ClinicalActionFormValues,
): Promise<ClinicalAction> {
  const payload = mapClinicalActionFormToPayload(values);

  const response = await apiClient.post(
    `/api/patients/${patientId}/clinical-actions/`,
    payload,
  );

  const dto = unwrapApiData<ClinicalActionDto>(response.data);

  return mapClinicalActionDtoToClinicalAction(dto);
}
