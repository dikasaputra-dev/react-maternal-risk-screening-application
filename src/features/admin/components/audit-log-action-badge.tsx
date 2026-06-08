import { Badge } from "@/components/ui/badge";
import type { AuditAction } from "@/features/admin/types/admin.type";

type AuditLogActionBadgeProps = {
  action: AuditAction;
};

const actionMap: Record<
  AuditAction,
  {
    label: string;
    variant: "default" | "success" | "warning" | "danger" | "info";
  }
> = {
  CREATE: {
    label: "Create",
    variant: "success",
  },
  UPDATE: {
    label: "Update",
    variant: "info",
  },
  DELETE: {
    label: "Delete",
    variant: "danger",
  },
  LOGIN: {
    label: "Login",
    variant: "success",
  },
  LOGOUT: {
    label: "Logout",
    variant: "default",
  },
  LOGIN_FAILED: {
    label: "Login Failed",
    variant: "warning",
  },
};

export function AuditLogActionBadge({ action }: AuditLogActionBadgeProps) {
  const config = actionMap[action];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
