import type { RiskCategory } from "@/features/screenings/types/screening.type";

export type QuizFormValues = {
  maternalAge: number;
  gestationalAgeWeeks: number;
  systolicBp: number;
  diastolicBp: number;
  hasBleeding: boolean;
  hasSevereHeadache: boolean;
  hasSwollenHandsFace: boolean;
  hasFever: boolean;
  hasReducedFetalMovement: boolean;
};

export type QuizResult = {
  token: string;
  riskScore: number;
  riskCategory: RiskCategory;
  recommendation: string;
  submittedAt: string;
};
