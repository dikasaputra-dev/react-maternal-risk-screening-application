import { apiClient } from "@/api/client";
import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";

export async function submitQuiz(values: QuizFormValues) {
  const response = await apiClient.post<QuizResult>("/api/quiz/submit", values);

  return response.data;
}

export async function getQuizResult(token: string) {
  const response = await apiClient.get<QuizResult>(
    `/api/quiz/results/${token}`,
  );

  return response.data;
}
