import type { Permission, UserRole } from "@/features/auth/types/auth.type";

export type RoleDto =
  | UserRole
  | {
      key?: UserRole;
      name?: string;
      permissions?: {
        key: Permission;
        name?: string;
        group?: string;
      }[];
    };

export type AuthUserDto = {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  role?: RoleDto;
  permissions?: Permission[];
};

export type LoginResponseDto = {
  access?: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
  user?: AuthUserDto;
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  role?: RoleDto;
  permissions?: Permission[];
};
