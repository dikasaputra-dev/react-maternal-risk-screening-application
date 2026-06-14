import type { PatientWorkflowStatusDto } from "../types/patient-workflow.dto";
import type { PatientWorkflowStatus } from "../types/patient-workflow.type";

export function mapPatientWorkflowStatusDto(
  dto: PatientWorkflowStatusDto,
): PatientWorkflowStatus {
  return {
    patientId: dto.patient_id,

    hasInitialScreening: dto.has_initial_screening,

    initialScreeningId: dto.initial_screening_id ?? null,

    initialScreeningCompletedAt: dto.initial_screening_completed_at ?? null,

    monitoringEntryCount: dto.monitoring_entry_count ?? 0,

    clinicalActionCount: dto.clinical_action_count ?? 0,

    hasDeliveryOutcome: dto.has_delivery_outcome ?? false,

    hasNewbornOutcome: dto.has_newborn_outcome ?? false,

    updatedAt: dto.updated_at,
  };
}
