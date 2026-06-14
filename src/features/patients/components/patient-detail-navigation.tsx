import { NavLink } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type {
  PatientWorkflowItemStatus,
  PatientWorkflowStatus,
} from "../types/patient-workflow.type";
import { getPatientWorkflowNavigation } from "../utils/patient-workflow";

type PatientDetailNavigationProps = {
  patientId: string;
  workflow: PatientWorkflowStatus;
};

const workflowStatusConfig: Record<
  PatientWorkflowItemStatus,
  {
    label: string;
    variant: "default" | "info" | "success";
  }
> = {
  not_started: {
    label: "Belum Dimulai",
    variant: "default",
  },
  in_progress: {
    label: "Berjalan",
    variant: "info",
  },
  completed: {
    label: "Selesai",
    variant: "success",
  },
};

export function PatientDetailNavigation({
  patientId,
  workflow,
}: PatientDetailNavigationProps) {
  const navigationItems = getPatientWorkflowNavigation(patientId, workflow);

  return (
    <nav
      aria-label="Menu pelayanan pasien"
      className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"
    >
      <div className="flex min-w-max">
        {navigationItems.map((item) => {
          const statusConfig = workflowStatusConfig[item.status];

          return (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex min-w-48 items-center justify-between gap-3 border-b-2 px-4 py-4 text-sm font-medium transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
                  isActive
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )
              }
            >
              <span>{item.label}</span>

              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
