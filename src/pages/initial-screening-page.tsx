import { Navigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { PatientWorkflowPlaceholder } from "@/features/patients/components/patient-workflow-placeholder";
import { patientRoutes } from "@/features/patients/constants/patient-routes";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";

export function InitialScreeningPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const workflowQuery = usePatientWorkflow(patientId);

  const session = getAuthSession();

  const canCreate = hasPermission(session?.user, "create_initial_screening");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Skrining awal tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (workflowQuery.isLoading) {
    return <TableSkeleton rows={4} columns={4} />;
  }

  if (workflowQuery.isError || !workflowQuery.data) {
    return (
      <ErrorState
        title="Status skrining gagal dimuat"
        description="Status skrining awal pasien tidak tersedia."
      />
    );
  }

  if (workflowQuery.data.hasInitialScreening) {
    return <Navigate to={patientRoutes.laborMonitoring(patientId)} replace />;
  }

  return (
    <PatientWorkflowPlaceholder
      title="Skrining Awal"
      description="Pengkajian awal pasien sebelum memasuki tahap pemantauan persalinan."
      canCreate={canCreate}
      createLabel="Form skrining awal"
    />
  );
}
