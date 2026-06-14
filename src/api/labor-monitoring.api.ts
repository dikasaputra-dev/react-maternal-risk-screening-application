import { apiClient } from "./client";

import { unwrapApiData, unwrapApiList } from "@/lib/api-response";
import {
  mapLaborMonitoringDtoToEntry,
  mapLaborMonitoringDtosToEntries,
  mapLaborMonitoringFormToPayload,
} from "@/features/labor-monitoring/mappers/labor-monitoring.mapper";
import type { LaborMonitoringEntryDto } from "@/features/labor-monitoring/types/labor-monitoring.dto";
import type {
  LaborMonitoringEntry,
  LaborMonitoringFormValues,
} from "@/features/labor-monitoring/types/labor-monitoring.type";

export async function getLaborMonitoringEntries(
  patientId: string,
): Promise<LaborMonitoringEntry[]> {
  const response = await apiClient.get(
    `/api/patients/${patientId}/labor-monitoring/`,
  );

  const dtos = unwrapApiList<LaborMonitoringEntryDto>(response.data);

  return mapLaborMonitoringDtosToEntries(dtos);
}

export async function createLaborMonitoringEntry(
  patientId: string,
  values: LaborMonitoringFormValues,
): Promise<LaborMonitoringEntry> {
  const payload = mapLaborMonitoringFormToPayload(values);

  const response = await apiClient.post(
    `/api/patients/${patientId}/labor-monitoring/`,
    payload,
  );

  const dto = unwrapApiData<LaborMonitoringEntryDto>(response.data);

  return mapLaborMonitoringDtoToEntry(dto);
}
