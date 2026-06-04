import type { PatientListParams } from "@/api/patients.api";

export const patientQueryKeys = {
  all: ["patients"] as const,

  lists: () => [...patientQueryKeys.all, "list"] as const,

  list: (params?: PatientListParams) =>
    [...patientQueryKeys.lists(), params] as const,

  detail: (id: string) => [...patientQueryKeys.all, "detail", id] as const,
};
