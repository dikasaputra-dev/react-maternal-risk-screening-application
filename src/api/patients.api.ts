import { apiClient } from "@/api/client";
import {
  mapPatientDtosToPatients,
  mapPatientDtoToPatient,
} from "@/features/patients/mappers/patient.mapper";
import type {
  PatientDto,
  PatientPayloadDto,
} from "@/features/patients/types/patient.dto";
import type {
  Patient,
  PatientFormValues,
  RiskCategory,
} from "@/features/patients/types/patient.type";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import { normalizePaginatedResponse, unwrapApiData } from "@/lib/api-response";
import type { PaginatedResponse } from "@/types/api";

export type PatientListParams = {
  search?: string;
  risk?: "all" | RiskCategory;
  page?: number;
  pageSize?: number;
};

function mapPatientFormToPayload(values: PatientFormValues): PatientPayloadDto {
  return {
    nik: values.nik,
    full_name: values.fullName,

    /**
     * Sementara belum ada dateOfBirth di form.
     * Nanti di Phase 20, form pasien sebaiknya diganti dari age → dateOfBirth.
     */
    address: values.address ?? null,
    phone: values.phone ?? null,
  };
}

export async function getPatients(
  params?: PatientListParams,
): Promise<PaginatedResponse<Patient>> {
  const response = await apiClient.get("/api/patients/", {
    params: {
      search: params?.search,
      risk: params?.risk === "all" ? undefined : params?.risk,
      page: params?.page,
      page_size: params?.pageSize,
    },
  });

  const normalized = normalizePaginatedResponse<PatientDto>(
    response.data,
    params?.page,
    params?.pageSize,
  );

  return {
    data: mapPatientDtosToPatients(normalized.data),
    pagination: normalized.pagination,
  };
}

export async function getPatientById(id: string): Promise<Patient> {
  const response = await apiClient.get(`/api/patients/${id}/`);

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
  id: string,
  values: PatientFormValues,
): Promise<Patient> {
  const payload = mapPatientFormToPayload(values);

  const response = await apiClient.put(`/api/patients/${id}/`, payload);

  const dto = unwrapApiData<PatientDto>(response.data);

  return mapPatientDtoToPatient(dto);
}

export async function deletePatient(id: string) {
  await apiClient.delete(`/api/patients/${id}/`);

  return id;
}

export async function getPatientScreenings(id: string) {
  const response = await apiClient.get<ScreeningHistory[]>(
    `/api/patients/${id}/screenings/`,
  );

  return unwrapApiData<ScreeningHistory[]>(response.data);
}
