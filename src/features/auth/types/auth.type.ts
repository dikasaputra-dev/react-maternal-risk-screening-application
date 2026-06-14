export type UserRole = "nurse" | "admin";

export type Permission =
  | "view_dashboard"
  | "view_patients"
  | "create_patient"
  | "update_patient"
  | "delete_patient"
  | "view_initial_screening"
  | "create_initial_screening"
  | "update_initial_screening"
  | "delete_initial_screening"
  | "view_labor_monitoring"
  | "create_labor_monitoring"
  | "update_labor_monitoring"
  | "delete_labor_monitoring"
  | "view_clinical_actions"
  | "create_clinical_action"
  | "update_clinical_action"
  | "delete_clinical_action"
  | "view_delivery_outcome"
  | "create_delivery_outcome"
  | "update_delivery_outcome"
  | "delete_delivery_outcome"
  | "view_newborn_outcome"
  | "create_newborn_outcome"
  | "update_newborn_outcome"
  | "delete_newborn_outcome"
  | "view_audit_logs"
  | "view_admin_stats"
  /**
   * Legacy permissions.
   *
   * Dipertahankan sementara sampai seluruh fitur screening lama
   * selesai dimigrasikan ke patient-centric workflow.
   */
  | "view_screenings"
  | "create_screening"
  | "view_screening_history";

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
