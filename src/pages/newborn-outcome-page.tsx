import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { PatientWorkflowPlaceholder } from "@/features/patients/components/patient-workflow-placeholder";

export function NewbornOutcomePage() {
  const session = getAuthSession();

  const canCreate = hasPermission(session?.user, "create_newborn_outcome");

  return (
    <PatientWorkflowPlaceholder
      title="Luaran Kelahiran Bayi"
      description="Pencatatan APGAR Score, IUFD, atau stillbirth sebagai luaran kelahiran bayi."
      canCreate={canCreate}
      createLabel="Form luaran kelahiran bayi"
    />
  );
}
