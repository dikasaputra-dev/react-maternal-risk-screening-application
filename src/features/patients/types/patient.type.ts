export type RiskCategory = "no_risk" | "low_risk" | "high_risk";

export type Patient = {
  id: string;
  nik: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  phone?: string;
  address?: string;
  lastScreeningDate: string;
  riskCategory: RiskCategory;
};

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
