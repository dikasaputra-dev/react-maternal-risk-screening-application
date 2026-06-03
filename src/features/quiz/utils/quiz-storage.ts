import type { QuizResult } from "@/features/quiz/types/quiz.type";

const STORAGE_KEY = "public_quiz_results";

export function saveQuizResult(result: QuizResult) {
  const existing = getQuizResults();

  localStorage.setItem(STORAGE_KEY, JSON.stringify([result, ...existing]));
}

export function getQuizResults(): QuizResult[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as QuizResult[];
  } catch {
    return [];
  }
}

export function getQuizResultByToken(token: string) {
  return getQuizResults().find((item) => item.token === token) ?? null;
}
