import { apiClient } from "@/api/client";
import type {
  Patient,
  PatientFormValues,
  RiskCategory,
} from "@/features/patients/types/patient.type";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type { PaginatedResponse } from "@/types/api";

export type PatientListParams = {
  search?: string;
  risk?: "all" | RiskCategory;
  page?: number;
  pageSize?: number;
};

export async function getPatients(params?: PatientListParams) {
  const response = await apiClient.get<PaginatedResponse<Patient>>(
    "/api/patients/",
    {
      params,
    },
  );

  return response.data;
}

export async function getPatientById(id: string) {
  const response = await apiClient.get<Patient>(`/api/patients/${id}/`);

  return response.data;
}

export async function getPatientScreenings(id: string) {
  const response = await apiClient.get<ScreeningHistory[]>(
    `/api/patients/${id}/screenings/`,
  );

  return response.data;
}

export async function createPatient(values: PatientFormValues) {
  const response = await apiClient.post<Patient>("/api/patients/", values);

  return response.data;
}

export async function updatePatient(id: string, values: PatientFormValues) {
  const response = await apiClient.put<Patient>(`/api/patients/${id}/`, values);

  return response.data;
}

export async function deletePatient(id: string) {
  await apiClient.delete(`/api/patients/${id}/`);

  return id;
}
