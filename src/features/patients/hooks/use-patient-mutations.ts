import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createPatient,
  deletePatient,
  updatePatient,
} from "@/api/patients.api";
import type { PatientFormValues } from "@/features/patients/types/patient.type";
import { patientQueryKeys } from "@/features/patients/constants/patient-query-keys";
import {
  createPatientMock,
  deletePatientMock,
  resetPatientsMock,
  updatePatientMock,
} from "@/features/patients/api/patient-mock-api";
import { env } from "@/config/env";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: PatientFormValues) => {
      if (env.mock.patients) {
        return createPatientMock(values);
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
    mutationFn: ({ id, values }: { id: string; values: PatientFormValues }) => {
      if (env.mock.patients) {
        return updatePatientMock(id, values);
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
    mutationFn: (id: string) => {
      if (env.mock.patients) {
        return deletePatientMock(id);
      }

      return deletePatient(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}

export function useResetPatientsMock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!env.mock.patients) {
        throw new Error("Reset mock hanya tersedia di mode mock.");
      }

      return resetPatientsMock();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}
