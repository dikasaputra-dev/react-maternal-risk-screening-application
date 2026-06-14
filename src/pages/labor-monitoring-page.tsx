import { Navigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { LaborMonitoringSection } from "@/features/labor-monitoring/components/labor-monitoring-section";
import { patientRoutes } from "@/features/patients/constants/patient-routes";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";

export function LaborMonitoringPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const workflowQuery = usePatientWorkflow(patientId);

  const session = getAuthSession();

  const canView = hasPermission(session?.user, "view_labor_monitoring");

  const canCreate = hasPermission(session?.user, "create_labor_monitoring");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Pemantauan tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (!canView) {
    return (
      <ErrorState
        title="Tidak memiliki akses"
        description="Akun Anda tidak memiliki izin untuk melihat pemantauan persalinan."
      />
    );
  }

  if (workflowQuery.isLoading) {
    return <TableSkeleton rows={5} columns={8} />;
  }

  if (workflowQuery.isError || !workflowQuery.data) {
    return (
      <ErrorState
        title="Status pelayanan gagal dimuat"
        description="Status workflow pasien tidak tersedia."
      />
    );
  }

  if (!workflowQuery.data.hasInitialScreening) {
    return <Navigate to={patientRoutes.initialScreening(patientId)} replace />;
  }

  return <LaborMonitoringSection patientId={patientId} canCreate={canCreate} />;
}
