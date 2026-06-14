import { useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { ClinicalActionSection } from "@/features/clinical-actions/components/clinical-action-section";

export function ClinicalActionsPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const session = getAuthSession();

  const canView = hasPermission(session?.user, "view_clinical_actions");

  const canCreate = hasPermission(session?.user, "create_clinical_action");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Halaman tindakan tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (!canView) {
    return (
      <ErrorState
        title="Tidak memiliki akses"
        description="Akun Anda tidak memiliki izin untuk melihat tindakan klinis."
      />
    );
  }

  return <ClinicalActionSection patientId={patientId} canCreate={canCreate} />;
}
