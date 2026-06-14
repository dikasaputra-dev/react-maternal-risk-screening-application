import { Navigate, useNavigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useToast } from "@/components/ui/toast-context";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { InitialScreeningForm } from "@/features/initial-screening/components/initial-screening-form";
import { useCreateInitialScreening } from "@/features/initial-screening/hooks/use-initial-screening-mutations";
import type { InitialScreeningFormValues } from "@/features/initial-screening/types/initial-screening.type";
import { patientRoutes } from "@/features/patients/constants/patient-routes";
import { usePatient } from "@/features/patients/hooks/use-patient";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";
import { calculateAgeFromDateOfBirth } from "@/lib/date";
import { getErrorMessage } from "@/lib/error";

export function InitialScreeningPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const patientQuery = usePatient(patientId);

  const workflowQuery = usePatientWorkflow(patientId);

  const createScreeningMutation = useCreateInitialScreening();

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

  if (patientQuery.isLoading || workflowQuery.isLoading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (
    patientQuery.isError ||
    workflowQuery.isError ||
    !patientQuery.data ||
    !workflowQuery.data
  ) {
    return (
      <ErrorState
        title="Data skrining gagal dimuat"
        description="Data pasien atau status workflow tidak tersedia."
      />
    );
  }

  if (workflowQuery.data.hasInitialScreening) {
    return <Navigate to={patientRoutes.laborMonitoring(patientId)} replace />;
  }

  if (!canCreate) {
    return (
      <ErrorState
        title="Tidak memiliki akses"
        description="Akun Anda tidak memiliki izin untuk menambahkan skrining awal."
      />
    );
  }

  const maternalAge = calculateAgeFromDateOfBirth(
    patientQuery.data.dateOfBirth,
  );

  const handleSubmit = async (values: InitialScreeningFormValues) => {
    try {
      const screening = await createScreeningMutation.mutateAsync({
        patientId,
        values,
      });

      showToast({
        type: "success",
        title: "Skrining awal berhasil disimpan",
        description: `Hasil skrining: ${screening.riskCategory.replaceAll(
          "_",
          " ",
        )} dengan skor ${screening.riskScore}.`,
      });

      navigate(patientRoutes.laborMonitoring(patientId), {
        replace: true,
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan skrining awal",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <InitialScreeningForm
      maternalAge={maternalAge}
      onSubmit={handleSubmit}
      isSubmitting={createScreeningMutation.isPending}
    />
  );
}
