import type { PatientDto } from "@/features/patients/types/patient.dto";
import type { Patient } from "@/features/patients/types/patient.type";
import { calculateAgeFromDateOfBirth } from "@/lib/date";

export function mapPatientDtoToPatient(dto: PatientDto): Patient {
  return {
    id: dto.id,
    nik: dto.nik,
    fullName: dto.full_name,
    dateOfBirth: dto.date_of_birth,
    age: dto.age ?? calculateAgeFromDateOfBirth(dto.date_of_birth),
    phone: dto.phone ?? "",
    address: dto.address ?? "",
    lastScreeningDate: dto.last_screening_date ?? "-",
    riskCategory: dto.risk_category ?? "no_risk",
  };
}

export function mapPatientDtosToPatients(dtos: PatientDto[]) {
  return dtos.map(mapPatientDtoToPatient);
}
