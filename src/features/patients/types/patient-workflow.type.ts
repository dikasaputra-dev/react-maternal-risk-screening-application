export type PatientWorkflowStepKey =
  | "initial_screening"
  | "labor_monitoring"
  | "clinical_actions"
  | "delivery_outcome"
  | "newborn_outcome";

export type PatientWorkflowItemStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export type PatientWorkflowStatus = {
  patientId: string;

  hasInitialScreening: boolean;
  initialScreeningId: string | null;
  initialScreeningCompletedAt: string | null;

  monitoringEntryCount: number;
  clinicalActionCount: number;

  hasDeliveryOutcome: boolean;
  hasNewbornOutcome: boolean;

  updatedAt: string;
};

export type PatientWorkflowNavigationItem = {
  key: PatientWorkflowStepKey;
  label: string;
  href: string;
  status: PatientWorkflowItemStatus;
};

export type PatientWorkflowSummary = {
  patientId: string;
  primaryStep: "initial_screening" | "labor_monitoring";
  navigationItems: PatientWorkflowNavigationItem[];
};
