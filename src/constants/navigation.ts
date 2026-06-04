import type { Permission, UserRole } from "@/features/auth/types/auth.type";

export type NavigationItem = {
  label: string;
  href: string;
  allowedRoles?: UserRole[];
  requiredPermission?: Permission;
};

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    requiredPermission: "view_dashboard",
  },
  {
    label: "Patients",
    href: "/patients",
    requiredPermission: "view_patients",
  },
  {
    label: "Screenings",
    href: "/screenings",
    requiredPermission: "view_screenings",
  },
  {
    label: "History",
    href: "/screenings/history",
    requiredPermission: "view_screening_history",
  },
  {
    label: "Audit Logs",
    href: "/admin/audit-logs",
    allowedRoles: ["admin"],
    requiredPermission: "view_audit_logs",
  },
  {
    label: "Public Quiz",
    href: "/quiz",
  },
];
