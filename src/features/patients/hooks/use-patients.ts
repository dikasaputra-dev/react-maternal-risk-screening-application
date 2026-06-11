import { useQuery } from "@tanstack/react-query";

import { getPatients, type PatientListParams } from "@/api/patients.api";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";
import { getPatientsMock } from "@/features/patients/api/patient-mock-api";
import { env } from "@/config/env";

export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: patientQueryKeys.list(params),
    queryFn: () => {
      if (env.mock.patients) {
        return getPatientsMock(params);
      }

      return getPatients(params);
    },
  });
}
