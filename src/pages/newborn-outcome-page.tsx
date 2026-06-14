import { useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { NewbornOutcomeSection } from "@/features/newborn-outcomes/components/newborn-outcome-section";

export function NewbornOutcomePage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const session = getAuthSession();

  const canView = hasPermission(session?.user, "view_newborn_outcome");

  const canCreate = hasPermission(session?.user, "create_newborn_outcome");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Luaran kelahiran bayi tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (!canView) {
    return (
      <ErrorState
        title="Tidak memiliki akses"
        description="Akun Anda tidak memiliki izin untuk melihat luaran kelahiran bayi."
      />
    );
  }

  return <NewbornOutcomeSection patientId={patientId} canCreate={canCreate} />;
}
