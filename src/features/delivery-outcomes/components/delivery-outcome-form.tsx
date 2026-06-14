import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { deliveryOutcomeOptions } from "../constants/delivery-outcome-options";
import type {
  DeliveryOutcomeFormValues,
  DeliveryOutcomeType,
} from "../types/delivery-outcome.type";
import {
  hasDeliveryOutcomeFormErrors,
  validateDeliveryOutcomeForm,
} from "../utils/delivery-outcome-validation";

type DeliveryOutcomeFormProps = {
  onSubmit: (values: DeliveryOutcomeFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const initialValues: DeliveryOutcomeFormValues = {
  outcomeType: "",
};

export function DeliveryOutcomeForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: DeliveryOutcomeFormProps) {
  const [form, setForm] = useState<DeliveryOutcomeFormValues>(initialValues);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errors = useMemo(() => validateDeliveryOutcomeForm(form), [form]);

  const handleOutcomeChange = (outcomeType: DeliveryOutcomeType) => {
    setForm({
      outcomeType,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    const nextErrors = validateDeliveryOutcomeForm(form);

    if (hasDeliveryOutcomeFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <fieldset>
        <legend className="text-base font-semibold text-slate-900">
          Pilih Luaran Persalinan
        </legend>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Pilih satu metode yang menjadi luaran akhir persalinan pasien.
        </p>

        <div className="mt-4 space-y-3">
          {deliveryOutcomeOptions.map((option) => {
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
                  name="deliveryOutcome"
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

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Hasil tidak dapat diubah
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-800">
          Setelah disimpan, luaran persalinan menjadi read-only dan tidak dapat
          diedit atau dihapus. Periksa kembali pilihan sebelum melakukan
          penyimpanan.
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
          Simpan Luaran Persalinan
        </Button>
      </div>
    </form>
  );
}
