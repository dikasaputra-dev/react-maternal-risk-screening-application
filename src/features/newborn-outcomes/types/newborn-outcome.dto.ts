import type { NewbornOutcomeType } from "./newborn-outcome.type";

export type NewbornOutcomePayloadDto = {
  outcome_type: NewbornOutcomeType;
  apgar_score: number | null;
};

export type NewbornOutcomeDto = {
  id: string;
  patient_id: string;

  outcome_type: NewbornOutcomeType;
  apgar_score?: number | null;

  recorded_at: string;

  recorded_by: {
    id: string;
    name: string;
  };

  created_at: string;
};
