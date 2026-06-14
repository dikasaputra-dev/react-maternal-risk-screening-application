import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "@/api/dashboard.api";
import { env } from "@/config/env";

import { getDashboardStatsMock } from "../api/dashboard-stats-mock-api";
import { dashboardQueryKeys } from "../constants/dashboard-query-keys";

export function useDashboardStats(enabled = true) {
  return useQuery({
    queryKey: dashboardQueryKeys.stats(),

    queryFn: () => {
      if (env.mock.patients) {
        return getDashboardStatsMock();
      }

      return getDashboardStats();
    },

    enabled,

    staleTime: 30_000,
  });
}
