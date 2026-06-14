import { Navigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { PatientWorkflowPlaceholder } from "@/features/patients/components/patient-workflow-placeholder";
import { patientRoutes } from "@/features/patients/constants/patient-routes";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";

export function LaborMonitoringPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const workflowQuery = usePatientWorkflow(patientId);

  const session = getAuthSession();

  const canCreate = hasPermission(session?.user, "create_labor_monitoring");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Pemantauan persalinan tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (workflowQuery.isLoading) {
    return <TableSkeleton rows={4} columns={6} />;
  }

  if (workflowQuery.isError || !workflowQuery.data) {
    return (
      <ErrorState
        title="Status pemantauan gagal dimuat"
        description="Status pelayanan pasien tidak tersedia."
      />
    );
  }

  if (!workflowQuery.data.hasInitialScreening) {
    return <Navigate to={patientRoutes.initialScreening(patientId)} replace />;
  }

  return (
    <PatientWorkflowPlaceholder
      title="Pemantauan Persalinan"
      description="Pencatatan berkala kondisi ibu dan janin selama proses persalinan."
      canCreate={canCreate}
      createLabel="Form tambah pemantauan"
    />
  );
}
