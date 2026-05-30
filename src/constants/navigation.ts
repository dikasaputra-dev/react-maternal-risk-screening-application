export type NavigationItem = {
  label: string;
  href: string;
};

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Patients",
    href: "/patients",
  },
  {
    label: "Screenings",
    href: "/screenings",
  },
  {
    label: "History",
    href: "/screenings/history",
  },
  {
    label: "Audit Logs",
    href: "/admin/audit-logs",
  },
];
