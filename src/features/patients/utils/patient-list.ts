import type { PatientJourneyStatus } from "@/features/patient-journey/types/patient-journey.type";

import type {
  PatientJourneyListSummary,
  PatientListItem,
} from "../types/patient-list.type";
import type { PatientWorkflowStatus } from "../types/patient-workflow.type";
import type { Patient } from "../types/patient.type";

export function getPatientJourneyStatus(
  workflow: PatientWorkflowStatus,
): PatientJourneyStatus {
  if (!workflow.hasInitialScreening) {
    return "not_started";
  }

  if (workflow.hasDeliveryOutcome && workflow.hasNewbornOutcome) {
    return "completed";
  }

  return "active";
}

export function buildPatientJourneyListSummary(
  workflow: PatientWorkflowStatus,
): PatientJourneyListSummary {
  const documentedMilestones = [
    workflow.hasInitialScreening,
    workflow.monitoringEntryCount > 0,
    workflow.hasDeliveryOutcome,
    workflow.hasNewbornOutcome,
  ].filter(Boolean).length;

  const totalMilestones = 4;

  return {
    status: getPatientJourneyStatus(workflow),

    documentedMilestones,

    totalMilestones,

    completionPercentage: Math.round(
      (documentedMilestones / totalMilestones) * 100,
    ),

    monitoringEntryCount: workflow.monitoringEntryCount,

    clinicalActionCount: workflow.clinicalActionCount,

    hasInitialScreening: workflow.hasInitialScreening,

    hasDeliveryOutcome: workflow.hasDeliveryOutcome,

    hasNewbornOutcome: workflow.hasNewbornOutcome,
  };
}

export function buildPatientListItem(
  patient: Patient,
  workflow: PatientWorkflowStatus,
): PatientListItem {
  return {
    ...patient,

    journey: buildPatientJourneyListSummary(workflow),
  };
}
