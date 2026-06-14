import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

export type ConsciousnessLevel =
  | "compos_mentis"
  | "apathy"
  | "somnolence"
  | "stupor"
  | "coma";

export type PreviousDeliveryStatus = "never" | "years";

export type PreviousPregnancyHistory =
  | "normal"
  | "gestational_diabetes"
  | "hypertension"
  | "preeclampsia"
  | "eclampsia";

export type Comorbidity =
  | "none"
  | "asthma"
  | "heart_disease"
  | "hypertension"
  | "bleeding"
  | "anemia";

export type InitialScreeningVitalSigns = {
  consciousness: ConsciousnessLevel;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  pulse: number;
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
};

export type InitialScreeningObstetricStatus = {
  gravida: number;
  para: number;
  abortus: number;
  livingChildren: number;
  gestationalAgeWeeks: number;
};

export type PreviousDeliveryInterval = {
  status: PreviousDeliveryStatus;
  years: number;
};

export type InitialScreeningFormValues = {
  heightCm: number;

  vitalSigns: InitialScreeningVitalSigns;

  obstetricStatus: InitialScreeningObstetricStatus;

  previousDeliveryInterval: PreviousDeliveryInterval;

  previousPregnancyHistory: PreviousPregnancyHistory[];

  comorbidities: Comorbidity[];
};

export type InitialScreeningRiskResult = {
  score: number;
  category: RiskCategory;
  factors: string[];
  criticalFactors: string[];
};

export type InitialScreeningScreenedBy = {
  id: string;
  name: string;
};

export type InitialScreening = {
  id: string;
  patientId: string;

  heightCm: number;

  vitalSigns: InitialScreeningVitalSigns;

  obstetricStatus: InitialScreeningObstetricStatus;

  previousDeliveryInterval: PreviousDeliveryInterval;

  previousPregnancyHistory: PreviousPregnancyHistory[];

  comorbidities: Comorbidity[];

  riskScore: number;
  riskCategory: RiskCategory;
  riskFactors: string[];
  criticalFactors: string[];

  screenedAt: string;
  screenedBy: InitialScreeningScreenedBy;
};

export type InitialScreeningFieldName =
  | "heightCm"
  | "vitalSigns.consciousness"
  | "vitalSigns.systolicBloodPressure"
  | "vitalSigns.diastolicBloodPressure"
  | "vitalSigns.pulse"
  | "vitalSigns.respiratoryRate"
  | "vitalSigns.temperature"
  | "vitalSigns.oxygenSaturation"
  | "obstetricStatus.gravida"
  | "obstetricStatus.para"
  | "obstetricStatus.abortus"
  | "obstetricStatus.livingChildren"
  | "obstetricStatus.gestationalAgeWeeks"
  | "previousDeliveryInterval.status"
  | "previousDeliveryInterval.years"
  | "previousPregnancyHistory"
  | "comorbidities";

export type InitialScreeningFormErrors = Partial<
  Record<InitialScreeningFieldName, string>
>;
