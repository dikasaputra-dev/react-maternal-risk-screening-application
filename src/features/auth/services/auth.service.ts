import type {
  AuthSession,
  LoginFormValues,
} from "@/features/auth/types/auth.type";
// import { loginApi } from "@/api/auth.api";

const USE_DUMMY_AUTH = true;

export async function loginService(
  values: LoginFormValues,
): Promise<AuthSession> {
  if (!USE_DUMMY_AUTH) {
    // return loginApi(values);
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
      },
    };
  }

  return {
    accessToken: "dummy-admin-access-token",
    refreshToken: "dummy-admin-refresh-token",
    user: {
      id: "nurse-1",
      username: "Ns. Rini",
      email: values.email,
      role: "nurse",
    },
  };
}
