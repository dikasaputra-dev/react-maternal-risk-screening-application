import { Navigate, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "@/components/layout/protected-route";
import { PatientWorkflowLayout } from "@/features/patients/components/patient-workflow-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PublicLayout } from "@/layouts/public-layout";
import { AuditLogsPage } from "@/pages/audit-logs-page";
import { ClinicalActionsPage } from "@/pages/clinical-actions-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { DeliveryOutcomePage } from "@/pages/delivery-outcome-page";
import { InitialScreeningPage } from "@/pages/initial-screening-page";
import { LaborMonitoringPage } from "@/pages/labor-monitoring-page";
import { LoginPage } from "@/pages/login-page";
import { NewbornOutcomePage } from "@/pages/newborn-outcome-page";
import { PatientsPage } from "@/pages/patients-page";
import { PatientWorkflowRedirect } from "@/pages/patient-workflow-redirect";
import { QuizPage } from "@/pages/quiz-page";
import { QuizResultPage } from "@/pages/quiz-result-page";

export const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/quiz/results/:token",
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
            path: "/patients/:patientId",
            element: <PatientWorkflowLayout />,
            children: [
              {
                index: true,
                element: <PatientWorkflowRedirect />,
              },
              {
                path: "screening",
                element: <InitialScreeningPage />,
              },
              {
                path: "monitoring",
                element: <LaborMonitoringPage />,
              },
              {
                path: "actions",
                element: <ClinicalActionsPage />,
              },
              {
                path: "delivery-outcome",
                element: <DeliveryOutcomePage />,
              },
              {
                path: "newborn-outcome",
                element: <NewbornOutcomePage />,
              },
            ],
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

  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
