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

/**
 * Type lama yang masih dipertahankan sementara untuk kompatibilitas
 * file lama seperti risk-badge.tsx.
 *
 * Entity Patient baru sudah tidak menggunakan riskCategory.
 */
export type RiskCategory = "no_risk" | "low_risk" | "high_risk";

export type Patient = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;
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

/**
 * Alias sementara agar file yang sebelumnya menggunakan nama
 * PatientRegistrationFormValues tidak langsung rusak.
 */
export type PatientRegistrationFormValues = PatientFormValues;

export type PatientRegistrationFormErrors = PatientFormErrors;
