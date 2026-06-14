import { useQuery } from "@tanstack/react-query";

import { getClinicalActions } from "@/api/clinical-actions.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { getClinicalActionsMock } from "../api/clinical-actions-mock-api";

export function useClinicalActions(
  patientId: string | undefined,
  enabled = true,
) {
  return useQuery({
    queryKey: patientQueryKeys.clinicalActions(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.screenings) {
        return getClinicalActionsMock(patientId);
      }

      return getClinicalActions(patientId);
    },

    enabled: Boolean(patientId) && enabled,

    staleTime: 15_000,
  });
}
