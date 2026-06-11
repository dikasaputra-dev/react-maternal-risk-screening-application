import type { RiskCategory } from "@/features/screenings/types/screening.type";

export type QuizPayloadDto = {
  maternal_age: number;
  gestational_age_weeks: number;
  systolic_bp: number;
  diastolic_bp: number;
  symptoms: {
    bleeding: boolean;
    severe_headache: boolean;
    swollen_hands_face: boolean;
    fever: boolean;
    reduced_fetal_movement: boolean;
  };
};

export type QuizResultDto = {
  token: string;
  risk_score: number;
  risk_category: RiskCategory;
  recommendation: string;
  submitted_at: string;
};
