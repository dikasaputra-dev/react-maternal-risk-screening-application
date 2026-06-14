import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDeliveryOutcome } from "@/api/delivery-outcome.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { createDeliveryOutcomeMock } from "../api/delivery-outcome-mock-api";
import type { DeliveryOutcomeFormValues } from "../types/delivery-outcome.type";

type CreateDeliveryOutcomeVariables = {
  patientId: string;
  values: DeliveryOutcomeFormValues;
};

export function useCreateDeliveryOutcome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ patientId, values }: CreateDeliveryOutcomeVariables) => {
      if (env.mock.screenings) {
        return createDeliveryOutcomeMock(patientId, values);
      }

      return createDeliveryOutcome(patientId, values);
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: patientQueryKeys.deliveryOutcome(variables.patientId),
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
