import type { RiskCategory } from "@/features/screenings/types/screening.type";

export type ScreeningHistory = {
  id: string;
  patientName: string;
  nurseName: string;
  screeningDate: string;
  maternalAge: number;
  gestationalAgeWeeks: number;
  riskScore: number;
  riskCategory: RiskCategory;
};
