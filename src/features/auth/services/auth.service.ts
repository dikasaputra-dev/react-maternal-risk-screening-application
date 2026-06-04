import type {
  AuthSession,
  LoginFormValues,
} from "@/features/auth/types/auth.type";

const USE_DUMMY_AUTH = true;

export async function loginService(
  values: LoginFormValues,
): Promise<AuthSession> {
  if (!USE_DUMMY_AUTH) {
    throw new Error("Real API mode belum diaktifkan.");
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!values.email || !values.password) {
    throw new Error("Email dan password wajib diisi.");
  }

  if (values.email === "admin@mail.com") {
    return {
      accessToken: "dummy-admin-access-token",
      refreshToken: "dummy-admin-refresh-token",
      user: {
        id: "admin-1",
        username: "Admin Maternity",
        email: values.email,
        role: "admin",
        permissions: [
          "view_dashboard",
          "view_patients",
          "create_patient",
          "update_patient",
          "delete_patient",
          "view_screenings",
          "create_screening",
          "view_screening_history",
          "view_audit_logs",
          "view_admin_stats",
        ],
      },
    };
  }

  return {
    accessToken: "dummy-nurse-access-token",
    refreshToken: "dummy-nurse-refresh-token",
    user: {
      id: "nurse-1",
      username: "Ns. Rini",
      email: values.email,
      role: "nurse",
      permissions: [
        "view_dashboard",
        "view_patients",
        "create_patient",
        "update_patient",
        "view_screenings",
        "create_screening",
        "view_screening_history",
      ],
    },
  };
}
