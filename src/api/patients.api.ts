import { apiClient } from "./client";

import { normalizePaginatedResponse, unwrapApiData } from "@/lib/api-response";
import {
  mapPatientDtoToPatient,
  mapPatientDtosToPatients,
  mapPatientFormToPayload,
} from "@/features/patients/mappers/patient.mapper";
import { mapPatientWorkflowStatusDto } from "@/features/patients/mappers/patient-workflow.mapper";
import type { PatientDto } from "@/features/patients/types/patient.dto";
import type { PatientWorkflowStatusDto } from "@/features/patients/types/patient-workflow.dto";
import type {
  Patient,
  PatientFormValues,
} from "@/features/patients/types/patient.type";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type { PaginatedResponse } from "@/types/api";

export type PatientListParams = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export async function getPatients(
  params?: PatientListParams,
): Promise<PaginatedResponse<Patient>> {
  const response = await apiClient.get("/api/patients/", {
    params: {
      search: params?.search || undefined,
      page: params?.page,
      page_size: params?.pageSize,
    },
  });

  const normalizedResponse = normalizePaginatedResponse<PatientDto>(
    response.data,
    params?.page,
    params?.pageSize,
  );

  return {
    data: mapPatientDtosToPatients(normalizedResponse.data),
    pagination: normalizedResponse.pagination,
  };
}

export async function getPatientById(patientId: string): Promise<Patient> {
  const response = await apiClient.get(`/api/patients/${patientId}/`);

  const dto = unwrapApiData<PatientDto>(response.data);

  return mapPatientDtoToPatient(dto);
}

export async function createPatient(
  values: PatientFormValues,
): Promise<Patient> {
  const payload = mapPatientFormToPayload(values);

  const response = await apiClient.post("/api/patients/", payload);

  const dto = unwrapApiData<PatientDto>(response.data);

  return mapPatientDtoToPatient(dto);
}

export async function updatePatient(
  patientId: string,
  values: PatientFormValues,
): Promise<Patient> {
  const payload = mapPatientFormToPayload(values);

  const response = await apiClient.put(`/api/patients/${patientId}/`, payload);

  const dto = unwrapApiData<PatientDto>(response.data);

  return mapPatientDtoToPatient(dto);
}

export async function deletePatient(patientId: string) {
  await apiClient.delete(`/api/patients/${patientId}/`);

  return patientId;
}

export async function getPatientWorkflowStatus(patientId: string) {
  const response = await apiClient.get(
    `/api/patients/${patientId}/workflow-status/`,
  );

  const dto = unwrapApiData<PatientWorkflowStatusDto>(response.data);

  return mapPatientWorkflowStatusDto(dto);
}

export async function getPatientScreenings(patientId: string) {
  const response = await apiClient.get<ScreeningHistory[]>(
    `/api/patients/${patientId}/screenings/`,
  );

  return unwrapApiData<ScreeningHistory[]>(response.data);
}
