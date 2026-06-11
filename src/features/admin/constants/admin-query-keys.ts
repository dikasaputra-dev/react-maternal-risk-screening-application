import type { AuditLogParams } from "@/api/admin.api";

export const adminQueryKeys = {
  all: ["admin"] as const,

  stats: () => [...adminQueryKeys.all, "stats"] as const,

  auditLogs: (params?: AuditLogParams) =>
    [...adminQueryKeys.all, "audit-logs", params] as const,
};
