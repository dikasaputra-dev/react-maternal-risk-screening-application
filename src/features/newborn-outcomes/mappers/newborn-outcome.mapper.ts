import type {
  NewbornOutcomeDto,
  NewbornOutcomePayloadDto,
} from "../types/newborn-outcome.dto";
import type {
  NewbornOutcome,
  NewbornOutcomeFormValues,
} from "../types/newborn-outcome.type";

export function mapNewbornOutcomeFormToPayload(
  values: NewbornOutcomeFormValues,
): NewbornOutcomePayloadDto {
  if (!values.outcomeType) {
    throw new Error(
      "Luaran kelahiran bayi wajib dipilih.",
    );
  }

  if (values.outcomeType === "apgar") {
    if (
      typeof values.apgarScore !==
      "number"
    ) {
      throw new Error(
        "APGAR Score wajib diisi.",
      );
    }

    return {
      outcome_type: "apgar",
      apgar_score: values.apgarScore,
    };
  }

  return {
    outcome_type:
      values.outcomeType,
    apgar_score: null,
  };
}

export function mapNewbornOutcomeDtoToNewbornOutcome(
  dto: NewbornOutcomeDto,
): NewbornOutcome {
  const baseOutcome = {
    id: dto.id,
    patientId: dto.patient_id,
    recordedAt: dto.recorded_at,

    recordedBy: {
      id: dto.recorded_by.id,
      name: dto.recorded_by.name,
    },

    createdAt: dto.created_at,
  };

  if (dto.outcome_type === "apgar") {
    if (
      typeof dto.apgar_score !==
      "number"
    ) {
      throw new Error(
        "Response APGAR Score dari server tidak valid.",
      );
    }

    return {
      ...baseOutcome,
      outcomeType: "apgar",
      apgarScore: dto.apgar_score,
    };
  }

  return {
    ...baseOutcome,
    outcomeType: dto.outcome_type,
    apgarScore: null,
  };
}