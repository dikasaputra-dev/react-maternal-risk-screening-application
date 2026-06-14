export type RiskCategory = "low_risk" | "moderate_risk" | "high_risk";

export type RiskSource = "initial_screening" | "labor_monitoring";

export type PatientRiskSummary = {
  score: number;
  category: RiskCategory;
  source: RiskSource;
  assessedAt: string;
};

export type RiskAssessment = {
  id: string;
  patientId: string;
  score: number;
  category: RiskCategory;
  source: RiskSource;
  assessedAt: string;
  assessedBy: string;
};
