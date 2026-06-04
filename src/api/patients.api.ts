import { apiClient } from "@/api/client";
import type {
  Patient,
  PatientFormValues,
} from "@/features/patients/types/patient.type";

export type PatientListParams = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export async function getPatients(params?: PatientListParams) {
  const response = await apiClient.get<Patient[]>("/api/patients/", { params });

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
