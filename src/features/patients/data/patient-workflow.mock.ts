import type { PatientWorkflowStatus } from "../types/patient-workflow.type";

export const patientWorkflowMock: Record<string, PatientWorkflowStatus> = {
  "1": {
    patientId: "1",
    hasInitialScreening: false,
    initialScreeningId: null,
    initialScreeningCompletedAt: null,
    monitoringEntryCount: 0,
    clinicalActionCount: 0,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: "2026-06-14T08:00:00.000Z",
  },

  "2": {
    patientId: "2",
    hasInitialScreening: true,
    initialScreeningId: "initial-screening-2",
    initialScreeningCompletedAt: "2026-06-14T09:15:00.000Z",
    monitoringEntryCount: 3,
    clinicalActionCount: 1,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: "2026-06-14T11:30:00.000Z",
  },

  "3": {
    patientId: "3",
    hasInitialScreening: true,
    initialScreeningId: "initial-screening-3",
    initialScreeningCompletedAt: "2026-06-13T13:00:00.000Z",
    monitoringEntryCount: 6,
    clinicalActionCount: 2,
    hasDeliveryOutcome: true,
    hasNewbornOutcome: true,
    updatedAt: "2026-06-14T05:45:00.000Z",
  },

  "4": {
    patientId: "4",
    hasInitialScreening: true,
    initialScreeningId: "initial-screening-4",
    initialScreeningCompletedAt: "2026-06-13T16:15:00.000Z",
    monitoringEntryCount: 4,
    clinicalActionCount: 2,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: "2026-06-14T12:45:00.000Z",
  },
};

export function createDefaultPatientWorkflow(
  patientId: string,
): PatientWorkflowStatus {
  return {
    patientId,
    hasInitialScreening: false,
    initialScreeningId: null,
    initialScreeningCompletedAt: null,
    monitoringEntryCount: 0,
    clinicalActionCount: 0,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: new Date().toISOString(),
  };
}
