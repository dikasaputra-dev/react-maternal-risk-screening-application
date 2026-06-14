import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

import type {
  LaborMonitoringFormValues,
  LaborMonitoringRiskResult,
} from "../types/labor-monitoring.type";

type RiskAccumulator = {
  score: number;
  factors: string[];
  criticalFactors: string[];
};

function addRiskFactor(
  accumulator: RiskAccumulator,
  condition: boolean,
  points: number,
  factor: string,
) {
  if (!condition) {
    return;
  }

  accumulator.score += points;
  accumulator.factors.push(factor);
}

function addCriticalFactor(
  accumulator: RiskAccumulator,
  condition: boolean,
  points: number,
  factor: string,
) {
  if (!condition) {
    return;
  }

  accumulator.score += points;
  accumulator.factors.push(factor);
  accumulator.criticalFactors.push(factor);
}

function determineCategory(
  score: number,
  hasCriticalFactor: boolean,
): RiskCategory {
  if (hasCriticalFactor || score >= 60) {
    return "high_risk";
  }

  if (score >= 25) {
    return "moderate_risk";
  }

  return "low_risk";
}

/**
 * Kalkulasi provisional untuk mock API dan preview frontend.
 *
 * Backend yang telah divalidasi tim klinis harus menjadi sumber
 * kebenaran untuk penggunaan production.
 */
export function calculateLaborMonitoringRisk(
  values: LaborMonitoringFormValues,
): LaborMonitoringRiskResult {
  const accumulator: RiskAccumulator = {
    score: 0,
    factors: [],
    criticalFactors: [],
  };

  const {
    vitalSigns,
    fetalHeartRate,
    fetalMovement,
    contractions,
    membranes,
    urine,
  } = values;

  addCriticalFactor(
    accumulator,
    vitalSigns.systolicBloodPressure >= 160 ||
      vitalSigns.diastolicBloodPressure >= 110,
    60,
    "Tekanan darah menunjukkan hipertensi berat.",
  );

  addRiskFactor(
    accumulator,
    (vitalSigns.systolicBloodPressure >= 140 &&
      vitalSigns.systolicBloodPressure < 160) ||
      (vitalSigns.diastolicBloodPressure >= 90 &&
        vitalSigns.diastolicBloodPressure < 110),
    25,
    "Tekanan darah menunjukkan hipertensi.",
  );

  addRiskFactor(
    accumulator,
    vitalSigns.pulse < 60 || vitalSigns.pulse > 120,
    15,
    "Frekuensi nadi berada di luar rentang normal.",
  );

  addRiskFactor(
    accumulator,
    vitalSigns.respiratoryRate < 12 || vitalSigns.respiratoryRate > 24,
    15,
    "Frekuensi napas berada di luar rentang normal.",
  );

  addRiskFactor(
    accumulator,
    vitalSigns.temperature >= 38,
    15,
    "Suhu tubuh menunjukkan demam.",
  );

  addCriticalFactor(
    accumulator,
    vitalSigns.oxygenSaturation < 90,
    60,
    "Saturasi oksigen berada di bawah 90%.",
  );

  addRiskFactor(
    accumulator,
    vitalSigns.oxygenSaturation >= 90 && vitalSigns.oxygenSaturation < 95,
    40,
    "Saturasi oksigen berada di bawah 95%.",
  );

  addCriticalFactor(
    accumulator,
    fetalHeartRate < 100 || fetalHeartRate > 180,
    60,
    "Denyut jantung janin berada pada rentang kritis.",
  );

  addRiskFactor(
    accumulator,
    (fetalHeartRate >= 100 && fetalHeartRate < 110) ||
      (fetalHeartRate > 160 && fetalHeartRate <= 180),
    30,
    "Denyut jantung janin berada di luar rentang normal.",
  );

  addRiskFactor(
    accumulator,
    fetalMovement === "reduced",
    25,
    "Gerak janin dilaporkan berkurang.",
  );

  addCriticalFactor(
    accumulator,
    fetalMovement === "not_felt",
    60,
    "Gerak janin tidak terasa.",
  );

  addRiskFactor(
    accumulator,
    contractions.frequencyPer10Minutes >= 5,
    20,
    "Frekuensi kontraksi terlalu sering.",
  );

  addRiskFactor(
    accumulator,
    contractions.durationSeconds > 90,
    15,
    "Durasi kontraksi lebih dari 90 detik.",
  );

  addRiskFactor(
    accumulator,
    membranes.status === "ruptured" &&
      (membranes.color === "green" || membranes.color === "brown"),
    30,
    "Warna air ketuban menunjukkan kemungkinan mekonium.",
  );

  addCriticalFactor(
    accumulator,
    membranes.status === "ruptured" && membranes.color === "bloody",
    60,
    "Air ketuban bercampur darah.",
  );

  addRiskFactor(
    accumulator,
    urine.protein === "positive",
    25,
    "Protein urine menunjukkan hasil positif.",
  );

  addRiskFactor(
    accumulator,
    urine.acetone === "positive",
    15,
    "Aseton urine menunjukkan hasil positif.",
  );

  const score = Math.min(100, accumulator.score);

  return {
    score,
    category: determineCategory(score, accumulator.criticalFactors.length > 0),
    factors: accumulator.factors,
    criticalFactors: accumulator.criticalFactors,
  };
}
