import type {
  PatientRiskSummary,
  RiskCategory,
} from "@/features/clinical-risk/types/risk.type";

export type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

export type Religion =
  | "islam"
  | "protestant"
  | "catholic"
  | "hindu"
  | "buddhist"
  | "confucian"
  | "other"
  | "not_specified";

export type EducationLevel =
  | "no_formal_education"
  | "elementary_school"
  | "junior_high_school"
  | "senior_high_school"
  | "diploma"
  | "bachelor"
  | "master"
  | "doctorate"
  | "other";

export type Patient = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;

  /**
   * Ringkasan risiko terbaru.
   *
   * Null berarti pasien belum memiliki hasil skrining
   * atau pemantauan persalinan.
   */
  latestRisk: PatientRiskSummary | null;

  createdAt: string;
  updatedAt: string;
};

export type PatientFormValues = {
  fullName: string;
  dateOfBirth: string;
  religion: Religion | "";
  education: EducationLevel | "";
  occupation: string;
  race: string;
};

export type PatientFormErrors = Partial<
  Record<keyof PatientFormValues, string>
>;

export type PatientRegistrationFormValues = PatientFormValues;

export type PatientRegistrationFormErrors = PatientFormErrors;

/**
 * Alias ini dipertahankan agar import lama terhadap
 * RiskCategory dari patient.type.ts tetap berfungsi.
 */
export type PatientRiskCategory = RiskCategory;
