import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNewbornOutcome } from "@/api/newborn-outcome.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { createNewbornOutcomeMock } from "../api/newborn-outcome-mock-api";
import type { NewbornOutcomeFormValues } from "../types/newborn-outcome.type";

type CreateNewbornOutcomeVariables = {
  patientId: string;
  values: NewbornOutcomeFormValues;
};

export function useCreateNewbornOutcome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, values }: CreateNewbornOutcomeVariables) => {
      if (env.mock.screenings) {
        return createNewbornOutcomeMock(patientId, values);
      }

      return createNewbornOutcome(patientId, values);
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.newbornOutcome(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.workflow(variables.patientId),
        }),

        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.detail(variables.patientId),
        }),
      ]);
    },
  });
}
