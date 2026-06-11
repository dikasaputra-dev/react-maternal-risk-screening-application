import { useQuery } from "@tanstack/react-query";

import {
  getScreeningHistory,
  type ScreeningHistoryParams,
} from "@/api/screenings.api";
import { env } from "@/config/env";
import { screeningQueryKeys } from "@/features/screenings/constants/screening-query-keys";
import { getScreeningHistoryMock } from "@/features/screenings/api/screening-mock-api";

export function useScreeningHistory(params?: ScreeningHistoryParams) {
  return useQuery({
    queryKey: screeningQueryKeys.history(params),
    queryFn: () => {
      if (env.mock.screenings) {
        return getScreeningHistoryMock(params);
      }

      return getScreeningHistory(params);
    },
  });
}
