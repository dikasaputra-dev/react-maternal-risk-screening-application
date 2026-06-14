export type DeliveryOutcomeType =
  | "spontaneous"
  | "induced_vaginal"
  | "induced_vacuum_extraction"
  | "induced_cesarean"
  | "cesarean";

export type DeliveryOutcomeFormValues = {
  outcomeType: DeliveryOutcomeType | "";
};

export type DeliveryOutcomeFormErrors = Partial<
  Record<keyof DeliveryOutcomeFormValues, string>
>;

export type DeliveryOutcomeRecordedBy = {
  id: string;
  name: string;
};

export type DeliveryOutcome = {
  id: string;
  patientId: string;
  outcomeType: DeliveryOutcomeType;
  recordedAt: string;
  recordedBy: DeliveryOutcomeRecordedBy;
  createdAt: string;
};
