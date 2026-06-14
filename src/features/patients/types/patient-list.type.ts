import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";
import type { PatientJourneyStatus } from "@/features/patient-journey/types/patient-journey.type";

import type { Patient } from "./patient.type";

export type PatientJourneyListSummary = {
  status: PatientJourneyStatus;

  documentedMilestones: number;
  totalMilestones: number;
  completionPercentage: number;

  monitoringEntryCount: number;
  clinicalActionCount: number;

  hasInitialScreening: boolean;
  hasDeliveryOutcome: boolean;
  hasNewbornOutcome: boolean;
};

export type PatientListItem = Patient & {
  journey: PatientJourneyListSummary;
};

export type PatientStatusFilter = "all" | PatientJourneyStatus;

export type PatientRiskFilter = "all" | "unassessed" | RiskCategory;

export type PatientListFilterValues = {
  search: string;
  journeyStatus: PatientStatusFilter;
  riskCategory: PatientRiskFilter;
  pageSize: number;
};
