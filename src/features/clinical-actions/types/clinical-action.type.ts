export type MedicationFluidType =
  | "none"
  | "nacl"
  | "ringer_lactate"
  | "oxytocin_drip"
  | "magnesium_sulfate";

export type ClinicalDecisionType = "observation" | "procedure";

export type MedicationFluidAdministration = {
  type: MedicationFluidType;
  oxytocinUnits: number | null;
};

export type ClinicalDecision = {
  type: ClinicalDecisionType;
  description: string | null;
};

export type LaboratoryResult = {
  id: string;
  examinationDate: string;
  specimen: string;
  result: string;
};

export type LaboratoryResultFormValues = {
  clientId: string;
  examinationDate: string;
  specimen: string;
  result: string;
};

export type ClinicalActionFormValues = {
  recordedAt: string;

  selectedMedicationFluidTypes: MedicationFluidType[];

  oxytocinUnits: number;

  clinicalDecision: {
    type: ClinicalDecisionType;
    description: string;
  };

  laboratoryResults: LaboratoryResultFormValues[];
};

export type ClinicalActionRecordedBy = {
  id: string;
  name: string;
};

export type ClinicalAction = {
  id: string;
  patientId: string;
  recordedAt: string;

  medicationsAndFluids: MedicationFluidAdministration[];

  clinicalDecision: ClinicalDecision;

  laboratoryResults: LaboratoryResult[];

  recordedBy: ClinicalActionRecordedBy;

  createdAt: string;
};

export type ClinicalActionFieldName =
  | "recordedAt"
  | "selectedMedicationFluidTypes"
  | "oxytocinUnits"
  | "clinicalDecision.type"
  | "clinicalDecision.description"
  | `laboratoryResults.${number}.examinationDate`
  | `laboratoryResults.${number}.specimen`
  | `laboratoryResults.${number}.result`;

export type ClinicalActionFormErrors = Partial<
  Record<ClinicalActionFieldName, string>
>;
