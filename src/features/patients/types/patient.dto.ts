import type { EducationLevel, Religion } from "./patient.type";

export type PatientDto = {
  id: string;
  full_name: string;
  date_of_birth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;
  created_at: string;
  updated_at: string;
};

export type PatientPayloadDto = {
  full_name: string;
  date_of_birth: string;
  religion: Religion;
  education: EducationLevel;
  occupation: string;
  race: string;
};
