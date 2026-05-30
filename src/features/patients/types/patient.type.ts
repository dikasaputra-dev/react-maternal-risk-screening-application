export type RiskCategory = "no_risk" | "low_risk" | "high_risk";

export type Patient = {
  id: string;
  nik: string;
  fullName: string;
  age: number;
  phone?: string;
  lastScreeningDate: string;
  riskCategory: RiskCategory;
};
