import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { PatientWorkflowPlaceholder } from "@/features/patients/components/patient-workflow-placeholder";

export function ClinicalActionsPage() {
  const session = getAuthSession();

  const canCreate = hasPermission(session?.user, "create_clinical_action");

  return (
    <PatientWorkflowPlaceholder
      title="Tindakan"
      description="Pencatatan obat, cairan, keputusan klinis, dan hasil pemeriksaan laboratorium."
      canCreate={canCreate}
      createLabel="Form tambah tindakan klinis"
    />
  );
}
