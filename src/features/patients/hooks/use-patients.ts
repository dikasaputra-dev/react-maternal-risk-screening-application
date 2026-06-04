import { useQuery } from "@tanstack/react-query";

import { getPatients, type PatientListParams } from "@/api/patients.api";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";
import { getPatientsMock } from "@/features/patients/api/patient-mock-api";

const USE_MOCK_DATA = true;

export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: patientQueryKeys.list(params),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return getPatientsMock();
      }

      return getPatients(params);
    },
  });
}
