import type {
  DeliveryOutcomeDto,
  DeliveryOutcomePayloadDto,
} from "../types/delivery-outcome.dto";
import type {
  DeliveryOutcome,
  DeliveryOutcomeFormValues,
} from "../types/delivery-outcome.type";

export function mapDeliveryOutcomeFormToPayload(
  values: DeliveryOutcomeFormValues,
): DeliveryOutcomePayloadDto {
  if (!values.outcomeType) {
    throw new Error("Luaran persalinan wajib dipilih.");
  }

  return {
    outcome_type: values.outcomeType,
  };
}

export function mapDeliveryOutcomeDtoToDeliveryOutcome(
  dto: DeliveryOutcomeDto,
): DeliveryOutcome {
  return {
    id: dto.id,
    patientId: dto.patient_id,
    outcomeType: dto.outcome_type,
    recordedAt: dto.recorded_at,

    recordedBy: {
      id: dto.recorded_by.id,
      name: dto.recorded_by.name,
    },

    createdAt: dto.created_at,
  };
}
