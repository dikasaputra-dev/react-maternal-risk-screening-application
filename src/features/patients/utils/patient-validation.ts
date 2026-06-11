import type {
  PatientFormErrors,
  PatientFormValues,
} from "@/features/patients/types/patient.type";
import { calculateAgeFromDateOfBirth } from "@/lib/date";

export function validatePatientForm(
  values: PatientFormValues,
): PatientFormErrors {
  const errors: PatientFormErrors = {};

  if (!values.nik.trim()) {
    errors.nik = "NIK wajib diisi.";
  } else if (!/^\d{16}$/.test(values.nik)) {
    errors.nik = "NIK harus terdiri dari 16 digit angka.";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Nama lengkap wajib diisi.";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Nama minimal 3 karakter.";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Tanggal lahir wajib diisi.";
  } else {
    const selectedDate = new Date(values.dateOfBirth);
    const today = new Date();

    if (selectedDate > today) {
      errors.dateOfBirth = "Tanggal lahir tidak boleh di masa depan.";
    }

    const age = calculateAgeFromDateOfBirth(values.dateOfBirth);

    if (age < 10 || age > 60) {
      errors.dateOfBirth = "Usia ibu harus berada di rentang 10–60 tahun.";
    }
  }

  if (values.phone && !/^[0-9+ -]{8,20}$/.test(values.phone)) {
    errors.phone = "Format nomor HP tidak valid.";
  }

  if (values.address && values.address.trim().length < 5) {
    errors.address = "Alamat minimal 5 karakter.";
  }

  return errors;
}

export function hasPatientFormErrors(errors: PatientFormErrors) {
  return Object.keys(errors).length > 0;
}
