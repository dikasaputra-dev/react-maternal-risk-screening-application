import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";
import { calculateQuizRisk } from "@/features/quiz/utils/quiz-calculator";

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

export async function submitQuizMock(
  values: QuizFormValues,
): Promise<QuizResult> {
  await delay();

  const token = crypto.randomUUID();
  const calculated = calculateQuizRisk(values);

  const result: QuizResult = {
    token,
    riskScore: calculated.riskScore,
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
