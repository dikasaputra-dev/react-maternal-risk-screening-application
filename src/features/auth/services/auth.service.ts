import { loginApi } from "@/api/auth.api";
import { env } from "@/config/env";

import type {
  AuthSession,
  LoginFormValues,
  Permission,
} from "../types/auth.type";

const adminPermissions: Permission[] = [
  "view_dashboard",

  "view_patients",
  "create_patient",
  "update_patient",
  "delete_patient",

  "view_initial_screening",
  "create_initial_screening",
  "update_initial_screening",
  "delete_initial_screening",

  "view_labor_monitoring",
  "create_labor_monitoring",
  "update_labor_monitoring",
  "delete_labor_monitoring",

  "view_clinical_actions",
  "create_clinical_action",
  "update_clinical_action",
  "delete_clinical_action",

  "view_delivery_outcome",
  "create_delivery_outcome",
  "update_delivery_outcome",
  "delete_delivery_outcome",

  "view_newborn_outcome",
  "create_newborn_outcome",
  "update_newborn_outcome",
  "delete_newborn_outcome",

  "view_audit_logs",
  "view_admin_stats",

  "view_screenings",
  "create_screening",
  "view_screening_history",
];

const nursePermissions: Permission[] = [
  "view_dashboard",

  "view_patients",
  "create_patient",

  "view_initial_screening",
  "create_initial_screening",

  "view_labor_monitoring",
  "create_labor_monitoring",

  "view_clinical_actions",
  "create_clinical_action",

  "view_delivery_outcome",
  "create_delivery_outcome",

  "view_newborn_outcome",
  "create_newborn_outcome",

  "view_screenings",
  "create_screening",
  "view_screening_history",
];

function delay(milliseconds = 600) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function loginService(
  values: LoginFormValues,
): Promise<AuthSession> {
  if (!env.mock.auth) {
    return loginApi(values);
  }

  await delay();

  if (!values.email.trim() || !values.password) {
    throw new Error("Email dan password wajib diisi.");
  }

  const normalizedEmail = values.email.trim().toLowerCase();

  if (normalizedEmail === "admin@mail.com") {
    return {
      accessToken: "dummy-admin-access-token",
      refreshToken: "dummy-admin-refresh-token",
      user: {
        id: "admin-1",
        username: "Admin Maternity",
        email: normalizedEmail,
        role: "admin",
        permissions: adminPermissions,
      },
    };
  }

  return {
    accessToken: "dummy-nurse-access-token",
    refreshToken: "dummy-nurse-refresh-token",
    user: {
      id: "nurse-1",
      username: "Ns. Rini",
      email: normalizedEmail,
      role: "nurse",
      permissions: nursePermissions,
    },
  };
}
