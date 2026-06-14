import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInitialScreening } from "@/api/initial-screening.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { createInitialScreeningMock } from "../api/initial-screening-mock-api";
import type { InitialScreeningFormValues } from "../types/initial-screening.type";

type CreateInitialScreeningVariables = {
  patientId: string;
  values: InitialScreeningFormValues;
};

export function useCreateInitialScreening() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, values }: CreateInitialScreeningVariables) => {
      if (env.mock.screenings) {
        return createInitialScreeningMock(patientId, values);
      }

      return createInitialScreening(patientId, values);
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.detail(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.workflow(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.initialScreening(variables.patientId),
        }),
      ]);
    },
  });
}
