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

export type RiskCategory = "no_risk" | "low_risk" | "high_risk";

/**
 * Entity pasien utama.
 *
 * Field demografi baru dibuat optional selama proses migrasi agar komponen
 * pasien lama tetap dapat dikompilasi. Setelah Patient Form pada Phase 2
 * selesai dimigrasikan, field demografi akan dijadikan required dan field
 * lama yang tidak lagi dibutuhkan dapat dihapus.
 */
export type Patient = {
  id: string;
  fullName: string;
  dateOfBirth: string;

  religion?: Religion;
  education?: EducationLevel;
  occupation?: string;
  race?: string;

  createdAt?: string;
  updatedAt?: string;

  /**
   * Legacy compatibility fields.
   *
   * Masih dipertahankan sementara karena patient table, mock API,
   * patient mapper, dan form lama masih menggunakannya.
   */
  nik: string;
  age: number;
  phone?: string;
  address?: string;
  lastScreeningDate: string;
  riskCategory: RiskCategory;
};

/**
 * Type form lama.
 *
 * Dipertahankan sementara supaya komponen PatientForm lama tidak rusak
 * sebelum dimigrasikan pada Phase 2.
 */
export type PatientFormValues = {
  nik: string;
  fullName: string;
  dateOfBirth: string;
  phone?: string;
  address?: string;
};

export type PatientFormErrors = Partial<
  Record<keyof PatientFormValues, string>
>;

/**
 * Kontrak form pasien untuk alur baru.
 *
 * Type ini akan menjadi PatientFormValues utama setelah seluruh form,
 * mock API, DTO, mapper, dan table selesai dimigrasikan pada Phase 2.
 */
export type PatientRegistrationFormValues = {
  fullName: string;
  dateOfBirth: string;
  religion: Religion | "";
  education: EducationLevel | "";
  occupation: string;
  race: string;
};

export type PatientRegistrationFormErrors = Partial<
  Record<keyof PatientRegistrationFormValues, string>
>;
