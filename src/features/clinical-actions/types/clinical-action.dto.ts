import type {
  ClinicalDecisionType,
  MedicationFluidType,
} from "./clinical-action.type";

export type ClinicalActionPayloadDto = {
  recorded_at: string;

  medications_and_fluids: {
    type: MedicationFluidType;
    oxytocin_units: number | null;
  }[];

  clinical_decision: {
    type: ClinicalDecisionType;
    description: string | null;
  };

  laboratory_results: {
    examination_date: string;
    specimen: string;
    result: string;
  }[];
};

export type ClinicalActionDto = {
  id: string;
  patient_id: string;
  recorded_at: string;

  medications_and_fluids: {
    type: MedicationFluidType;
    oxytocin_units?: number | null;
  }[];

  clinical_decision: {
    type: ClinicalDecisionType;
    description?: string | null;
  };

  laboratory_results: {
    id: string;
    examination_date: string;
    specimen: string;
    result: string;
  }[];

  recorded_by: {
    id: string;
    name: string;
  };

  created_at: string;
};
