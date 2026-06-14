import { apiClient } from "./client";

import { mapDashboardStatsDtoToDashboardStats } from "@/features/dashboard/mappers/dashboard-stats.mapper";
import type { DashboardStatsDto } from "@/features/dashboard/types/dashboard-stats.dto";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats.type";
import { unwrapApiData } from "@/lib/api-response";

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get("/api/admin/stats/");

  const dto = unwrapApiData<DashboardStatsDto>(response.data);

  return mapDashboardStatsDtoToDashboardStats(dto);
}
