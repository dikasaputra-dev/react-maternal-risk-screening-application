import type { EducationLevel, Religion } from "../types/patient.type";

export type SelectOption<TValue extends string> = {
  label: string;
  value: TValue;
};

export const religionOptions: SelectOption<Religion>[] = [
  {
    label: "Islam",
    value: "islam",
  },
  {
    label: "Kristen Protestan",
    value: "protestant",
  },
  {
    label: "Katolik",
    value: "catholic",
  },
  {
    label: "Hindu",
    value: "hindu",
  },
  {
    label: "Buddha",
    value: "buddhist",
  },
  {
    label: "Konghucu",
    value: "confucian",
  },
  {
    label: "Lainnya",
    value: "other",
  },
  {
    label: "Tidak Disebutkan",
    value: "not_specified",
  },
];

export const educationOptions: SelectOption<EducationLevel>[] = [
  {
    label: "Tidak Sekolah",
    value: "no_formal_education",
  },
  {
    label: "SD/Sederajat",
    value: "elementary_school",
  },
  {
    label: "SMP/Sederajat",
    value: "junior_high_school",
  },
  {
    label: "SMA/SMK/Sederajat",
    value: "senior_high_school",
  },
  {
    label: "Diploma",
    value: "diploma",
  },
  {
    label: "Sarjana",
    value: "bachelor",
  },
  {
    label: "Magister",
    value: "master",
  },
  {
    label: "Doktor",
    value: "doctorate",
  },
  {
    label: "Lainnya",
    value: "other",
  },
];

export const religionLabelMap: Record<Religion, string> = Object.fromEntries(
  religionOptions.map((option) => [option.value, option.label]),
) as Record<Religion, string>;

export const educationLabelMap: Record<EducationLevel, string> =
  Object.fromEntries(
    educationOptions.map((option) => [option.value, option.label]),
  ) as Record<EducationLevel, string>;
