import type { DeliveryOutcomeType } from "../types/delivery-outcome.type";

export type DeliveryOutcomeOption = {
  value: DeliveryOutcomeType;
  label: string;
  description: string;
};

export const deliveryOutcomeOptions: DeliveryOutcomeOption[] = [
  {
    value: "spontaneous",
    label: "Persalinan Spontan",
    description:
      "Persalinan berlangsung secara spontan tanpa tindakan induksi atau operasi.",
  },
  {
    value: "induced_vaginal",
    label: "Induksi, Persalinan Pervaginam",
    description:
      "Persalinan diawali dengan induksi dan berakhir melalui persalinan pervaginam.",
  },
  {
    value: "induced_vacuum_extraction",
    label: "Induksi, Persalinan Vacum Ekstraksi",
    description:
      "Persalinan diawali dengan induksi dan dibantu menggunakan vacum ekstraksi.",
  },
  {
    value: "induced_cesarean",
    label: "Induksi, Persalinan SC",
    description:
      "Persalinan diawali dengan induksi dan dilanjutkan melalui tindakan Sectio Caesarea.",
  },
  {
    value: "cesarean",
    label: "Persalinan SC",
    description:
      "Persalinan dilakukan melalui tindakan Sectio Caesarea tanpa induksi persalinan sebelumnya.",
  },
];

export const deliveryOutcomeConfig: Record<
  DeliveryOutcomeType,
  DeliveryOutcomeOption
> = Object.fromEntries(
  deliveryOutcomeOptions.map((option) => [option.value, option]),
) as Record<DeliveryOutcomeType, DeliveryOutcomeOption>;
