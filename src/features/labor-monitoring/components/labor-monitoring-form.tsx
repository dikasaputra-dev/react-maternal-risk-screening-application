import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { LaborMonitoringRiskPreview } from "./labor-monitoring-risk-preview";
import {
  amnioticFluidColorOptions,
  contractionIntensityOptions,
  fetalMovementOptions,
  headDescentOptions,
  membraneStatusOptions,
  urineMarkerOptions,
} from "../constants/labor-monitoring-options";
import type {
  AmnioticFluidColor,
  ContractionIntensity,
  FetalMovementStatus,
  HeadDescentLevel,
  LaborMonitoringFormValues,
  MembraneStatus,
  UrineMarker,
} from "../types/labor-monitoring.type";
import { calculateLaborMonitoringRisk } from "../utils/labor-monitoring-risk";
import {
  hasLaborMonitoringFormErrors,
  validateLaborMonitoringForm,
} from "../utils/labor-monitoring-validation";

type LaborMonitoringFormProps = {
  onSubmit: (values: LaborMonitoringFormValues) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

function getCurrentDateTimeLocalValue() {
  const now = new Date();

  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

  return localTime.toISOString().slice(0, 16);
}

function createInitialValues(): LaborMonitoringFormValues {
  return {
    recordedAt: getCurrentDateTimeLocalValue(),

    vitalSigns: {
      systolicBloodPressure: 120,
      diastolicBloodPressure: 80,
      pulse: 80,
      respiratoryRate: 20,
      temperature: 36.5,
      oxygenSaturation: 98,
    },

    fetalHeartRate: 140,
    fetalMovement: "active",

    contractions: {
      frequencyPer10Minutes: 3,
      durationSeconds: 45,
      intensity: "moderate",
    },

    cervicalDilationCm: 4,
    headDescent: "hodge_ii",

    membranes: {
      status: "intact",
      rupturedAt: "",
      color: "",
    },

    urine: {
      volumeMl: 200,
      protein: "negative",
      acetone: "negative",
    },
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

export function LaborMonitoringForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: LaborMonitoringFormProps) {
  const [form, setForm] =
    useState<LaborMonitoringFormValues>(createInitialValues);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errors = useMemo(() => validateLaborMonitoringForm(form), [form]);

  const riskResult = useMemo(() => calculateLaborMonitoringRisk(form), [form]);

  const getError = (field: keyof typeof errors) => {
    return hasAttemptedSubmit ? errors[field] : undefined;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    const nextErrors = validateLaborMonitoringForm(form);

    if (hasLaborMonitoringFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <FormSection
        title="Waktu Pemantauan"
        description="Catat tanggal dan jam pemeriksaan dilakukan."
      >
        <Input
          id="recordedAt"
          label="Tanggal dan Jam"
          type="datetime-local"
          value={form.recordedAt}
          error={getError("recordedAt")}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              recordedAt: event.target.value,
            }))
          }
        />
      </FormSection>

      <FormSection
        title="Tanda-Tanda Vital"
        description="Catat kondisi vital ibu pada saat pemantauan."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="monitoringSystolic"
            label="Sistolik (mmHg)"
            type="number"
            value={form.vitalSigns.systolicBloodPressure}
            error={getError("vitalSigns.systolicBloodPressure")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  systolicBloodPressure: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="monitoringDiastolic"
            label="Diastolik (mmHg)"
            type="number"
            value={form.vitalSigns.diastolicBloodPressure}
            error={getError("vitalSigns.diastolicBloodPressure")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  diastolicBloodPressure: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="monitoringPulse"
            label="Nadi (x/menit)"
            type="number"
            value={form.vitalSigns.pulse}
            error={getError("vitalSigns.pulse")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  pulse: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="monitoringRespiration"
            label="Napas (x/menit)"
            type="number"
            value={form.vitalSigns.respiratoryRate}
            error={getError("vitalSigns.respiratoryRate")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  respiratoryRate: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="monitoringTemperature"
            label="Suhu (°C)"
            type="number"
            step="0.1"
            value={form.vitalSigns.temperature}
            error={getError("vitalSigns.temperature")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  temperature: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="monitoringOxygen"
            label="Saturasi Oksigen (%)"
            type="number"
            value={form.vitalSigns.oxygenSaturation}
            error={getError("vitalSigns.oxygenSaturation")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vitalSigns: {
                  ...current.vitalSigns,
                  oxygenSaturation: Number(event.target.value),
                },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Kondisi Janin"
        description="Catat denyut jantung dan gerak janin."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="fetalHeartRate"
            label="DJJ (x/menit)"
            type="number"
            value={form.fetalHeartRate}
            error={getError("fetalHeartRate")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                fetalHeartRate: Number(event.target.value),
              }))
            }
          />

          <Select
            id="fetalMovement"
            label="Gerak Janin"
            options={fetalMovementOptions}
            value={form.fetalMovement}
            error={getError("fetalMovement")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                fetalMovement: event.target.value as FetalMovementStatus,
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Kontraksi"
        description="Catat frekuensi, durasi, dan intensitas kontraksi."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            id="contractionFrequency"
            label="Frekuensi / 10 Menit"
            type="number"
            value={form.contractions.frequencyPer10Minutes}
            error={getError("contractions.frequencyPer10Minutes")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                contractions: {
                  ...current.contractions,
                  frequencyPer10Minutes: Number(event.target.value),
                },
              }))
            }
          />

          <Input
            id="contractionDuration"
            label="Durasi (detik)"
            type="number"
            value={form.contractions.durationSeconds}
            error={getError("contractions.durationSeconds")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                contractions: {
                  ...current.contractions,
                  durationSeconds: Number(event.target.value),
                },
              }))
            }
          />

          <Select
            id="contractionIntensity"
            label="Intensitas"
            options={contractionIntensityOptions}
            value={form.contractions.intensity}
            error={getError("contractions.intensity")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                contractions: {
                  ...current.contractions,
                  intensity: event.target.value as ContractionIntensity,
                },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Pembukaan dan Penurunan Kepala"
        description="Catat pembukaan serviks dan posisi penurunan kepala."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="cervicalDilation"
            label="Pembukaan (cm)"
            type="number"
            min={0}
            max={10}
            value={form.cervicalDilationCm}
            error={getError("cervicalDilationCm")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                cervicalDilationCm: Number(event.target.value),
              }))
            }
          />

          <Select
            id="headDescent"
            label="Penurunan Kepala"
            options={headDescentOptions}
            value={form.headDescent}
            error={getError("headDescent")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                headDescent: event.target.value as HeadDescentLevel,
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Ketuban"
        description="Catat status ketuban, waktu pecah, dan warna cairan."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            id="membraneStatus"
            label="Status Ketuban"
            options={membraneStatusOptions}
            value={form.membranes.status}
            error={getError("membranes.status")}
            onChange={(event) => {
              const status = event.target.value as MembraneStatus;

              setForm((current) => ({
                ...current,
                membranes: {
                  status,
                  rupturedAt:
                    status === "ruptured"
                      ? current.membranes.rupturedAt ||
                        getCurrentDateTimeLocalValue()
                      : "",
                  color: status === "ruptured" ? current.membranes.color : "",
                },
              }));
            }}
          />

          {form.membranes.status === "ruptured" && (
            <>
              <Input
                id="rupturedAt"
                label="Tanggal/Jam Pecah"
                type="datetime-local"
                value={form.membranes.rupturedAt}
                error={getError("membranes.rupturedAt")}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    membranes: {
                      ...current.membranes,
                      rupturedAt: event.target.value,
                    },
                  }))
                }
              />

              <Select
                id="amnioticFluidColor"
                label="Warna Ketuban"
                placeholder="Pilih warna"
                options={amnioticFluidColorOptions}
                value={form.membranes.color}
                error={getError("membranes.color")}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    membranes: {
                      ...current.membranes,
                      color: event.target.value as AmnioticFluidColor | "",
                    },
                  }))
                }
              />
            </>
          )}
        </div>
      </FormSection>

      <FormSection
        title="Urine"
        description="Catat volume dan hasil pemeriksaan protein serta aseton."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            id="urineVolume"
            label="Volume (ml)"
            type="number"
            min={0}
            value={form.urine.volumeMl}
            error={getError("urine.volumeMl")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                urine: {
                  ...current.urine,
                  volumeMl: Number(event.target.value),
                },
              }))
            }
          />

          <Select
            id="urineProtein"
            label="Protein"
            options={urineMarkerOptions}
            value={form.urine.protein}
            error={getError("urine.protein")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                urine: {
                  ...current.urine,
                  protein: event.target.value as UrineMarker,
                },
              }))
            }
          />

          <Select
            id="urineAcetone"
            label="Aseton"
            options={urineMarkerOptions}
            value={form.urine.acetone}
            error={getError("urine.acetone")}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                urine: {
                  ...current.urine,
                  acetone: event.target.value as UrineMarker,
                },
              }))
            }
          />
        </div>
      </FormSection>

      <LaborMonitoringRiskPreview result={riskResult} />

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
          Simpan Pemantauan
        </Button>
      </div>
    </form>
  );
}
