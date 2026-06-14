import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { PatientWorkflowPlaceholder } from "@/features/patients/components/patient-workflow-placeholder";

export function DeliveryOutcomePage() {
  const session = getAuthSession();

  const canCreate = hasPermission(session?.user, "create_delivery_outcome");

  return (
    <PatientWorkflowPlaceholder
      title="Luaran Persalinan"
      description="Pencatatan metode dan hasil akhir proses persalinan pasien."
      canCreate={canCreate}
      createLabel="Form luaran persalinan"
    />
  );
}
