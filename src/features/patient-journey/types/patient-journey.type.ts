import type {
  PatientRiskSummary,
  RiskCategory,
} from "@/features/clinical-risk/types/risk.type";

export type PatientJourneyStatus = "not_started" | "active" | "completed";

export type JourneyMilestoneKey =
  | "initial_screening"
  | "labor_monitoring"
  | "delivery_outcome"
  | "newborn_outcome";

export type JourneyMilestoneStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export type JourneyMilestone = {
  key: JourneyMilestoneKey;
  label: string;
  description: string;
  status: JourneyMilestoneStatus;
};

export type ClinicalTimelineEventType =
  | "initial_screening"
  | "labor_monitoring"
  | "clinical_action"
  | "delivery_outcome"
  | "newborn_outcome";

export type ClinicalTimelineDetail = {
  label: string;
  value: string;
};

export type ClinicalTimelineRisk = {
  score: number;
  category: RiskCategory;
};

export type ClinicalTimelineEvent = {
  id: string;
  type: ClinicalTimelineEventType;
  occurredAt: string;
  title: string;
  description: string;
  details: ClinicalTimelineDetail[];
  recordedBy: string | null;
  risk: ClinicalTimelineRisk | null;
};

export type PatientJourneyData = {
  patientId: string;

  status: PatientJourneyStatus;

  documentedMilestones: number;
  totalMilestones: number;
  completionPercentage: number;

  monitoringEntryCount: number;
  clinicalActionCount: number;

  latestRisk: PatientRiskSummary | null;

  primaryClinicalRoute: string;

  milestones: JourneyMilestone[];

  timeline: ClinicalTimelineEvent[];
};
