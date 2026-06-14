import { useParams } from "react-router-dom";

import { ErrorState } from "@/components/ui/error-state";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { DeliveryOutcomeSection } from "@/features/delivery-outcomes/components/delivery-outcome-section";

export function DeliveryOutcomePage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const session = getAuthSession();

  const canView = hasPermission(session?.user, "view_delivery_outcome");

  const canCreate = hasPermission(session?.user, "create_delivery_outcome");

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Luaran persalinan tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (!canView) {
    return (
      <ErrorState
        title="Tidak memiliki akses"
        description="Akun Anda tidak memiliki izin untuk melihat luaran persalinan."
      />
    );
  }

  return <DeliveryOutcomeSection patientId={patientId} canCreate={canCreate} />;
}
