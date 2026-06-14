import { useQuery } from "@tanstack/react-query";

import { getPatientWorkflowStatus } from "@/api/patients.api";
import { env } from "@/config/env";

import { getPatientWorkflowStatusMock } from "../api/patient-workflow-mock-api";
import { patientQueryKeys } from "../constants/patient-query-keys";

export function usePatientWorkflow(patientId: string | undefined) {
  return useQuery({
    queryKey: patientQueryKeys.workflow(patientId ?? ""),

    queryFn: () => {
      if (!patientId) {
        throw new Error("Patient ID tidak valid.");
      }

      if (env.mock.patients) {
        return getPatientWorkflowStatusMock(patientId);
      }

      return getPatientWorkflowStatus(patientId);
    },

    enabled: Boolean(patientId),

    staleTime: 30_000,
  });
}
