import type { PatientListParams } from "@/api/patients.api";

export const patientQueryKeys = {
  all: ["patients"] as const,

  lists() {
    return [...patientQueryKeys.all, "list"] as const;
  },

  list(params?: PatientListParams) {
    return [...patientQueryKeys.lists(), params ?? {}] as const;
  },

  details() {
    return [...patientQueryKeys.all, "detail"] as const;
  },

  detail(patientId: string) {
    return [...patientQueryKeys.details(), patientId] as const;
  },

  workflow(patientId: string) {
    return [...patientQueryKeys.detail(patientId), "workflow"] as const;
  },

  initialScreening(patientId: string) {
    return [
      ...patientQueryKeys.detail(patientId),
      "initial-screening",
    ] as const;
  },

  laborMonitoring(patientId: string) {
    return [...patientQueryKeys.detail(patientId), "labor-monitoring"] as const;
  },

  clinicalActions(patientId: string) {
    return [...patientQueryKeys.detail(patientId), "clinical-actions"] as const;
  },

  deliveryOutcome(patientId: string) {
    return [...patientQueryKeys.detail(patientId), "delivery-outcome"] as const;
  },

  newbornOutcome(patientId: string) {
    return [...patientQueryKeys.detail(patientId), "newborn-outcome"] as const;
  },
};
