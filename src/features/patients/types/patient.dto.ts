import type { RiskCategory } from "@/features/patients/types/patient.type";

export type PatientDto = {
  id: string;
  nik: string;
  full_name: string;
  date_of_birth?: string;
  age?: number;
  address?: string | null;
  phone?: string | null;
  last_screening_date?: string | null;
  risk_category?: RiskCategory | null;
  created_at?: string;
  updated_at?: string;
};

export type PatientPayloadDto = {
  nik: string;
  full_name: string;
  date_of_birth?: string;
  address?: string | null;
  phone?: string | null;
};
