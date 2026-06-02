export type MedicalHistoryKey =
  | "diabetes"
  | "hypertension"
  | "asthma"
  | "heart_disease"
  | "preeclampsia_history";

export type ChecklistKey =
  | "leopold_done"
  | "fetal_heartbeat_checked"
  | "urine_protein_checked"
  | "blood_pressure_checked";

export type ScreeningFormValues = {
  patientId: string;
  maternalAge: number;
  gravida: number;
  partus: number;
  abortus: number;
  gestationalAgeWeeks: number;
  systolicBp: number;
  diastolicBp: number;
  estimatedFetalWeight: number;
  medicalHistory: Record<MedicalHistoryKey, boolean>;
  checklistItems: Record<ChecklistKey, boolean>;
};

export type RiskCategory = "no_risk" | "low_risk" | "high_risk";

export type ScreeningResult = {
  riskScore: number;
  riskCategory: RiskCategory;
};
