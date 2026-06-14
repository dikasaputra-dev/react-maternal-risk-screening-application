import type {
  ClinicalDecisionType,
  MedicationFluidType,
} from "../types/clinical-action.type";

export type ClinicalActionOption<TValue extends string> = {
  label: string;
  value: TValue;
  description?: string;
};

function createLabelMap<TValue extends string>(
  options: ClinicalActionOption<TValue>[],
) {
  return Object.fromEntries(
    options.map((option) => [option.value, option.label]),
  ) as Record<TValue, string>;
}

export const medicationFluidOptions: ClinicalActionOption<MedicationFluidType>[] =
  [
    {
      label: "Tidak Ada",
      value: "none",
      description: "Tidak ada pemberian obat atau cairan.",
    },
    {
      label: "NaCl",
      value: "nacl",
      description: "Pemberian cairan Natrium Klorida.",
    },
    {
      label: "Ringer Laktat (RL)",
      value: "ringer_lactate",
      description: "Pemberian cairan Ringer Laktat.",
    },
    {
      label: "Drip Oksitosin",
      value: "oxytocin_drip",
      description: "Pemberian oksitosin melalui cairan infus.",
    },
    {
      label: "MgSO4",
      value: "magnesium_sulfate",
      description: "Pemberian Magnesium Sulfat.",
    },
  ];

export const clinicalDecisionOptions: ClinicalActionOption<ClinicalDecisionType>[] =
  [
    {
      label: "Observasi",
      value: "observation",
      description: "Pasien tetap dipantau tanpa tindakan invasif.",
    },
    {
      label: "Tindakan",
      value: "procedure",
      description: "Diperlukan tindakan klinis tertentu.",
    },
  ];

export const medicationFluidLabelMap = createLabelMap(medicationFluidOptions);

export const clinicalDecisionLabelMap = createLabelMap(clinicalDecisionOptions);
