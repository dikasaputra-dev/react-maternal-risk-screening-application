import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getTodayDateInputValue } from "@/lib/date";

import {
  educationOptions,
  religionOptions,
} from "../constants/patient-options";
import type { Patient, PatientFormValues } from "../types/patient.type";
import {
  hasPatientFormErrors,
  validatePatientForm,
} from "../utils/patient-validation";

type TouchedFields = Partial<Record<keyof PatientFormValues, boolean>>;

type PatientFormProps = {
  initialData?: Patient | null;
  onSubmit: (values: PatientFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

function createInitialFormValues(
  initialData?: Patient | null,
): PatientFormValues {
  return {
    fullName: initialData?.fullName ?? "",
    dateOfBirth: initialData?.dateOfBirth ?? "",
    religion: initialData?.religion ?? "",
    education: initialData?.education ?? "",
    occupation: initialData?.occupation ?? "",
    race: initialData?.race ?? "",
  };
}

export function PatientForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormValues>(() =>
    createInitialFormValues(initialData),
  );

  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  const errors = useMemo(() => validatePatientForm(form), [form]);

  const isInvalid = hasPatientFormErrors(errors);

  const handleChange = (field: keyof PatientFormValues, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const markFieldAsTouched = (field: keyof PatientFormValues) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  };

  const getVisibleError = (field: keyof PatientFormValues) => {
    return touchedFields[field] ? errors[field] : undefined;
  };

  const markAllFieldsAsTouched = () => {
    setTouchedFields({
      fullName: true,
      dateOfBirth: true,
      religion: true,
      education: true,
      occupation: true,
      race: true,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    markAllFieldsAsTouched();

    const nextErrors = validatePatientForm(form);

    if (hasPatientFormErrors(nextErrors)) {
      return;
    }

    await onSubmit({
      fullName: form.fullName.trim(),
      dateOfBirth: form.dateOfBirth,
      religion: form.religion,
      education: form.education,
      occupation: form.occupation.trim(),
      race: form.race.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        id="fullName"
        label="Nama"
        placeholder="Masukkan nama lengkap pasien"
        autoComplete="name"
        value={form.fullName}
        error={getVisibleError("fullName")}
        onChange={(event) => handleChange("fullName", event.target.value)}
        onBlur={() => markFieldAsTouched("fullName")}
      />

      <Input
        id="dateOfBirth"
        label="Tanggal Lahir"
        type="date"
        max={getTodayDateInputValue()}
        value={form.dateOfBirth}
        error={getVisibleError("dateOfBirth")}
        onChange={(event) => handleChange("dateOfBirth", event.target.value)}
        onBlur={() => markFieldAsTouched("dateOfBirth")}
      />

      <Select
        id="religion"
        label="Agama"
        placeholder="Pilih agama"
        options={religionOptions}
        value={form.religion}
        error={getVisibleError("religion")}
        onChange={(event) => handleChange("religion", event.target.value)}
        onBlur={() => markFieldAsTouched("religion")}
      />

      <Select
        id="education"
        label="Pendidikan"
        placeholder="Pilih pendidikan terakhir"
        options={educationOptions}
        value={form.education}
        error={getVisibleError("education")}
        onChange={(event) => handleChange("education", event.target.value)}
        onBlur={() => markFieldAsTouched("education")}
      />

      <Input
        id="occupation"
        label="Pekerjaan"
        placeholder="Contoh: Ibu Rumah Tangga"
        value={form.occupation}
        error={getVisibleError("occupation")}
        onChange={(event) => handleChange("occupation", event.target.value)}
        onBlur={() => markFieldAsTouched("occupation")}
      />

      <Input
        id="race"
        label="Ras"
        placeholder="Contoh: Sunda"
        value={form.race}
        error={getVisibleError("race")}
        onChange={(event) => handleChange("race", event.target.value)}
        onBlur={() => markFieldAsTouched("race")}
      />

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
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
