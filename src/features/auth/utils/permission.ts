import type {
  AuthUser,
  Permission,
  UserRole,
} from "@/features/auth/types/auth.type";

export function hasRole(user: AuthUser | null | undefined, roles: UserRole[]) {
  if (!user) return false;

  return roles.includes(user.role);
}

export function hasPermission(
  user: AuthUser | null | undefined,
  permission: Permission,
) {
  if (!user) return false;

  return Array.isArray(user.permissions)
    ? user.permissions.includes(permission)
    : false;
}

export function hasAnyPermission(
  user: AuthUser | null | undefined,
  permissions: Permission[],
) {
  if (!user) return false;

  if (!Array.isArray(user.permissions)) {
    return false;
  }

  return permissions.some((permission) =>
    user.permissions.includes(permission),
  );
}
