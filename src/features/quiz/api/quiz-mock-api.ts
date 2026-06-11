import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";

const STORAGE_KEY = "maternity_quiz_results_mock";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readResults(): Record<string, QuizResult> {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, QuizResult>;
  } catch {
    return {};
  }
}

function writeResults(results: Record<string, QuizResult>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

function calculateQuizResult(values: QuizFormValues) {
  let score = 0;

  if (values.maternalAge < 20 || values.maternalAge > 35) score += 20;
  if (values.gestationalAgeWeeks < 37) score += 10;
  if (values.systolicBp >= 140 || values.diastolicBp >= 90) score += 25;

  if (values.hasBleeding) score += 30;
  if (values.hasSevereHeadache) score += 20;
  if (values.hasSwollenHandsFace) score += 15;
  if (values.hasFever) score += 10;
  if (values.hasReducedFetalMovement) score += 25;

  if (score >= 60) {
    return {
      riskCategory: "high_risk" as const,
      recommendation:
        "Segera hubungi tenaga kesehatan atau fasilitas kesehatan terdekat.",
    };
  }

  if (score >= 30) {
    return {
      riskCategory: "low_risk" as const,
      recommendation:
        "Disarankan berkonsultasi dengan tenaga kesehatan untuk pemeriksaan lanjutan.",
    };
  }

  return {
    riskCategory: "no_risk" as const,
    recommendation:
      "Saat ini tidak terindikasi risiko tinggi berdasarkan jawaban kuis. Tetap lakukan pemeriksaan rutin.",
  };
}

export async function submitQuizMock(
  values: QuizFormValues,
): Promise<QuizResult> {
  await delay();

  const token = crypto.randomUUID();
  const calculated = calculateQuizResult(values);

  const result: QuizResult = {
    token,
    riskScore: Math.min(
      100,
      [
        values.hasBleeding ? 30 : 0,
        values.hasSevereHeadache ? 20 : 0,
        values.hasSwollenHandsFace ? 15 : 0,
        values.hasFever ? 10 : 0,
        values.hasReducedFetalMovement ? 25 : 0,
        values.systolicBp >= 140 || values.diastolicBp >= 90 ? 25 : 0,
        values.maternalAge < 20 || values.maternalAge > 35 ? 20 : 0,
        values.gestationalAgeWeeks < 37 ? 10 : 0,
      ].reduce((total, value) => total + value, 0),
    ),
    riskCategory: calculated.riskCategory,
    recommendation: calculated.recommendation,
    submittedAt: new Date().toISOString(),
  };

  const results = readResults();

  writeResults({
    ...results,
    [token]: result,
  });

  return result;
}

export async function getQuizResultMock(token: string): Promise<QuizResult> {
  await delay();

  const result = readResults()[token];

  if (!result) {
    throw new Error("Hasil kuis tidak ditemukan.");
  }

  return result;
}
