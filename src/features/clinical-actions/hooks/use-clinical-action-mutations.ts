import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClinicalAction } from "@/api/clinical-actions.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { createClinicalActionMock } from "../api/clinical-actions-mock-api";
import type { ClinicalActionFormValues } from "../types/clinical-action.type";

type CreateClinicalActionVariables = {
  patientId: string;
  values: ClinicalActionFormValues;
};

export function useCreateClinicalAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, values }: CreateClinicalActionVariables) => {
      if (env.mock.screenings) {
        return createClinicalActionMock(patientId, values);
      }

      return createClinicalAction(patientId, values);
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.clinicalActions(variables.patientId),
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
