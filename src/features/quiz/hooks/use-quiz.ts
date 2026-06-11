import { useMutation, useQuery } from "@tanstack/react-query";

import { getQuizResult, submitQuiz } from "@/api/quiz.api";
import { env } from "@/config/env";
import type { QuizFormValues } from "@/features/quiz/types/quiz.type";
import {
  getQuizResultMock,
  submitQuizMock,
} from "@/features/quiz/api/quiz-mock-api";

export const quizQueryKeys = {
  all: ["quiz"] as const,
  result: (token: string) => [...quizQueryKeys.all, "result", token] as const,
};

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: (values: QuizFormValues) => {
      if (env.mock.quiz) {
        return submitQuizMock(values);
      }

      return submitQuiz(values);
    },
  });
}

export function useQuizResult(token: string | undefined) {
  return useQuery({
    queryKey: quizQueryKeys.result(token ?? ""),
    queryFn: () => {
      if (!token) {
        throw new Error("Token hasil kuis tidak valid.");
      }

      if (env.mock.quiz) {
        return getQuizResultMock(token);
      }

      return getQuizResult(token);
    },
    enabled: Boolean(token),
  });
}
