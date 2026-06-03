import type {
  MedicalHistoryKey,
  RiskCategory,
} from "@/features/screenings/types/screening.type";

export type QuizFormValues = {
  maternalAge: number;
  gestationalAgeWeeks: number;
  systolicBp: number;
  diastolicBp: number;
  estimatedFetalWeight: number;
  medicalHistory: Record<MedicalHistoryKey, boolean>;
};

export type QuizResult = {
  token: string;
  riskScore: number;
  riskCategory: RiskCategory;
  createdAt: string;
};
