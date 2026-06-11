import type { RiskCategory } from "@/features/screenings/types/screening.type";

export type MedicalHistoryDto = Record<string, boolean>;
export type ChecklistItemsDto = Record<string, boolean>;

export type ScreeningPayloadDto = {
  patient_id: string;
  maternal_age: number;
  gravida: number;
  partus: number;
  abortus: number;
  gestational_age_weeks: number;
  systolic_bp: number;
  diastolic_bp: number;
  estimated_fetal_weight: number;
  medical_history: MedicalHistoryDto;
  checklist_items: ChecklistItemsDto;
};

export type ScreeningDto = {
  id: string;
  patient_id: string;
  patient_name?: string;
  nurse_id?: string;
  nurse_name?: string;
  maternal_age: number;
  gravida: number;
  partus: number;
  abortus: number;
  gestational_age_weeks: number;
  systolic_bp: number;
  diastolic_bp: number;
  estimated_fetal_weight: number;
  medical_history: MedicalHistoryDto;
  checklist_items: ChecklistItemsDto;
  risk_score: number;
  risk_category: RiskCategory;
  created_at?: string;
};
