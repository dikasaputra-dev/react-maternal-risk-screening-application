export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "LOGIN_FAILED";

export type AuditModelName = "Patient" | "Screening" | "User" | "Auth";

export type AuditLog = {
  id: string;
  userName: string;
  action: AuditAction;
  modelName: AuditModelName;
  objectId?: string;
  ipAddress?: string;
  description: string;
  createdAt: string;
};

export type AdminStats = {
  totalUsers: number;
  totalPatients: number;
  totalScreenings: number;
  highRiskCases: number;
  auditEventsToday: number;
};
