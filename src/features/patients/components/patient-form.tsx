import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
  Patient,
  PatientFormErrors,
  PatientFormValues,
} from "@/features/patients/types/patient.type";
import {
  hasPatientFormErrors,
  validatePatientForm,
} from "@/features/patients/utils/patient-validation";

type PatientFormProps = {
  initialData?: Patient | null;
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function PatientForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormValues>({
    nik: initialData?.nik ?? "",
    fullName: initialData?.fullName ?? "",
    age: initialData?.age ?? 0,
    phone: initialData?.phone ?? "",
    address: initialData?.address ?? "",
  });

  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [isTouched, setIsTouched] = useState(false);

  const liveErrors = useMemo(() => {
    if (!isTouched) return {};
    return validatePatientForm(form);
  }, [form, isTouched]);

  const visibleErrors = isTouched ? liveErrors : errors;

  const isInvalid = hasPatientFormErrors(validatePatientForm(form));

  const handleChange = (
    field: keyof PatientFormValues,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsTouched(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validatePatientForm(form);
    setErrors(nextErrors);
    setIsTouched(true);

    if (hasPatientFormErrors(nextErrors)) return;

    onSubmit({
      ...form,
      nik: form.nik.trim(),
      fullName: form.fullName.trim(),
      phone: form.phone?.trim(),
      address: form.address?.trim(),
      age: Number(form.age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-py-4">
      <Input
        id="nik"
        label="NIK"
        placeholder="Masukkan NIK"
        value={form.nik}
        error={visibleErrors.nik}
        onChange={(event) => handleChange("nik", event.target.value)}
      />

      <Input
        id="fullName"
        label="Nama Lengkap"
        placeholder="Masukkan nama pasien"
        value={form.fullName}
        error={visibleErrors.fullName}
        onChange={(event) => handleChange("fullName", event.target.value)}
      />

      <Input
        id="age"
        label="Usia"
        type="number"
        placeholder="Masukkan usia"
        value={form.age}
        error={visibleErrors.age}
        onChange={(event) => handleChange("age", event.target.value)}
      />

      <Input
        id="phone"
        label="No. HP"
        placeholder="Contoh: 08xxxxxxxxx"
        value={form.phone}
        error={visibleErrors.phone}
        onChange={(event) => handleChange("phone", event.target.value)}
      />

      <Input
        id="address"
        label="Alamat"
        placeholder="Masukkan alamat pasien"
        value={form.address}
        error={visibleErrors.address}
        onChange={(event) => handleChange("address", event.target.value)}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>

        <Button
          type="submit"
          disabled={isInvalid || isSubmitting}
          loading={isSubmitting}
        >
          {initialData ? "Simpan Perubahan" : "Tambah Pasien"}
        </Button>
      </div>
    </form>
  );
}
