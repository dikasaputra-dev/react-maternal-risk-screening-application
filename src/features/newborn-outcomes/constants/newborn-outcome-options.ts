import type { NewbornOutcomeType } from "../types/newborn-outcome.type";

export type NewbornOutcomeOption = {
  value: NewbornOutcomeType;
  label: string;
  description: string;
};

export const newbornOutcomeOptions: NewbornOutcomeOption[] = [
  {
    value: "apgar",
    label: "APGAR Score",
    description: "Bayi lahir dan dilakukan penilaian APGAR dengan skor 0–10.",
  },
  {
    value: "iufd",
    label: "IUFD",
    description:
      "Intrauterine Fetal Death atau kematian janin di dalam kandungan.",
  },
  {
    value: "stillbirth",
    label: "Stillbirth",
    description: "Bayi lahir tanpa tanda-tanda kehidupan.",
  },
];

export const newbornOutcomeConfig: Record<
  NewbornOutcomeType,
  NewbornOutcomeOption
> = Object.fromEntries(
  newbornOutcomeOptions.map((option) => [option.value, option]),
) as Record<NewbornOutcomeType, NewbornOutcomeOption>;
