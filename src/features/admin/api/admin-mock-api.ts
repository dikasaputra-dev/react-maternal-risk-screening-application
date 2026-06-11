import type { AuditLogParams } from "@/api/admin.api";
import {
  adminStatsMock,
  auditLogsMock,
} from "@/features/admin/data/admin.mock";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAdminStatsMock() {
  await delay();

  return adminStatsMock;
}

export async function getAuditLogsMock(params?: AuditLogParams) {
  await delay();

  return auditLogsMock.filter((log) => {
    const keyword = params?.search?.toLowerCase() ?? "";

    const matchSearch =
      !keyword ||
      log.userName.toLowerCase().includes(keyword) ||
      log.description.toLowerCase().includes(keyword) ||
      log.ipAddress?.toLowerCase().includes(keyword) ||
      log.objectId?.toLowerCase().includes(keyword);

    const matchAction =
      !params?.action ||
      params.action === "all" ||
      log.action === params.action;

    const matchModel =
      !params?.model ||
      params.model === "all" ||
      log.modelName === params.model;

    const matchStartDate =
      !params?.startDate || log.createdAt >= params.startDate;

    const matchEndDate = !params?.endDate || log.createdAt <= params.endDate;

    return (
      matchSearch && matchAction && matchModel && matchStartDate && matchEndDate
    );
  });
}
