import type {
  ScreeningDto,
  ScreeningPayloadDto,
} from "@/features/screenings/types/screening.dto";
import type {
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";

export function mapScreeningFormToPayload(
  values: ScreeningFormValues,
): ScreeningPayloadDto {
  return {
    patient_id: values.patientId,
    maternal_age: values.maternalAge,
    gravida: values.gravida,
    partus: values.partus,
    abortus: values.abortus,
    gestational_age_weeks: values.gestationalAgeWeeks,
    systolic_bp: values.systolicBp,
    diastolic_bp: values.diastolicBp,
    estimated_fetal_weight: values.estimatedFetalWeight,
    medical_history: values.medicalHistory,
    checklist_items: values.checklistItems,
  };
}

export function mapScreeningDtoToResult(dto: ScreeningDto): ScreeningResult {
  return {
    riskScore: dto.risk_score,
    riskCategory: dto.risk_category,
  };
}
