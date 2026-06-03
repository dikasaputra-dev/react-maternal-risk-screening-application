import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";
import type { RiskCategory } from "@/features/screenings/types/screening.type";

function getRiskCategory(score: number): RiskCategory {
  if (score >= 60) return "high_risk";
  if (score >= 30) return "low_risk";
  return "no_risk";
}

export function calculateQuizResult(values: QuizFormValues): QuizResult {
  let score = 0;

  if (values.maternalAge < 20 || values.maternalAge > 35) score += 15;

  if (values.gestationalAgeWeeks < 28) score += 20;
  else if (values.gestationalAgeWeeks < 37) score += 10;
  else if (values.gestationalAgeWeeks > 42) score += 15;

  if (values.systolicBp >= 160 || values.diastolicBp >= 110) score += 30;
  else if (values.systolicBp >= 140 || values.diastolicBp >= 90) score += 15;

  if (values.estimatedFetalWeight < 2000) score += 15;
  if (values.estimatedFetalWeight > 4000) score += 10;

  Object.values(values.medicalHistory).forEach((checked) => {
    if (checked) score += 10;
  });

  const riskScore = Math.min(score, 100);

  return {
    token: crypto.randomUUID(),
    riskScore,
    riskCategory: getRiskCategory(riskScore),
    createdAt: new Date().toISOString(),
  };
}
