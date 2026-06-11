import type {
  AuditAction,
  AuditModelName,
} from "@/features/admin/types/admin.type";

export type AdminStatsDto = {
  total_users: number;
  total_patients: number;
  total_screenings: number;
  high_risk_cases: number;
  audit_events_today: number;
};

export type AuditLogDto = {
  id: string;
  user_name?: string;
  action: AuditAction;
  model_name: AuditModelName;
  object_id?: string | null;
  ip_address?: string | null;
  description: string;
  created_at: string;
};
