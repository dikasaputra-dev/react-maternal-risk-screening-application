import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type {
  ScreeningDto,
  ScreeningHistoryDto,
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

export function mapScreeningHistoryDtoToHistory(
  dto: ScreeningHistoryDto,
): ScreeningHistory {
  return {
    id: dto.id,
    patientId: dto.patient_id,
    patientName: dto.patient_name ?? "-",
    nurseName: dto.nurse_name ?? "-",
    screeningDate: dto.screening_date ?? dto.created_at?.slice(0, 10) ?? "-",
    maternalAge: dto.maternal_age,
    gestationalAgeWeeks: dto.gestational_age_weeks,
    riskScore: dto.risk_score,
    riskCategory: dto.risk_category,
  };
}

export function mapScreeningHistoryDtosToHistories(
  dtos: ScreeningHistoryDto[],
) {
  return dtos.map(mapScreeningHistoryDtoToHistory);
}
