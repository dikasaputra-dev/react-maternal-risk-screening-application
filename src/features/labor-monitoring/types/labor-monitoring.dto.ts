import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

import type {
  AmnioticFluidColor,
  ContractionIntensity,
  FetalMovementStatus,
  HeadDescentLevel,
  MembraneStatus,
  UrineMarker,
} from "./labor-monitoring.type";

export type LaborMonitoringPayloadDto = {
  recorded_at: string;

  vital_signs: {
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
    pulse: number;
    respiratory_rate: number;
    temperature: number;
    oxygen_saturation: number;
  };

  fetal_heart_rate: number;
  fetal_movement: FetalMovementStatus;

  contractions: {
    frequency_per_10_minutes: number;
    duration_seconds: number;
    intensity: ContractionIntensity;
  };

  cervical_dilation_cm: number;
  head_descent: HeadDescentLevel;

  membranes: {
    status: MembraneStatus;
    ruptured_at: string | null;
    color: AmnioticFluidColor | null;
  };

  urine: {
    volume_ml: number;
    protein: UrineMarker;
    acetone: UrineMarker;
  };
};

export type LaborMonitoringEntryDto = {
  id: string;
  patient_id: string;

  recorded_at: string;

  vital_signs: {
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
    pulse: number;
    respiratory_rate: number;
    temperature: number;
    oxygen_saturation: number;
  };

  fetal_heart_rate: number;
  fetal_movement: FetalMovementStatus;

  contractions: {
    frequency_per_10_minutes: number;
    duration_seconds: number;
    intensity: ContractionIntensity;
  };

  cervical_dilation_cm: number;
  head_descent: HeadDescentLevel;

  membranes: {
    status: MembraneStatus;
    ruptured_at?: string | null;
    color?: AmnioticFluidColor | null;
  };

  urine: {
    volume_ml: number;
    protein: UrineMarker;
    acetone: UrineMarker;
  };

  risk_score: number;
  risk_category: RiskCategory;
  risk_factors?: string[];
  critical_factors?: string[];

  recorded_by: {
    id: string;
    name: string;
  };
};
