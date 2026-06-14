import type { AuthUser, Permission, UserRole } from "../types/auth.type";

export function hasRole(
  user: AuthUser | null | undefined,
  roles: readonly UserRole[],
) {
  if (!user) {
    return false;
  }

  return roles.includes(user.role);
}

export function hasPermission(
  user: AuthUser | null | undefined,
  permission: Permission,
) {
  if (!user) {
    return false;
  }

  if (!Array.isArray(user.permissions)) {
    return false;
  }

  return user.permissions.includes(permission);
}

export function hasAnyPermission(
  user: AuthUser | null | undefined,
  permissions: readonly Permission[],
) {
  if (!user) {
    return false;
  }

  if (!Array.isArray(user.permissions)) {
    return false;
  }

  return permissions.some((permission) =>
    user.permissions.includes(permission),
  );
}

export function hasEveryPermission(
  user: AuthUser | null | undefined,
  permissions: readonly Permission[],
) {
  if (!user) {
    return false;
  }

  if (!Array.isArray(user.permissions)) {
    return false;
  }

  return permissions.every((permission) =>
    user.permissions.includes(permission),
  );
}

export function isAdmin(user: AuthUser | null | undefined) {
  return user?.role === "admin";
}

export function isNurse(user: AuthUser | null | undefined) {
  return user?.role === "nurse";
}
