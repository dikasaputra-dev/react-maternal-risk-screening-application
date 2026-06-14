import { useQuery } from "@tanstack/react-query";

import { getNewbornOutcome } from "@/api/newborn-outcome.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { getNewbornOutcomeMock } from "../api/newborn-outcome-mock-api";

export function useNewbornOutcome(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.newbornOutcome(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.screenings) {
        return getNewbornOutcomeMock(patientId);
      }

      return getNewbornOutcome(patientId);
    },

    enabled: Boolean(patientId),

    staleTime: 30_000,
  });
}
