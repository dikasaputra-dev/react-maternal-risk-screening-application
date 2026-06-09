import type { PatientDto } from "@/features/patients/types/patient.dto";
import type { Patient } from "@/features/patients/types/patient.type";

function calculateAgeFromDateOfBirth(dateOfBirth?: string) {
  if (!dateOfBirth) return 0;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

export function mapPatientDtoToPatient(dto: PatientDto): Patient {
  return {
    id: dto.id,
    nik: dto.nik,
    fullName: dto.full_name,
    age: dto.age ?? calculateAgeFromDateOfBirth(dto.date_of_birth),
    dateOfBirth: dto.date_of_birth,
    phone: dto.phone ?? "",
    address: dto.address ?? "",
    lastScreeningDate: dto.last_screening_date ?? "-",
    riskCategory: dto.risk_category ?? "no_risk",
  };
}

export function mapPatientDtosToPatients(dtos: PatientDto[]) {
  return dtos.map(mapPatientDtoToPatient);
}
