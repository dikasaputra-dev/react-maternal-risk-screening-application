import { useQuery } from "@tanstack/react-query";

import { getPatients, type PatientListParams } from "@/api/patients.api";
import { env } from "@/config/env";

import { getPatientsMock } from "../api/patient-mock-api";
import { patientQueryKeys } from "../constants/patient-query-keys";

export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: patientQueryKeys.list(params),

    queryFn: () => {
      if (env.mock.patients) {
        return getPatientsMock(params);
      }

      return getPatients(params);
    },

    staleTime: 15_000,
  });
}
