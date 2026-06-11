import type {
  AuthUserDto,
  LoginResponseDto,
  RoleDto,
} from "@/features/auth/types/auth.dto";
import type {
  AuthSession,
  AuthUser,
  Permission,
  UserRole,
} from "@/features/auth/types/auth.type";

function mapRole(role?: RoleDto): UserRole {
  if (role === "admin" || role === "nurse") {
    return role;
  }

  if (typeof role === "object" && role?.key) {
    return role.key;
  }

  return "nurse";
}

function mapPermissions(dto: AuthUserDto | LoginResponseDto): Permission[] {
  if (Array.isArray(dto.permissions)) {
    return dto.permissions;
  }

  if (typeof dto.role === "object" && Array.isArray(dto.role.permissions)) {
    return dto.role.permissions.map((permission) => permission.key);
  }

  return [];
}

export function mapAuthUserDtoToAuthUser(dto: AuthUserDto): AuthUser {
  return {
    id: dto.id ?? crypto.randomUUID(),
    username: dto.username ?? dto.name ?? dto.email ?? "User",
    email: dto.email ?? "",
    role: mapRole(dto.role),
    permissions: mapPermissions(dto),
  };
}

export function mapLoginResponseToSession(dto: LoginResponseDto): AuthSession {
  const accessToken = dto.access_token ?? dto.access ?? "";
  const refreshToken = dto.refresh_token ?? dto.refresh ?? "";

  const userDto: AuthUserDto = dto.user ?? {
    id: dto.id,
    username: dto.username,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    permissions: dto.permissions,
  };

  return {
    accessToken,
    refreshToken,
    user: mapAuthUserDtoToAuthUser(userDto),
  };
}
