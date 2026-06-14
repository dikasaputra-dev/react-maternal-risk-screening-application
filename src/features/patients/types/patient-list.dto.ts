import type { PatientJourneyStatus } from "@/features/patient-journey/types/patient-journey.type";

import type { PatientDto } from "./patient.dto";

export type PatientJourneyListSummaryDto = {
  status: PatientJourneyStatus;

  documented_milestones: number;
  total_milestones: number;
  completion_percentage: number;

  monitoring_entry_count: number;
  clinical_action_count: number;

  has_initial_screening: boolean;
  has_delivery_outcome: boolean;
  has_newborn_outcome: boolean;
};

export type PatientListItemDto = PatientDto & {
  journey_summary: PatientJourneyListSummaryDto;
};
