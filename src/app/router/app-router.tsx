import { ProtectedRoute } from "@/components/layout/protected-route";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PublicLayout } from "@/layouts/public-layout";
import { AuditLogsPage } from "@/pages/audit-logs";
import { DashboardPage } from "@/pages/dashboard-page";
import { LoginPage } from "@/pages/login-page";
import { PatientsPage } from "@/pages/patients-page";
import { QuizPage } from "@/pages/quiz-page";
import { QuizResultPage } from "@/pages/quiz-result-page";
import { ScreeningHistoryPage } from "@/pages/screenings-history-page";
import { ScreeningsPage } from "@/pages/screenings-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "quiz/results/:token",
        element: <QuizResultPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute
        allowedRoles={["nurse", "admin"]}
        requiredPermissions={["view_dashboard"]}
      />
    ),
    children: [
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
        ],
      },
    ],
  },
  {
    element: (
      <ProtectedRoute
        allowedRoles={["admin"]}
        requiredPermissions={["view_audit_logs"]}
      />
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin/audit-logs",
            element: <AuditLogsPage />,
          },
        ],
      },
    ],
  },
]);
