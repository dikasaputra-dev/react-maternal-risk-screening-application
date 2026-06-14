import type { RiskCategory, RiskSource } from "../types/risk.type";

export type RiskBadgeVariant = "success" | "warning" | "danger";

export type RiskCategoryConfig = {
  label: string;
  description: string;
  badgeVariant: RiskBadgeVariant;
};

export const riskCategoryConfig: Record<RiskCategory, RiskCategoryConfig> = {
  low_risk: {
    label: "Risiko Rendah",
    description:
      "Hasil penilaian menunjukkan risiko rendah berdasarkan data klinis yang tersedia.",
    badgeVariant: "success",
  },

  moderate_risk: {
    label: "Risiko Sedang",
    description:
      "Hasil penilaian menunjukkan risiko sedang dan memerlukan pemantauan lebih lanjut.",
    badgeVariant: "warning",
  },

  high_risk: {
    label: "Risiko Tinggi",
    description:
      "Hasil penilaian menunjukkan risiko tinggi dan memerlukan perhatian klinis segera.",
    badgeVariant: "danger",
  },
};

export const riskSourceLabelMap: Record<RiskSource, string> = {
  initial_screening: "Skrining Awal",
  labor_monitoring: "Pemantauan Persalinan",
};

export const riskCategoryOptions: {
  label: string;
  value: RiskCategory;
}[] = [
  {
    label: "Risiko Rendah",
    value: "low_risk",
  },
  {
    label: "Risiko Sedang",
    value: "moderate_risk",
  },
  {
    label: "Risiko Tinggi",
    value: "high_risk",
  },
];
