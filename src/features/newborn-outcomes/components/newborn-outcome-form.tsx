import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { newbornOutcomeOptions } from "../constants/newborn-outcome-options";
import type {
  NewbornOutcomeFormValues,
  NewbornOutcomeType,
} from "../types/newborn-outcome.type";
import {
  hasNewbornOutcomeFormErrors,
  validateNewbornOutcomeForm,
} from "../utils/newborn-outcome-validation";

type NewbornOutcomeFormProps = {
  onSubmit: (values: NewbornOutcomeFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const initialValues: NewbornOutcomeFormValues = {
  outcomeType: "",
  apgarScore: "",
};

export function NewbornOutcomeForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: NewbornOutcomeFormProps) {
  const [form, setForm] = useState<NewbornOutcomeFormValues>(initialValues);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errors = useMemo(() => validateNewbornOutcomeForm(form), [form]);

  const handleOutcomeChange = (outcomeType: NewbornOutcomeType) => {
    setForm((current) => ({
      outcomeType,

      apgarScore: outcomeType === "apgar" ? current.apgarScore : "",
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    const nextErrors = validateNewbornOutcomeForm(form);

    if (hasNewbornOutcomeFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <fieldset>
        <legend className="text-base font-semibold text-slate-900">
          Pilih Luaran Kelahiran Bayi
        </legend>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Pilih satu hasil kelahiran bayi berdasarkan kondisi yang telah dicatat
          oleh tenaga medis.
        </p>

        <div className="mt-4 space-y-3">
          {newbornOutcomeOptions.map((option) => {
            const isSelected = form.outcomeType === option.value;

            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition",
                  "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                  isSubmitting && "cursor-not-allowed opacity-60",
                )}
              >
                <input
                  type="radio"
                  name="newbornOutcome"
                  value={option.value}
                  checked={isSelected}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                  onChange={() => handleOutcomeChange(option.value)}
                />

                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {option.label}
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    {option.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {hasAttemptedSubmit && errors.outcomeType && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {errors.outcomeType}
          </p>
        )}
      </fieldset>

      {form.outcomeType === "apgar" && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <div className="max-w-sm">
            <Input
              id="apgarScore"
              label="APGAR Score (0–10)"
              type="number"
              min={0}
              max={10}
              step={1}
              placeholder="Masukkan skor APGAR"
              value={form.apgarScore}
              error={hasAttemptedSubmit ? errors.apgarScore : undefined}
              disabled={isSubmitting}
              onChange={(event) => {
                const value = event.target.value;

                setForm((current) => ({
                  ...current,
                  apgarScore: value === "" ? "" : Number(value),
                }));
              }}
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-blue-700">
            Skor harus berupa bilangan bulat pada skala 0 sampai 10.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Hasil tidak dapat diubah
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-800">
          Setelah disimpan, luaran kelahiran bayi menjadi read-only. Periksa
          kembali pilihan dan APGAR Score sebelum melakukan penyimpanan.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Batal
        </Button>

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Simpan Luaran Bayi
        </Button>
      </div>
    </form>
  );
}
