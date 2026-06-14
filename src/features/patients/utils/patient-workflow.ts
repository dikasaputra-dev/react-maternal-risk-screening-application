import { patientRoutes } from "../constants/patient-routes";
import type {
  PatientWorkflowItemStatus,
  PatientWorkflowNavigationItem,
  PatientWorkflowStatus,
  PatientWorkflowSummary,
} from "../types/patient-workflow.type";

function getCollectionStatus(count: number): PatientWorkflowItemStatus {
  if (count > 0) {
    return "in_progress";
  }

  return "not_started";
}

function getCompletionStatus(completed: boolean): PatientWorkflowItemStatus {
  if (completed) {
    return "completed";
  }

  return "not_started";
}

export function getPatientPrimaryClinicalRoute(
  patientId: string,
  workflow: PatientWorkflowStatus,
) {
  if (workflow.hasInitialScreening) {
    return patientRoutes.laborMonitoring(patientId);
  }

  return patientRoutes.initialScreening(patientId);
}

export function getPatientWorkflowNavigation(
  patientId: string,
  workflow: PatientWorkflowStatus,
): PatientWorkflowNavigationItem[] {
  const primaryNavigationItem: PatientWorkflowNavigationItem =
    workflow.hasInitialScreening
      ? {
          key: "labor_monitoring",
          label: "Pemantauan Persalinan",
          href: patientRoutes.laborMonitoring(patientId),
          status: getCollectionStatus(workflow.monitoringEntryCount),
        }
      : {
          key: "initial_screening",
          label: "Skrining Awal",
          href: patientRoutes.initialScreening(patientId),
          status: "not_started",
        };

  return [
    primaryNavigationItem,
    {
      key: "clinical_actions",
      label: "Tindakan",
      href: patientRoutes.clinicalActions(patientId),
      status: getCollectionStatus(workflow.clinicalActionCount),
    },
    {
      key: "delivery_outcome",
      label: "Luaran Persalinan",
      href: patientRoutes.deliveryOutcome(patientId),
      status: getCompletionStatus(workflow.hasDeliveryOutcome),
    },
    {
      key: "newborn_outcome",
      label: "Luaran Kelahiran Bayi",
      href: patientRoutes.newbornOutcome(patientId),
      status: getCompletionStatus(workflow.hasNewbornOutcome),
    },
  ];
}

export function getPatientWorkflowSummary(
  patientId: string,
  workflow: PatientWorkflowStatus,
): PatientWorkflowSummary {
  return {
    patientId,
    primaryStep: workflow.hasInitialScreening
      ? "labor_monitoring"
      : "initial_screening",
    navigationItems: getPatientWorkflowNavigation(patientId, workflow),
  };
}

export function canAccessInitialScreening(workflow: PatientWorkflowStatus) {
  return !workflow.hasInitialScreening;
}

export function canAccessLaborMonitoring(workflow: PatientWorkflowStatus) {
  return workflow.hasInitialScreening;
}
