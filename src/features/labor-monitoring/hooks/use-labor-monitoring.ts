import { useQuery } from "@tanstack/react-query";

import { getLaborMonitoringEntries } from "@/api/labor-monitoring.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { getLaborMonitoringEntriesMock } from "../api/labor-monitoring-mock-api";

export function useLaborMonitoring(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.laborMonitoring(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.screenings) {
        return getLaborMonitoringEntriesMock(patientId);
      }

      return getLaborMonitoringEntries(patientId);
    },

    enabled: Boolean(patientId),

    staleTime: 15_000,
  });
}
