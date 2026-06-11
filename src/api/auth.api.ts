import { apiClient } from "@/api/client";
import {
  mapAuthUserDtoToAuthUser,
  mapLoginResponseToSession,
} from "@/features/auth/mapper/auth.mapper";
import type {
  AuthUserDto,
  LoginResponseDto,
} from "@/features/auth/types/auth.dto";

import type {
  AuthSession,
  AuthUser,
  LoginFormValues,
} from "@/features/auth/types/auth.type";
import { unwrapApiData } from "@/lib/api-response";

export async function loginApi(values: LoginFormValues): Promise<AuthSession> {
  const response = await apiClient.post("/api/auth/login/", values);

  const dto = unwrapApiData<LoginResponseDto>(response.data);

  return mapLoginResponseToSession(dto);
}

export async function getMeApi(): Promise<AuthUser> {
  const response = await apiClient.get("/api/me/");

  const dto = unwrapApiData<AuthUserDto>(response.data);

  return mapAuthUserDtoToAuthUser(dto);
}

export async function logoutApi(refreshToken: string) {
  return apiClient.post("/api/auth/logout/", {
    refresh: refreshToken,
  });
}
