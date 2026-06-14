import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLaborMonitoringEntry } from "@/api/labor-monitoring.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { createLaborMonitoringEntryMock } from "../api/labor-monitoring-mock-api";
import type { LaborMonitoringFormValues } from "../types/labor-monitoring.type";

type CreateLaborMonitoringVariables = {
  patientId: string;
  values: LaborMonitoringFormValues;
};

export function useCreateLaborMonitoring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, values }: CreateLaborMonitoringVariables) => {
      if (env.mock.screenings) {
        return createLaborMonitoringEntryMock(patientId, values);
      }

      return createLaborMonitoringEntry(patientId, values);
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.laborMonitoring(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.workflow(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.detail(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.lists(),
        }),
      ]);
    },
  });
}
