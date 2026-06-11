import { apiClient } from "@/api/client";
import {
  mapQuizFormToPayload,
  mapQuizResultDtoToResult,
} from "@/features/quiz/mapper/quiz.mapper";
import type { QuizResultDto } from "@/features/quiz/types/quiz.dto";
import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";
import { unwrapApiData } from "@/lib/api-response";

export async function submitQuiz(values: QuizFormValues): Promise<QuizResult> {
  const payload = mapQuizFormToPayload(values);

  const response = await apiClient.post("/api/quiz/submit/", payload);

  const dto = unwrapApiData<QuizResultDto>(response.data);

  return mapQuizResultDtoToResult(dto);
}

export async function getQuizResult(token: string): Promise<QuizResult> {
  const response = await apiClient.get(`/api/quiz/results/${token}/`);

  const dto = unwrapApiData<QuizResultDto>(response.data);

  return mapQuizResultDtoToResult(dto);
}
