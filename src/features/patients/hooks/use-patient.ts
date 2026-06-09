import { useQuery } from "@tanstack/react-query";

import { getPatientById, getPatientScreenings } from "@/api/patients.api";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";
import {
  getPatientByIdMock,
  getPatientScreeningsMock,
} from "@/features/patients/api/patient-mock-api";
import { env } from "@/config/env";

export function usePatient(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.detail(patientId ?? ""),
    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.useMockApi) {
        return getPatientByIdMock(patientId);
      }

      return getPatientById(patientId);
    },
    enabled: Boolean(patientId),
  });
}

export function usePatientScreenings(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.screenings(patientId ?? ""),
    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.useMockApi) {
        return getPatientScreeningsMock(patientId);
      }

      return getPatientScreenings(patientId);
    },
    enabled: Boolean(patientId),
  });
}
