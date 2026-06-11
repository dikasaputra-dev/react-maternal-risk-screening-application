import type { ScreeningHistoryParams } from "@/api/screenings.api";

export const screeningQueryKeys = {
  all: ["screenings"] as const,

  history: (params?: ScreeningHistoryParams) =>
    [...screeningQueryKeys.all, "history", params] as const,
};
