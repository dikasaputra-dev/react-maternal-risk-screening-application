import type { PatientWorkflowStatus } from "../types/patient-workflow.type";

function createCompletedScreeningWorkflow(
  patientId: string,
  monitoringEntryCount: number,
  updatedAt: string,
): PatientWorkflowStatus {
  return {
    patientId,
    hasInitialScreening: true,
    initialScreeningId: `initial-screening-${patientId}`,
    initialScreeningCompletedAt: updatedAt,
    monitoringEntryCount,
    clinicalActionCount: 0,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt,
  };
}

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

  "2": createCompletedScreeningWorkflow("2", 0, "2026-06-14T09:15:00.000Z"),

  "3": {
    ...createCompletedScreeningWorkflow("3", 2, "2026-06-14T11:30:00.000Z"),
    clinicalActionCount: 2,
    hasDeliveryOutcome: true,
    hasNewbornOutcome: true,
  },

  "4": {
    ...createCompletedScreeningWorkflow("4", 1, "2026-06-14T12:45:00.000Z"),
    clinicalActionCount: 1,
  },

  "5": createCompletedScreeningWorkflow("5", 0, "2026-06-13T10:20:00.000Z"),

  "6": {
    patientId: "6",
    hasInitialScreening: false,
    initialScreeningId: null,
    initialScreeningCompletedAt: null,
    monitoringEntryCount: 0,
    clinicalActionCount: 0,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: "2026-06-06T11:00:00.000Z",
  },

  "7": createCompletedScreeningWorkflow("7", 1, "2026-06-14T07:30:00.000Z"),

  "8": createCompletedScreeningWorkflow("8", 0, "2026-06-12T14:00:00.000Z"),

  "9": createCompletedScreeningWorkflow("9", 1, "2026-06-14T06:50:00.000Z"),

  "10": {
    patientId: "10",
    hasInitialScreening: false,
    initialScreeningId: null,
    initialScreeningCompletedAt: null,
    monitoringEntryCount: 0,
    clinicalActionCount: 0,
    hasDeliveryOutcome: false,
    hasNewbornOutcome: false,
    updatedAt: "2026-06-10T08:35:00.000Z",
  },

  "11": createCompletedScreeningWorkflow("11", 1, "2026-06-14T05:45:00.000Z"),

  "12": createCompletedScreeningWorkflow("12", 0, "2026-06-13T15:25:00.000Z"),
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
