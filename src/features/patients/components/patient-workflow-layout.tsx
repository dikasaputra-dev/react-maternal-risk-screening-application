import { Link, Outlet, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";

import { PatientDetailNavigation } from "./patient-detail-navigation";
import { PatientProfileCard } from "./patient-profile-card";
import { patientRoutes } from "../constants/patient-routes";
import { usePatient } from "../hooks/use-patient";
import { usePatientWorkflow } from "../hooks/use-patient-workflow";

export function PatientWorkflowLayout() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const patientQuery = usePatient(patientId);

  const workflowQuery = usePatientWorkflow(patientId);

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Route pasien tidak memiliki ID yang dapat digunakan."
      />
    );
  }

  if (patientQuery.isLoading || workflowQuery.isLoading) {
    return (
      <div role="status" aria-live="polite" className="space-y-6">
        <span className="sr-only">Memuat detail pasien...</span>

        <TableSkeleton rows={3} columns={4} />

        <TableSkeleton rows={4} columns={4} />
      </div>
    );
  }

  if (
    patientQuery.isError ||
    workflowQuery.isError ||
    !patientQuery.data ||
    !workflowQuery.data
  ) {
    return (
      <ErrorState
        title="Detail pasien gagal dimuat"
        description="Data pasien atau status pelayanan tidak tersedia."
        action={
          <Link
            to={patientRoutes.list}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Kembali ke Patients
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to={patientRoutes.list}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          ← Kembali ke Data Pasien
        </Link>
      </div>

      <PatientProfileCard patient={patientQuery.data} />

      <PatientDetailNavigation
        patientId={patientId}
        workflow={workflowQuery.data}
      />

      <Outlet />
    </div>
  );
}
