import { apiClient } from "@/api/client";

import type {
  AuthSession,
  LoginFormValues,
} from "@/features/auth/types/auth.type";

type LoginApiResponse = {
  access: string;
  refresh: string;
  user: AuthSession["user"];
};

export async function loginApi(values: LoginFormValues): Promise<AuthSession> {
  const response = await apiClient.post<LoginApiResponse>(
    "/api/auth/login/",
    values,
  );

  return {
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
    user: response.data.user,
  };
}

export async function logoutApi(refreshToken: string) {
  return apiClient.post("/api/auth/logout", {
    refresh: refreshToken,
  });
}
