import { useQuery } from "@tanstack/react-query";

import { getDeliveryOutcome } from "@/api/delivery-outcome.api";
import { env } from "@/config/env";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";

import { getDeliveryOutcomeMock } from "../api/delivery-outcome-mock-api";

export function useDeliveryOutcome(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.deliveryOutcome(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.screenings) {
        return getDeliveryOutcomeMock(patientId);
      }

      return getDeliveryOutcome(patientId);
    },

    enabled: Boolean(patientId),

    staleTime: 30_000,
  });
}
