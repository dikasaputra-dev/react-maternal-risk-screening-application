export type NewbornOutcomeType = "apgar" | "iufd" | "stillbirth";

export type NewbornOutcomeFormValues = {
  outcomeType: NewbornOutcomeType | "";
  apgarScore: number | "";
};

export type NewbornOutcomeFormErrors = Partial<
  Record<keyof NewbornOutcomeFormValues, string>
>;

export type NewbornOutcomeRecordedBy = {
  id: string;
  name: string;
};

type NewbornOutcomeBase = {
  id: string;
  patientId: string;
  recordedAt: string;
  recordedBy: NewbornOutcomeRecordedBy;
  createdAt: string;
};

export type ApgarNewbornOutcome = NewbornOutcomeBase & {
  outcomeType: "apgar";
  apgarScore: number;
};

export type NonApgarNewbornOutcome = NewbornOutcomeBase & {
  outcomeType: "iufd" | "stillbirth";
  apgarScore: null;
};

export type NewbornOutcome = ApgarNewbornOutcome | NonApgarNewbornOutcome;
