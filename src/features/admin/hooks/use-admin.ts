import { useQuery } from "@tanstack/react-query";

import {
  getAdminStats,
  getAuditLogs,
  type AuditLogParams,
} from "@/api/admin.api";
import { env } from "@/config/env";
import { adminQueryKeys } from "@/features/admin/constants/admin-query-keys";
import {
  getAdminStatsMock,
  getAuditLogsMock,
} from "@/features/admin/api/admin-mock-api";

export function useAdminStats() {
  return useQuery({
    queryKey: adminQueryKeys.stats(),
    queryFn: () => {
      if (env.mock.admin) {
        return getAdminStatsMock();
      }

      return getAdminStats();
    },
  });
}

export function useAuditLogs(params?: AuditLogParams) {
  return useQuery({
    queryKey: adminQueryKeys.auditLogs(params),
    queryFn: () => {
      if (env.mock.admin) {
        return getAuditLogsMock(params);
      }

      return getAuditLogs(params);
    },
  });
}
