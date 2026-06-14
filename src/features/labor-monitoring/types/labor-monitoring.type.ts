import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

export type FetalMovementStatus = "active" | "reduced" | "not_felt";

export type ContractionIntensity = "weak" | "moderate" | "strong";

export type HeadDescentLevel =
  | "not_assessed"
  | "hodge_i"
  | "hodge_ii"
  | "hodge_iii"
  | "hodge_iv";

export type MembraneStatus = "intact" | "ruptured";

export type AmnioticFluidColor =
  | "clear"
  | "green"
  | "brown"
  | "bloody"
  | "other";

export type UrineMarker = "negative" | "positive";

export type LaborMonitoringVitalSigns = {
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  pulse: number;
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
};

export type LaborContractionAssessment = {
  frequencyPer10Minutes: number;
  durationSeconds: number;
  intensity: ContractionIntensity;
};

export type LaborMembraneAssessment = {
  status: MembraneStatus;
  rupturedAt: string | null;
  color: AmnioticFluidColor | null;
};

export type LaborUrineAssessment = {
  volumeMl: number;
  protein: UrineMarker;
  acetone: UrineMarker;
};

export type LaborMonitoringFormValues = {
  recordedAt: string;

  vitalSigns: LaborMonitoringVitalSigns;

  fetalHeartRate: number;
  fetalMovement: FetalMovementStatus;

  contractions: LaborContractionAssessment;

  cervicalDilationCm: number;
  headDescent: HeadDescentLevel;

  membranes: {
    status: MembraneStatus;
    rupturedAt: string;
    color: AmnioticFluidColor | "";
  };

  urine: LaborUrineAssessment;
};

export type LaborMonitoringRiskResult = {
  score: number;
  category: RiskCategory;
  factors: string[];
  criticalFactors: string[];
};

export type LaborMonitoringRecordedBy = {
  id: string;
  name: string;
};

export type LaborMonitoringEntry = {
  id: string;
  patientId: string;

  recordedAt: string;

  vitalSigns: LaborMonitoringVitalSigns;

  fetalHeartRate: number;
  fetalMovement: FetalMovementStatus;

  contractions: LaborContractionAssessment;

  cervicalDilationCm: number;
  headDescent: HeadDescentLevel;

  membranes: LaborMembraneAssessment;

  urine: LaborUrineAssessment;

  riskScore: number;
  riskCategory: RiskCategory;
  riskFactors: string[];
  criticalFactors: string[];

  recordedBy: LaborMonitoringRecordedBy;
};

export type LaborMonitoringFieldName =
  | "recordedAt"
  | "vitalSigns.systolicBloodPressure"
  | "vitalSigns.diastolicBloodPressure"
  | "vitalSigns.pulse"
  | "vitalSigns.respiratoryRate"
  | "vitalSigns.temperature"
  | "vitalSigns.oxygenSaturation"
  | "fetalHeartRate"
  | "fetalMovement"
  | "contractions.frequencyPer10Minutes"
  | "contractions.durationSeconds"
  | "contractions.intensity"
  | "cervicalDilationCm"
  | "headDescent"
  | "membranes.status"
  | "membranes.rupturedAt"
  | "membranes.color"
  | "urine.volumeMl"
  | "urine.protein"
  | "urine.acetone";

export type LaborMonitoringFormErrors = Partial<
  Record<LaborMonitoringFieldName, string>
>;
