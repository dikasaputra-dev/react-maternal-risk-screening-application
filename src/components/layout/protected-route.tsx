import { Navigate, Outlet } from "react-router-dom";

import type { Permission, UserRole } from "@/features/auth/types/auth.type";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasAnyPermission, hasRole } from "@/features/auth/utils/permission";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
};

export function ProtectedRoute({
  allowedRoles,
  requiredPermissions,
}: ProtectedRouteProps) {
  const session = getAuthSession();
  const user = session?.user ?? null;

  if (!session || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(user, allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredPermissions && !hasAnyPermission(user, requiredPermissions)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
