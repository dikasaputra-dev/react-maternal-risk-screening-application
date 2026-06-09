import { apiClient } from "@/api/client";

import type {
  AuthSession,
  AuthUser,
  LoginFormValues,
} from "@/features/auth/types/auth.type";
import { unwrapApiData } from "@/lib/api-response";

type LoginResponseDto = {
  access?: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
  user?: AuthUser;
  role?: AuthUser["role"];
  permissions?: AuthUser["permissions"];
  id?: string;
  username?: string;
  email?: string;
};

function mapLoginResponse(dto: LoginResponseDto): AuthSession {
  const accessToken = dto.access_token ?? dto.access ?? "";
  const refreshToken = dto.refresh_token ?? dto.refresh ?? "";

  const user: AuthUser = dto.user ?? {
    id: dto.id ?? crypto.randomUUID(),
    username: dto.username ?? dto.email ?? "User",
    email: dto.email ?? "",
    role: dto.role ?? "nurse",
    permissions: dto.permissions ?? [],
  };

  return {
    accessToken,
    refreshToken,
    user,
  };
}

export async function loginApi(values: LoginFormValues): Promise<AuthSession> {
  const response = await apiClient.post("/api/auth/login/", values);

  const dto = unwrapApiData<LoginResponseDto>(response.data);

  return mapLoginResponse(dto);
}

export async function logoutApi(refreshToken: string) {
  return apiClient.post("/api/auth/logout/", {
    refresh: refreshToken,
  });
}
