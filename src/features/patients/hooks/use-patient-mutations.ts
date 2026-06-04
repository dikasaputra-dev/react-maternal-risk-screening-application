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

const USE_MOCK_DATA = true;

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: PatientFormValues) => {
      if (USE_MOCK_DATA) {
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
      if (USE_MOCK_DATA) {
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
      if (USE_MOCK_DATA) {
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
    mutationFn: resetPatientsMock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}
