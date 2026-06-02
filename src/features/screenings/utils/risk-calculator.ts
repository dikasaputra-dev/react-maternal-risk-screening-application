import type {
  RiskCategory,
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";

function getRiskCategory(score: number): RiskCategory {
  if (score >= 60) return "high_risk";
  if (score >= 30) return "low_risk";
  return "no_risk";
}

export function calculateRisk(values: ScreeningFormValues): ScreeningResult {
  let score = 0;

  if (values.maternalAge < 20 || values.maternalAge > 35) score += 15;
  if (values.gravida === 1 || values.gravida >= 5) score += 10;
  if (values.partus >= 4) score += 10;
  if (values.abortus >= 2) score += 10;

  if (values.gestationalAgeWeeks < 28) score += 20;
  else if (values.gestationalAgeWeeks < 37) score += 10;
  else if (values.gestationalAgeWeeks > 42) score += 15;

  if (values.systolicBp >= 160 || values.diastolicBp >= 110) score += 30;
  else if (values.systolicBp >= 140 || values.diastolicBp >= 90) score += 15;

  if (values.estimatedFetalWeight < 2000) score += 15;
  if (values.estimatedFetalWeight > 4000) score += 10;

  Object.values(values.medicalHistory).forEach((hasHistory) => {
    if (hasHistory) score += 10;
  });

  return {
    riskScore: Math.min(score, 100),
    riskCategory: getRiskCategory(score),
  };
}
