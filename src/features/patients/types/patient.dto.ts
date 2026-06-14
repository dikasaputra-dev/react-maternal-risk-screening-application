import type {
  RiskCategory,
  RiskSource,
} from "@/features/clinical-risk/types/risk.type";

import type { EducationLevel, Religion } from "./patient.type";

export type PatientRiskSummaryDto = {
  score: number;
  category: RiskCategory;
  source: RiskSource;
  assessed_at: string;
};

export type PatientDto = {
  id: string;
  full_name: string;
  date_of_birth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;
  latest_risk?: PatientRiskSummaryDto | null;
  created_at: string;
  updated_at: string;
};

export type PatientPayloadDto = {
  full_name: string;
  date_of_birth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;
};
