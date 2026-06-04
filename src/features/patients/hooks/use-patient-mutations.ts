import {
  createPatient,
  deletePatient,
  updatePatient,
} from "@/api/patients.api";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";
import type { PatientFormValues } from "@/features/patients/types/patient.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const USE_MOCK_DATA = true;

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: PatientFormValues) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return {
          id: crypto.randomUUID(),
          ...values,
          lastScreeningDate: "-",
          riskCategory: "no_risk" as const,
        };
      }

      return createPatient(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}
export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: PatientFormValues;
    }) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 400));

        return {
          id,
          ...values,
          lastScreeningDate: "-",
          riskCategory: "no_risk" as const,
        };
      }

      return updatePatient(id, values);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return id;
      }

      await deletePatient(id);
      return id;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}
