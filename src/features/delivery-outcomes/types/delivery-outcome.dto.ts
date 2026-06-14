import type { DeliveryOutcomeType } from "./delivery-outcome.type";

export type DeliveryOutcomePayloadDto = {
  outcome_type: DeliveryOutcomeType;
};

export type DeliveryOutcomeDto = {
  id: string;
  patient_id: string;
  outcome_type: DeliveryOutcomeType;
  recorded_at: string;

  recorded_by: {
    id: string;
    name: string;
  };

  created_at: string;
};
