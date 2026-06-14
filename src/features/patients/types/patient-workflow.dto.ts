export type PatientWorkflowStatusDto = {
  patient_id: string;

  has_initial_screening: boolean;
  initial_screening_id?: string | null;
  initial_screening_completed_at?: string | null;

  monitoring_entry_count?: number;
  clinical_action_count?: number;

  has_delivery_outcome?: boolean;
  has_newborn_outcome?: boolean;

  updated_at: string;
};
