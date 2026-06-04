export type UserRole = "nurse" | "admin";

export type Permission =
  | "view_dashboard"
  | "view_patients"
  | "create_patient"
  | "update_patient"
  | "delete_patient"
  | "view_screenings"
  | "create_screening"
  | "view_screening_history"
  | "view_audit_logs"
  | "view_admin_stats";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
