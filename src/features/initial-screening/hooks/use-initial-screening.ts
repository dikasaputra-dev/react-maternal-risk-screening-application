import { useQuery } from "@tanstack/react-query";

import { getInitialScreening } from "@/api/initial-screening.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { getInitialScreeningMock } from "../api/initial-screening-mock-api";

export function useInitialScreening(
  patientId: string | undefined,
  enabled = true,
) {
  return useQuery({
    queryKey: patientQueryKeys.initialScreening(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.screenings) {
        return getInitialScreeningMock(patientId);
      }

      return getInitialScreening(patientId);
    },

    enabled: Boolean(patientId) && enabled,

    staleTime: 30_000,
  });
}
