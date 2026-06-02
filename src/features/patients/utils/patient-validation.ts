import type {
  PatientFormErrors,
  PatientFormValues,
} from "@/features/patients/types/patient.type";

export function validatePatientForm(
  values: PatientFormValues,
): PatientFormErrors {
  const errors: PatientFormErrors = {};

  if (!values.nik.trim()) {
    errors.nik = "NIK wajib diisi.";
  } else if (!/^\d{16}$/.test(values.nik)) {
    errors.nik = "NIK harus terdiri dari 16 digin angka.";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Nama lengkap wajib diisi.";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Nama minimal 3 karakter.";
  }

  if (!values.age) {
    errors.age = "Usia wajib diisi.";
  } else if (values.age < 10 || values.age > 60) {
    errors.age = "Usia ibu harus berada di rentang 10–60 tahun.";
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
