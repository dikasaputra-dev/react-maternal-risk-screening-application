import { DashboardLayout } from "@/layouts/dashboard-layout";
import { AuditLogsPage } from "@/pages/audit-logs";
import { DashboardPage } from "@/pages/dashboard-page";
import { PatientsPage } from "@/pages/patients-page";
import { ScreeningHistoryPage } from "@/pages/screenings-history-page";
import { ScreeningsPage } from "@/pages/screenings-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/patients",
        element: <PatientsPage />,
      },
      {
        path: "/screenings",
        element: <ScreeningsPage />,
      },
      {
        path: "/screenings/history",
        element: <ScreeningHistoryPage />,
      },
      {
        path: "/admin/audit-logs",
        element: <AuditLogsPage />,
      },
    ],
  },
]);
