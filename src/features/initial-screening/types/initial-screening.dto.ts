import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

import type {
  Comorbidity,
  ConsciousnessLevel,
  PreviousDeliveryStatus,
  PreviousPregnancyHistory,
} from "./initial-screening.type";

export type InitialScreeningPayloadDto = {
  height_cm: number;

  vital_signs: {
    consciousness: ConsciousnessLevel;
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
    pulse: number;
    respiratory_rate: number;
    temperature: number;
    oxygen_saturation: number;
  };

  obstetric_status: {
    gravida: number;
    para: number;
    abortus: number;
    living_children: number;
    gestational_age_weeks: number;
  };

  previous_delivery_interval: {
    status: PreviousDeliveryStatus;
    years: number | null;
  };

  previous_pregnancy_history: PreviousPregnancyHistory[];

  comorbidities: Comorbidity[];
};

export type InitialScreeningDto = {
  id: string;
  patient_id: string;

  height_cm: number;

  vital_signs: {
    consciousness: ConsciousnessLevel;
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
    pulse: number;
    respiratory_rate: number;
    temperature: number;
    oxygen_saturation: number;
  };

  obstetric_status: {
    gravida: number;
    para: number;
    abortus: number;
    living_children: number;
    gestational_age_weeks: number;
  };

  previous_delivery_interval: {
    status: PreviousDeliveryStatus;
    years: number | null;
  };

  previous_pregnancy_history: PreviousPregnancyHistory[];

  comorbidities: Comorbidity[];

  risk_score: number;
  risk_category: RiskCategory;
  risk_factors?: string[];
  critical_factors?: string[];

  screened_at: string;

  screened_by: {
    id: string;
    name: string;
  };
};
