import { Navigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";
import { getPatientPrimaryClinicalRoute } from "@/features/patients/utils/patient-workflow";

export function PatientWorkflowRedirect() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const workflowQuery = usePatientWorkflow(patientId);

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Tidak dapat menentukan tujuan halaman pasien."
      />
    );
  }

  if (workflowQuery.isLoading) {
    return <TableSkeleton rows={3} columns={4} />;
  }

  if (workflowQuery.isError || !workflowQuery.data) {
    return (
      <ErrorState
        title="Status pelayanan gagal dimuat"
        description="Tidak dapat menentukan tahapan pelayanan pasien."
      />
    );
  }

  const destination = getPatientPrimaryClinicalRoute(
    patientId,
    workflowQuery.data,
  );

  return <Navigate to={destination} replace />;
}
