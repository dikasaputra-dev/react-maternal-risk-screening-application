import { unwrapApiData, unwrapApiList } from "@/lib/api-response";
import {
  mapAdminStatsDtoToStats,
  mapAuditLogDtosToAuditLogs,
} from "@/features/admin/mappers/admin.mapper";
import type {
  AdminStatsDto,
  AuditLogDto,
} from "@/features/admin/types/admin.dto";
import type {
  AdminStats,
  AuditAction,
  AuditLog,
  AuditModelName,
} from "@/features/admin/types/admin.type";
import { apiClient } from "@/api/client";

export type AuditLogParams = {
  search?: string;
  action?: "all" | AuditAction;
  model?: "all" | AuditModelName;
  startDate?: string;
  endDate?: string;
};

export async function getAdminStats(): Promise<AdminStats> {
  const response = await apiClient.get("/api/admin/stats/");

  const dto = unwrapApiData<AdminStatsDto>(response.data);

  return mapAdminStatsDtoToStats(dto);
}

export async function getAuditLogs(
  params?: AuditLogParams,
): Promise<AuditLog[]> {
  const response = await apiClient.get("/api/admin/audit-logs/", {
    params: {
      search: params?.search,
      action: params?.action === "all" ? undefined : params?.action,
      model: params?.model === "all" ? undefined : params?.model,
      start_date: params?.startDate,
      end_date: params?.endDate,
    },
  });

  const dtos = unwrapApiList<AuditLogDto>(response.data);

  return mapAuditLogDtosToAuditLogs(dtos);
}
