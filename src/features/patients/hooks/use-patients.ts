import { useQuery } from "@tanstack/react-query";

import { getPatients, type PatientListParams } from "@/api/patients.api";
import { patientsMock } from "@/features/patients/data/patients.mock";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

const USE_MOCK_DATA = true;

export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: patientQueryKeys.list(params),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return patientsMock;
      }

      return getPatients(params);
    },
  });
}
