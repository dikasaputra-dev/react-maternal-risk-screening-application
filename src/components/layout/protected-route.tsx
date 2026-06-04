import type { UserRole } from "@/features/auth/types/auth.type";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const session = getAuthSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles?.includes(session.user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
