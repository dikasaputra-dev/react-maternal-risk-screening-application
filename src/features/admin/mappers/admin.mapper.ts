import type { AdminStats, AuditLog } from "@/features/admin/types/admin.type";
import type {
  AdminStatsDto,
  AuditLogDto,
} from "@/features/admin/types/admin.dto";

export function mapAdminStatsDtoToStats(dto: AdminStatsDto): AdminStats {
  return {
    totalUsers: dto.total_users,
    totalPatients: dto.total_patients,
    totalScreenings: dto.total_screenings,
    highRiskCases: dto.high_risk_cases,
    auditEventsToday: dto.audit_events_today,
  };
}

export function mapAuditLogDtoToAuditLog(dto: AuditLogDto): AuditLog {
  return {
    id: dto.id,
    userName: dto.user_name ?? "Unknown",
    action: dto.action,
    modelName: dto.model_name,
    objectId: dto.object_id ?? undefined,
    ipAddress: dto.ip_address ?? undefined,
    description: dto.description,
    createdAt: dto.created_at.slice(0, 10),
  };
}

export function mapAuditLogDtosToAuditLogs(dtos: AuditLogDto[]) {
  return dtos.map(mapAuditLogDtoToAuditLog);
}
