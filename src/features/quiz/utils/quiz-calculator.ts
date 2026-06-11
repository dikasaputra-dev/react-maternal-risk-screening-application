import type { QuizFormValues } from "../types/quiz.type";

export function calculateQuizScore(values: QuizFormValues) {
  let score = 0;

  if (values.maternalAge < 20 || values.maternalAge > 35) {
    score += 20;
  }

  if (values.gestationalAgeWeeks < 37) {
    score += 10;
  }

  if (values.systolicBp >= 140 || values.diastolicBp >= 90) {
    score += 25;
  }

  if (values.hasBleeding) score += 30;
  if (values.hasSevereHeadache) score += 20;
  if (values.hasSwollenHandsFace) score += 15;
  if (values.hasFever) score += 10;
  if (values.hasReducedFetalMovement) score += 25;

  return Math.min(100, score);
}

export function calculateQuizRisk(values: QuizFormValues) {
  const riskScore = calculateQuizScore(values);

  if (riskScore >= 60) {
    return {
      riskScore,
      riskCategory: "high_risk" as const,
      recommendation:
        "Segera hubungi tenaga kesehatan atau fasilitas kesehatan terdekat.",
    };
  }

  if (riskScore >= 30) {
    return {
      riskScore,
      riskCategory: "low_risk" as const,
      recommendation:
        "Disarankan berkonsultasi dengan tenaga kesehatan untuk pemeriksaan lanjutan.",
    };
  }

  return {
    riskScore,
    riskCategory: "no_risk" as const,
    recommendation:
      "Saat ini tidak terindikasi risiko tinggi berdasarkan jawaban kuis. Tetap lakukan pemeriksaan rutin.",
  };
}
