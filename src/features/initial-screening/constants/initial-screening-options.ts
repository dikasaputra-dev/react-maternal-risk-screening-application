import type {
  Comorbidity,
  ConsciousnessLevel,
  PreviousPregnancyHistory,
} from "../types/initial-screening.type";

export type InitialScreeningOption<TValue extends string> = {
  label: string;
  value: TValue;
  description?: string;
};

export const consciousnessOptions: InitialScreeningOption<ConsciousnessLevel>[] =
  [
    {
      label: "Compos Mentis",
      value: "compos_mentis",
      description: "Pasien sadar penuh dan dapat merespons dengan baik.",
    },
    {
      label: "Apatis",
      value: "apathy",
      description: "Pasien tampak acuh dan merespons rangsangan dengan lambat.",
    },
    {
      label: "Somnolen",
      value: "somnolence",
      description: "Pasien mengantuk tetapi masih dapat dibangunkan.",
    },
    {
      label: "Stupor",
      value: "stupor",
      description: "Pasien hanya merespons rangsangan kuat.",
    },
    {
      label: "Koma",
      value: "coma",
      description: "Pasien tidak memberikan respons terhadap rangsangan.",
    },
  ];

export const previousPregnancyHistoryOptions: InitialScreeningOption<PreviousPregnancyHistory>[] =
  [
    {
      label: "Normal",
      value: "normal",
      description: "Tidak terdapat komplikasi pada kehamilan sebelumnya.",
    },
    {
      label: "Diabetes Gestasional",
      value: "gestational_diabetes",
    },
    {
      label: "Hipertensi",
      value: "hypertension",
    },
    {
      label: "Preeklamsi",
      value: "preeclampsia",
    },
    {
      label: "Eklampsi",
      value: "eclampsia",
    },
  ];

export const comorbidityOptions: InitialScreeningOption<Comorbidity>[] = [
  {
    label: "Tidak Ada",
    value: "none",
  },
  {
    label: "Asma",
    value: "asthma",
  },
  {
    label: "Penyakit Jantung",
    value: "heart_disease",
  },
  {
    label: "Hipertensi",
    value: "hypertension",
  },
  {
    label: "Perdarahan",
    value: "bleeding",
  },
  {
    label: "Anemia",
    value: "anemia",
  },
];
