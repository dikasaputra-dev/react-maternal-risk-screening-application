import type {
  ClinicalActionDto,
  ClinicalActionPayloadDto,
} from "../types/clinical-action.dto";
import type {
  ClinicalAction,
  ClinicalActionFormValues,
} from "../types/clinical-action.type";

export function mapClinicalActionFormToPayload(
  values: ClinicalActionFormValues,
): ClinicalActionPayloadDto {
  const medicationsAndFluids = values.selectedMedicationFluidTypes.map(
    (type) => ({
      type,
      oxytocin_units: type === "oxytocin_drip" ? values.oxytocinUnits : null,
    }),
  );

  const description = values.clinicalDecision.description.trim();

  return {
    recorded_at: new Date(values.recordedAt).toISOString(),

    medications_and_fluids: medicationsAndFluids,

    clinical_decision: {
      type: values.clinicalDecision.type,
      description:
        values.clinicalDecision.type === "procedure" && description
          ? description
          : null,
    },

    laboratory_results: values.laboratoryResults.map((laboratoryResult) => ({
      examination_date: laboratoryResult.examinationDate,
      specimen: laboratoryResult.specimen.trim(),
      result: laboratoryResult.result.trim(),
    })),
  };
}

export function mapClinicalActionDtoToClinicalAction(
  dto: ClinicalActionDto,
): ClinicalAction {
  return {
    id: dto.id,
    patientId: dto.patient_id,
    recordedAt: dto.recorded_at,

    medicationsAndFluids: dto.medications_and_fluids.map((item) => ({
      type: item.type,
      oxytocinUnits: item.oxytocin_units ?? null,
    })),

    clinicalDecision: {
      type: dto.clinical_decision.type,
      description: dto.clinical_decision.description ?? null,
    },

    laboratoryResults: dto.laboratory_results.map((laboratoryResult) => ({
      id: laboratoryResult.id,
      examinationDate: laboratoryResult.examination_date,
      specimen: laboratoryResult.specimen,
      result: laboratoryResult.result,
    })),

    recordedBy: {
      id: dto.recorded_by.id,
      name: dto.recorded_by.name,
    },

    createdAt: dto.created_at,
  };
}

export function mapClinicalActionDtosToClinicalActions(
  dtos: ClinicalActionDto[],
) {
  return dtos.map(mapClinicalActionDtoToClinicalAction);
}
