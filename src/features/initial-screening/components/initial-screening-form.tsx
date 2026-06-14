import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { InitialScreeningRiskPreview } from "./initial-screening-risk-preview";
import {
  comorbidityOptions,
  consciousnessOptions,
  previousPregnancyHistoryOptions,
} from "../constants/initial-screening-options";
import type {
  Comorbidity,
  InitialScreeningFieldName,
  InitialScreeningFormValues,
  InitialScreeningObstetricStatus,
  InitialScreeningVitalSigns,
  PreviousPregnancyHistory,
} from "../types/initial-screening.type";
import { calculateInitialScreeningRisk } from "../utils/initial-screening-risk";
import {
  hasInitialScreeningFormErrors,
  validateInitialScreeningForm,
} from "../utils/initial-screening-validation";

type InitialScreeningFormProps = {
  maternalAge: number;
  onSubmit: (values: InitialScreeningFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
};

type TouchedFields = Partial<Record<InitialScreeningFieldName, boolean>>;

const initialFormValues: InitialScreeningFormValues = {
  heightCm: 150,

  vitalSigns: {
    consciousness: "compos_mentis",
    systolicBloodPressure: 120,
    diastolicBloodPressure: 80,
    pulse: 80,
    respiratoryRate: 20,
    temperature: 36.5,
    oxygenSaturation: 98,
  },

  obstetricStatus: {
    gravida: 1,
    para: 0,
    abortus: 0,
    livingChildren: 0,
    gestationalAgeWeeks: 37,
  },

  previousDeliveryInterval: {
    status: "never",
    years: 0,
  },

  previousPregnancyHistory: ["normal"],

  comorbidities: ["none"],
};

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function InitialScreeningForm({
  maternalAge,
  onSubmit,
  isSubmitting = false,
}: InitialScreeningFormProps) {
  const [form, setForm] =
    useState<InitialScreeningFormValues>(initialFormValues);

  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  const errors = useMemo(() => validateInitialScreeningForm(form), [form]);

  const riskResult = useMemo(
    () => calculateInitialScreeningRisk(form, maternalAge),
    [form, maternalAge],
  );

  const isInvalid = hasInitialScreeningFormErrors(errors);

  const markTouched = (field: InitialScreeningFieldName) => {
    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const getVisibleError = (field: InitialScreeningFieldName) => {
    return touchedFields[field] ? errors[field] : undefined;
  };

  const updateVitalSigns = (
    field: keyof InitialScreeningVitalSigns,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      vitalSigns: {
        ...current.vitalSigns,
        [field]: field === "consciousness" ? value : Number(value),
      },
    }));
  };

  const updateObstetricStatus = (
    field: keyof InitialScreeningObstetricStatus,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      obstetricStatus: {
        ...current.obstetricStatus,
        [field]: Number(value),
      },
    }));
  };

  const togglePreviousPregnancyHistory = (
    value: PreviousPregnancyHistory,
    checked: boolean,
  ) => {
    setForm((current) => {
      if (value === "normal" && checked) {
        return {
          ...current,
          previousPregnancyHistory: ["normal"],
        };
      }

      const withoutNormal = current.previousPregnancyHistory.filter(
        (item) => item !== "normal",
      );

      const nextValues = checked
        ? [...withoutNormal, value]
        : withoutNormal.filter((item) => item !== value);

      return {
        ...current,
        previousPregnancyHistory: nextValues,
      };
    });

    markTouched("previousPregnancyHistory");
  };

  const toggleComorbidity = (value: Comorbidity, checked: boolean) => {
    setForm((current) => {
      if (value === "none" && checked) {
        return {
          ...current,
          comorbidities: ["none"],
        };
      }

      const withoutNone = current.comorbidities.filter(
        (item) => item !== "none",
      );

      const nextValues = checked
        ? [...withoutNone, value]
        : withoutNone.filter((item) => item !== value);

      return {
        ...current,
        comorbidities: nextValues,
      };
    });

    markTouched("comorbidities");
  };

  const markAllFieldsTouched = () => {
    const allFields: InitialScreeningFieldName[] = [
      "heightCm",
      "vitalSigns.consciousness",
      "vitalSigns.systolicBloodPressure",
      "vitalSigns.diastolicBloodPressure",
      "vitalSigns.pulse",
      "vitalSigns.respiratoryRate",
      "vitalSigns.temperature",
      "vitalSigns.oxygenSaturation",
      "obstetricStatus.gravida",
      "obstetricStatus.para",
      "obstetricStatus.abortus",
      "obstetricStatus.livingChildren",
      "obstetricStatus.gestationalAgeWeeks",
      "previousDeliveryInterval.status",
      "previousDeliveryInterval.years",
      "previousPregnancyHistory",
      "comorbidities",
    ];

    setTouchedFields(
      Object.fromEntries(
        allFields.map((field) => [field, true]),
      ) as TouchedFields,
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    markAllFieldsTouched();

    const nextErrors = validateInitialScreeningForm(form);

    if (hasInitialScreeningFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
      noValidate
    >
      <div className="space-y-6">
        <FormSection
          title="Data Fisik"
          description="Data pengukuran awal kondisi fisik pasien."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="heightCm"
              label="Tinggi Badan (cm)"
              type="number"
              min={100}
              max={220}
              value={form.heightCm}
              error={getVisibleError("heightCm")}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  heightCm: Number(event.target.value),
                }))
              }
              onBlur={() => markTouched("heightCm")}
            />

            <Input
              id="maternalAge"
              label="Usia Ibu"
              value={`${maternalAge} tahun`}
              readOnly
              disabled
            />
          </div>
        </FormSection>

        <FormSection
          title="Tanda-Tanda Vital"
          description="Pemeriksaan tingkat kesadaran dan tanda vital pasien."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="consciousness"
              label="Tingkat Kesadaran"
              options={consciousnessOptions}
              value={form.vitalSigns.consciousness}
              error={getVisibleError("vitalSigns.consciousness")}
              onChange={(event) =>
                updateVitalSigns("consciousness", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.consciousness")}
            />

            <div />

            <Input
              id="systolicBloodPressure"
              label="Tekanan Darah Sistolik"
              type="number"
              min={60}
              max={250}
              value={form.vitalSigns.systolicBloodPressure}
              error={getVisibleError("vitalSigns.systolicBloodPressure")}
              onChange={(event) =>
                updateVitalSigns("systolicBloodPressure", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.systolicBloodPressure")}
            />

            <Input
              id="diastolicBloodPressure"
              label="Tekanan Darah Diastolik"
              type="number"
              min={30}
              max={150}
              value={form.vitalSigns.diastolicBloodPressure}
              error={getVisibleError("vitalSigns.diastolicBloodPressure")}
              onChange={(event) =>
                updateVitalSigns("diastolicBloodPressure", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.diastolicBloodPressure")}
            />

            <Input
              id="pulse"
              label="Nadi (x/menit)"
              type="number"
              min={30}
              max={220}
              value={form.vitalSigns.pulse}
              error={getVisibleError("vitalSigns.pulse")}
              onChange={(event) =>
                updateVitalSigns("pulse", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.pulse")}
            />

            <Input
              id="respiratoryRate"
              label="Napas (x/menit)"
              type="number"
              min={8}
              max={60}
              value={form.vitalSigns.respiratoryRate}
              error={getVisibleError("vitalSigns.respiratoryRate")}
              onChange={(event) =>
                updateVitalSigns("respiratoryRate", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.respiratoryRate")}
            />

            <Input
              id="temperature"
              label="Suhu (°C)"
              type="number"
              min={30}
              max={45}
              step="0.1"
              value={form.vitalSigns.temperature}
              error={getVisibleError("vitalSigns.temperature")}
              onChange={(event) =>
                updateVitalSigns("temperature", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.temperature")}
            />

            <Input
              id="oxygenSaturation"
              label="Saturasi Oksigen (%)"
              type="number"
              min={50}
              max={100}
              value={form.vitalSigns.oxygenSaturation}
              error={getVisibleError("vitalSigns.oxygenSaturation")}
              onChange={(event) =>
                updateVitalSigns("oxygenSaturation", event.target.value)
              }
              onBlur={() => markTouched("vitalSigns.oxygenSaturation")}
            />
          </div>
        </FormSection>

        <FormSection
          title="Status Obstetri"
          description="Isi status GPAH dan usia kehamilan saat skrining."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Input
              id="gravida"
              label="Gravida"
              type="number"
              min={1}
              max={20}
              value={form.obstetricStatus.gravida}
              error={getVisibleError("obstetricStatus.gravida")}
              onChange={(event) =>
                updateObstetricStatus("gravida", event.target.value)
              }
              onBlur={() => markTouched("obstetricStatus.gravida")}
            />

            <Input
              id="para"
              label="Para"
              type="number"
              min={0}
              max={20}
              value={form.obstetricStatus.para}
              error={getVisibleError("obstetricStatus.para")}
              onChange={(event) =>
                updateObstetricStatus("para", event.target.value)
              }
              onBlur={() => markTouched("obstetricStatus.para")}
            />

            <Input
              id="abortus"
              label="Abortus"
              type="number"
              min={0}
              max={20}
              value={form.obstetricStatus.abortus}
              error={getVisibleError("obstetricStatus.abortus")}
              onChange={(event) =>
                updateObstetricStatus("abortus", event.target.value)
              }
              onBlur={() => markTouched("obstetricStatus.abortus")}
            />

            <Input
              id="livingChildren"
              label="Anak Hidup"
              type="number"
              min={0}
              max={20}
              value={form.obstetricStatus.livingChildren}
              error={getVisibleError("obstetricStatus.livingChildren")}
              onChange={(event) =>
                updateObstetricStatus("livingChildren", event.target.value)
              }
              onBlur={() => markTouched("obstetricStatus.livingChildren")}
            />

            <Input
              id="gestationalAgeWeeks"
              label="Usia Kehamilan"
              type="number"
              min={4}
              max={45}
              value={form.obstetricStatus.gestationalAgeWeeks}
              error={getVisibleError("obstetricStatus.gestationalAgeWeeks")}
              onChange={(event) =>
                updateObstetricStatus("gestationalAgeWeeks", event.target.value)
              }
              onBlur={() => markTouched("obstetricStatus.gestationalAgeWeeks")}
            />
          </div>
        </FormSection>

        <FormSection
          title="Jarak Persalinan Sebelumnya"
          description="Pilih apakah pasien pernah bersalin dan isi jaraknya."
        >
          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              Status Persalinan Sebelumnya
            </legend>

            <div className="mt-3 flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="previousDeliveryStatus"
                  value="never"
                  checked={form.previousDeliveryInterval.status === "never"}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      previousDeliveryInterval: {
                        status: "never",
                        years: 0,
                      },
                    }))
                  }
                />

                <span className="text-sm text-slate-700">Belum Pernah</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="previousDeliveryStatus"
                  value="years"
                  checked={form.previousDeliveryInterval.status === "years"}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      previousDeliveryInterval: {
                        status: "years",
                        years: current.previousDeliveryInterval.years || 1,
                      },
                    }))
                  }
                />

                <span className="text-sm text-slate-700">Pernah</span>
              </label>
            </div>

            {form.previousDeliveryInterval.status === "years" && (
              <div className="mt-4 max-w-xs">
                <Input
                  id="previousDeliveryYears"
                  label="Jarak Persalinan (tahun)"
                  type="number"
                  min={1}
                  max={50}
                  value={form.previousDeliveryInterval.years}
                  error={getVisibleError("previousDeliveryInterval.years")}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      previousDeliveryInterval: {
                        ...current.previousDeliveryInterval,
                        years: Number(event.target.value),
                      },
                    }))
                  }
                  onBlur={() => markTouched("previousDeliveryInterval.years")}
                />
              </div>
            )}
          </fieldset>
        </FormSection>

        <FormSection
          title="Riwayat Kehamilan Sebelumnya"
          description="Pilih seluruh riwayat yang sesuai. Normal tidak dapat digabungkan dengan komplikasi."
        >
          <fieldset>
            <legend className="sr-only">Riwayat Kehamilan Sebelumnya</legend>

            <div className="grid gap-3 md:grid-cols-2">
              {previousPregnancyHistoryOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  checked={form.previousPregnancyHistory.includes(option.value)}
                  onChange={(event) =>
                    togglePreviousPregnancyHistory(
                      option.value,
                      event.target.checked,
                    )
                  }
                />
              ))}
            </div>

            {getVisibleError("previousPregnancyHistory") && (
              <p className="mt-3 text-sm text-red-600">
                {getVisibleError("previousPregnancyHistory")}
              </p>
            )}
          </fieldset>
        </FormSection>

        <FormSection
          title="Penyakit Penyerta"
          description="Pilih seluruh penyakit penyerta yang dimiliki pasien."
        >
          <fieldset>
            <legend className="sr-only">Penyakit Penyerta</legend>

            <div className="grid gap-3 md:grid-cols-2">
              {comorbidityOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  checked={form.comorbidities.includes(option.value)}
                  onChange={(event) =>
                    toggleComorbidity(option.value, event.target.checked)
                  }
                />
              ))}
            </div>

            {getVisibleError("comorbidities") && (
              <p className="mt-3 text-sm text-red-600">
                {getVisibleError("comorbidities")}
              </p>
            )}
          </fieldset>
        </FormSection>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || isInvalid}
          >
            Simpan Skrining Awal
          </Button>
        </div>
      </div>

      <aside>
        <InitialScreeningRiskPreview result={riskResult} />
      </aside>
    </form>
  );
}
