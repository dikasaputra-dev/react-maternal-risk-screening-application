import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  Patient,
  PatientFormValues,
} from "@/features/patients/types/patient.type";
import React, { useState } from "react";

type PatientFormProps = {
  initialData?: Patient | null;
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
};

export function PatientForm({
  initialData,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormValues>({
    nik: initialData?.nik ?? "",
    fullName: initialData?.fullName ?? "",
    age: initialData?.age ?? 0,
    phone: initialData?.phone ?? "",
    address: initialData?.address ?? "",
  });

  const handleChange = (
    field: keyof PatientFormValues,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      ...form,
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
        onChange={(event) => handleChange("nik", event.target.value)}
      />

      <Input
        id="fullName"
        label="Nama Lengkap"
        placeholder="Masukkan nama pasien"
        value={form.fullName}
        onChange={(event) => handleChange("fullName", event.target.value)}
      />

      <Input
        id="age"
        label="Usia"
        placeholder="Masukkan usia"
        value={form.age}
        onChange={(event) => handleChange("age", event.target.value)}
      />

      <Input
        id="phone"
        label="No. HP"
        placeholder="Contoh: 08xxxxxxxxx"
        value={form.phone}
        onChange={(event) => handleChange("phone", event.target.value)}
      />

      <Input
        id="address"
        label="Alamat"
        placeholder="Masukkan alamat pasien"
        value={form.address}
        onChange={(event) => handleChange("address", event.target.value)}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>

        <Button type="submit">
          {initialData ? "Simpan Perubahan" : "Tambah Pasien"}
        </Button>
      </div>
    </form>
  );
}
