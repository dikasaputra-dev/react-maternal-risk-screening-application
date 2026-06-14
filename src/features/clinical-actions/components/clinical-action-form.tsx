import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { LaboratoryResultFields } from "./laboratory-result-fields";
import {
  clinicalDecisionOptions,
  medicationFluidOptions,
} from "../constants/clinical-action-options";
import type {
  ClinicalActionFieldName,
  ClinicalActionFormValues,
  ClinicalDecisionType,
  LaboratoryResultFormValues,
  MedicationFluidType,
} from "../types/clinical-action.type";
import {
  hasClinicalActionFormErrors,
  validateClinicalActionForm,
} from "../utils/clinical-action-validation";

type ClinicalActionFormProps = {
  onSubmit: (values: ClinicalActionFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

function getCurrentDateTimeLocalValue() {
  const now = new Date();

  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

  return localTime.toISOString().slice(0, 16);
}

function createInitialValues(): ClinicalActionFormValues {
  return {
    recordedAt: getCurrentDateTimeLocalValue(),

    selectedMedicationFluidTypes: ["none"],

    oxytocinUnits: 5,

    clinicalDecision: {
      type: "observation",
      description: "",
    },

    laboratoryResults: [],
  };
}

function createLaboratoryResult(): LaboratoryResultFormValues {
  return {
    clientId: crypto.randomUUID(),
    examinationDate: new Date().toISOString().slice(0, 10),
    specimen: "",
    result: "",
  };
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-4">
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {children}
    </section>
  );
}

export function ClinicalActionForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ClinicalActionFormProps) {
  const [form, setForm] =
    useState<ClinicalActionFormValues>(createInitialValues);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errors = useMemo(() => validateClinicalActionForm(form), [form]);

  const getError = (field: ClinicalActionFieldName) => {
    return hasAttemptedSubmit ? errors[field] : undefined;
  };

  const toggleMedicationFluid = (
    value: MedicationFluidType,
    checked: boolean,
  ) => {
    setForm((current) => {
      if (value === "none" && checked) {
        return {
          ...current,
          selectedMedicationFluidTypes: ["none"],
        };
      }

      const withoutNone = current.selectedMedicationFluidTypes.filter(
        (item) => item !== "none",
      );

      const nextValues = checked
        ? [...withoutNone, value]
        : withoutNone.filter((item) => item !== value);

      return {
        ...current,
        selectedMedicationFluidTypes: nextValues,
      };
    });
  };

  const addLaboratoryResult = () => {
    setForm((current) => ({
      ...current,
      laboratoryResults: [
        ...current.laboratoryResults,
        createLaboratoryResult(),
      ],
    }));
  };

  const removeLaboratoryResult = (clientId: string) => {
    setForm((current) => ({
      ...current,
      laboratoryResults: current.laboratoryResults.filter(
        (laboratoryResult) => laboratoryResult.clientId !== clientId,
      ),
    }));
  };

  const updateLaboratoryResult = (
    clientId: string,
    field: "examinationDate" | "specimen" | "result",
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      laboratoryResults: current.laboratoryResults.map((laboratoryResult) =>
        laboratoryResult.clientId === clientId
          ? {
              ...laboratoryResult,
              [field]: value,
            }
          : laboratoryResult,
      ),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    const nextErrors = validateClinicalActionForm(form);

    if (hasClinicalActionFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <FormSection
        title="Waktu Tindakan"
        description="Catat tanggal dan jam tindakan dilakukan."
      >
        <Input
          id="clinicalActionRecordedAt"
          label="Tanggal dan Jam"
          type="datetime-local"
          value={form.recordedAt}
          error={getError("recordedAt")}
          disabled={isSubmitting}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              recordedAt: event.target.value,
            }))
          }
        />
      </FormSection>

      <FormSection
        title="Obat dan Cairan"
        description="Pilih seluruh obat atau cairan yang diberikan kepada pasien."
      >
        <fieldset>
          <legend className="sr-only">Pilihan obat dan cairan</legend>

          <div className="grid gap-3 md:grid-cols-2">
            {medicationFluidOptions.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                description={option.description}
                checked={form.selectedMedicationFluidTypes.includes(
                  option.value,
                )}
                disabled={isSubmitting}
                onChange={(event) =>
                  toggleMedicationFluid(option.value, event.target.checked)
                }
              />
            ))}
          </div>

          {getError("selectedMedicationFluidTypes") && (
            <p className="mt-3 text-sm text-red-600">
              {getError("selectedMedicationFluidTypes")}
            </p>
          )}

          {form.selectedMedicationFluidTypes.includes("oxytocin_drip") && (
            <div className="mt-4 max-w-sm">
              <Input
                id="oxytocinUnits"
                label="Dosis Oksitosin (UI)"
                type="number"
                min={1}
                max={100}
                value={form.oxytocinUnits}
                error={getError("oxytocinUnits")}
                disabled={isSubmitting}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    oxytocinUnits: Number(event.target.value),
                  }))
                }
              />
            </div>
          )}
        </fieldset>
      </FormSection>

      <FormSection
        title="Keputusan Klinis"
        description="Pilih keputusan klinis dan tuliskan tindakan jika diperlukan."
      >
        <div className="space-y-4">
          <Select
            id="clinicalDecisionType"
            label="Keputusan"
            options={clinicalDecisionOptions}
            value={form.clinicalDecision.type}
            error={getError("clinicalDecision.type")}
            disabled={isSubmitting}
            onChange={(event) => {
              const type = event.target.value as ClinicalDecisionType;

              setForm((current) => ({
                ...current,
                clinicalDecision: {
                  type,
                  description:
                    type === "procedure"
                      ? current.clinicalDecision.description
                      : "",
                },
              }));
            }}
          />

          {form.clinicalDecision.type === "procedure" && (
            <Textarea
              id="clinicalDecisionDescription"
              label="Deskripsi Tindakan"
              placeholder="Tuliskan tindakan klinis yang dilakukan atau direncanakan"
              value={form.clinicalDecision.description}
              error={getError("clinicalDecision.description")}
              disabled={isSubmitting}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  clinicalDecision: {
                    ...current.clinicalDecision,
                    description: event.target.value,
                  },
                }))
              }
            />
          )}
        </div>
      </FormSection>

      <LaboratoryResultFields
        results={form.laboratoryResults}
        errors={errors}
        showErrors={hasAttemptedSubmit}
        disabled={isSubmitting}
        onAdd={addLaboratoryResult}
        onRemove={removeLaboratoryResult}
        onChange={updateLaboratoryResult}
      />

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Catatan bersifat append-only
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Setelah disimpan, catatan tindakan tidak dapat diubah oleh nurse.
          Pastikan data telah diperiksa sebelum melakukan penyimpanan.
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
          Simpan Tindakan
        </Button>
      </div>
    </form>
  );
}
