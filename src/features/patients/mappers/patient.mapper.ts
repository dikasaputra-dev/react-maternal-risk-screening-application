import type { PatientDto, PatientPayloadDto } from "../types/patient.dto";
import type { Patient, PatientFormValues } from "../types/patient.type";

export function mapPatientDtoToPatient(dto: PatientDto): Patient {
  return {
    id: dto.id,
    fullName: dto.full_name,
    dateOfBirth: dto.date_of_birth,
    religion: dto.religion,
    education: dto.education,
    occupation: dto.occupation,
    race: dto.race,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

export function mapPatientDtosToPatients(dtos: PatientDto[]) {
  return dtos.map(mapPatientDtoToPatient);
}

export function mapPatientFormToPayload(
  values: PatientFormValues,
): PatientPayloadDto {
  if (!values.religion) {
    throw new Error("Agama pasien wajib dipilih.");
  }

  if (!values.education) {
    throw new Error("Pendidikan pasien wajib dipilih.");
  }

  return {
    full_name: values.fullName.trim(),
    date_of_birth: values.dateOfBirth,
    religion: values.religion,
    education: values.education,
    occupation: values.occupation.trim(),
    race: values.race.trim(),
  };
}
