import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import {
  patientPageSizeOptions,
  patientRiskFilterOptions,
  patientStatusFilterOptions,
} from "../constants/patient-list-options";
import type {
  PatientListFilterValues,
  PatientRiskFilter,
  PatientStatusFilter,
} from "../types/patient-list.type";

type PatientListFiltersProps = {
  values: PatientListFilterValues;
  formKey: string;

  onApply: (values: PatientListFilterValues) => void;

  onReset: () => void;
};

export function PatientListFilters({
  values,
  formKey,
  onApply,
  onReset,
}: PatientListFiltersProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onApply({
      search: String(formData.get("search") ?? ""),

      journeyStatus: String(
        formData.get("journeyStatus") ?? "all",
      ) as PatientStatusFilter,

      riskCategory: String(
        formData.get("riskCategory") ?? "all",
      ) as PatientRiskFilter,

      pageSize: Number(formData.get("pageSize") ?? 5),
    });
  };

  const activeFilterCount = [
    Boolean(values.search),
    values.journeyStatus !== "all",
    values.riskCategory !== "all",
    values.pageSize !== 5,
  ].filter(Boolean).length;

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_220px_220px_140px_auto]">
        <Input
          id="patientSearch"
          name="search"
          label="Cari Pasien"
          placeholder="Nama, pekerjaan, ras, atau risiko"
          defaultValue={values.search}
        />

        <Select
          id="journeyStatus"
          name="journeyStatus"
          label="Status Pelayanan"
          options={patientStatusFilterOptions}
          defaultValue={values.journeyStatus}
        />

        <Select
          id="riskCategory"
          name="riskCategory"
          label="Kategori Risiko"
          options={patientRiskFilterOptions}
          defaultValue={values.riskCategory}
        />

        <Select
          id="pageSize"
          name="pageSize"
          label="Per Halaman"
          options={patientPageSizeOptions}
          defaultValue={String(values.pageSize)}
        />

        <div className="flex items-end gap-2">
          <Button type="submit" className="flex-1">
            Terapkan
          </Button>

          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <p className="mt-3 text-xs text-slate-500">
          {activeFilterCount} filter aktif
        </p>
      )}
    </form>
  );
}
