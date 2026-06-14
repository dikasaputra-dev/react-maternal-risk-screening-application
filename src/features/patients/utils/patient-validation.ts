import { calculateAgeFromDateOfBirth } from "@/lib/date";

import type {
  PatientFormErrors,
  PatientFormValues,
} from "../types/patient.type";

export function validatePatientForm(
  values: PatientFormValues,
): PatientFormErrors {
  const errors: PatientFormErrors = {};

  const fullName = values.fullName.trim();
  const occupation = values.occupation.trim();
  const race = values.race.trim();

  if (!fullName) {
    errors.fullName = "Nama pasien wajib diisi.";
  } else if (fullName.length < 3) {
    errors.fullName = "Nama pasien minimal 3 karakter.";
  } else if (fullName.length > 255) {
    errors.fullName = "Nama pasien maksimal 255 karakter.";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Tanggal lahir wajib diisi.";
  } else {
    const selectedDate = new Date(`${values.dateOfBirth}T00:00:00`);

    const today = new Date();

    if (Number.isNaN(selectedDate.getTime())) {
      errors.dateOfBirth = "Tanggal lahir tidak valid.";
    } else if (selectedDate > today) {
      errors.dateOfBirth = "Tanggal lahir tidak boleh di masa depan.";
    } else {
      const age = calculateAgeFromDateOfBirth(values.dateOfBirth);

      if (age < 10 || age > 60) {
        errors.dateOfBirth =
          "Usia pasien harus berada pada rentang 10–60 tahun.";
      }
    }
  }

  if (!values.religion) {
    errors.religion = "Agama wajib dipilih.";
  }

  if (!values.education) {
    errors.education = "Pendidikan wajib dipilih.";
  }

  if (!occupation) {
    errors.occupation = "Pekerjaan wajib diisi.";
  } else if (occupation.length < 2) {
    errors.occupation = "Pekerjaan minimal 2 karakter.";
  } else if (occupation.length > 100) {
    errors.occupation = "Pekerjaan maksimal 100 karakter.";
  }

  if (!race) {
    errors.race = "Ras wajib diisi.";
  } else if (race.length < 2) {
    errors.race = "Ras minimal 2 karakter.";
  } else if (race.length > 100) {
    errors.race = "Ras maksimal 100 karakter.";
  }

  return errors;
}

export function hasPatientFormErrors(errors: PatientFormErrors) {
  return Object.keys(errors).length > 0;
}
