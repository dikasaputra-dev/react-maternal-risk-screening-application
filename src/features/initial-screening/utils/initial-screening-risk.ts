import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

import type {
  InitialScreeningFormValues,
  InitialScreeningRiskResult,
} from "../types/initial-screening.type";

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

function addCriticalRiskFactor(
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

function determineRiskCategory(
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
 * Development-only provisional risk engine.
 *
 * Aturan ini digunakan untuk kebutuhan preview UI dan mock API.
 * Pada production, hasil dari backend yang sudah divalidasi tim klinis
 * harus menjadi sumber kebenaran.
 */
export function calculateInitialScreeningRisk(
  values: InitialScreeningFormValues,
  maternalAge: number,
): InitialScreeningRiskResult {
  const accumulator: RiskAccumulator = {
    score: 0,
    factors: [],
    criticalFactors: [],
  };

  const {
    vitalSigns,
    obstetricStatus,
    previousDeliveryInterval,
    previousPregnancyHistory,
    comorbidities,
  } = values;

  addRiskFactor(
    accumulator,
    maternalAge < 20 || maternalAge > 35,
    10,
    "Usia ibu berada di luar rentang 20–35 tahun.",
  );

  addRiskFactor(
    accumulator,
    values.heightCm < 145,
    10,
    "Tinggi badan ibu kurang dari 145 cm.",
  );

  addCriticalRiskFactor(
    accumulator,
    vitalSigns.consciousness !== "compos_mentis",
    60,
    "Tingkat kesadaran pasien mengalami penurunan.",
  );

  addCriticalRiskFactor(
    accumulator,
    vitalSigns.systolicBloodPressure >= 160 ||
      vitalSigns.diastolicBloodPressure >= 110,
    60,
    "Tekanan darah berada pada kategori hipertensi berat.",
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
    20,
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

  addCriticalRiskFactor(
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

  addRiskFactor(
    accumulator,
    obstetricStatus.gestationalAgeWeeks < 37 ||
      obstetricStatus.gestationalAgeWeeks > 42,
    15,
    "Usia kehamilan berada di luar rentang aterm.",
  );

  addRiskFactor(
    accumulator,
    obstetricStatus.gravida === 1 || obstetricStatus.gravida >= 5,
    10,
    "Status gravida termasuk primigravida atau grande multigravida.",
  );

  addRiskFactor(
    accumulator,
    obstetricStatus.para >= 4,
    10,
    "Riwayat persalinan menunjukkan grand multipara.",
  );

  addRiskFactor(
    accumulator,
    obstetricStatus.abortus >= 2,
    15,
    "Terdapat riwayat abortus berulang.",
  );

  addRiskFactor(
    accumulator,
    previousDeliveryInterval.status === "years" &&
      previousDeliveryInterval.years < 2,
    10,
    "Jarak persalinan sebelumnya kurang dari dua tahun.",
  );

  addRiskFactor(
    accumulator,
    previousPregnancyHistory.includes("gestational_diabetes"),
    15,
    "Terdapat riwayat diabetes gestasional.",
  );

  addRiskFactor(
    accumulator,
    previousPregnancyHistory.includes("hypertension"),
    15,
    "Terdapat riwayat hipertensi pada kehamilan sebelumnya.",
  );

  addRiskFactor(
    accumulator,
    previousPregnancyHistory.includes("preeclampsia"),
    25,
    "Terdapat riwayat preeklamsi.",
  );

  addCriticalRiskFactor(
    accumulator,
    previousPregnancyHistory.includes("eclampsia"),
    60,
    "Terdapat riwayat eklampsi.",
  );

  addRiskFactor(
    accumulator,
    comorbidities.includes("asthma"),
    10,
    "Pasien memiliki penyakit penyerta asma.",
  );

  addRiskFactor(
    accumulator,
    comorbidities.includes("heart_disease"),
    35,
    "Pasien memiliki penyakit jantung.",
  );

  addRiskFactor(
    accumulator,
    comorbidities.includes("hypertension"),
    20,
    "Pasien memiliki penyakit penyerta hipertensi.",
  );

  addCriticalRiskFactor(
    accumulator,
    comorbidities.includes("bleeding"),
    60,
    "Pasien mengalami atau memiliki kondisi perdarahan.",
  );

  addRiskFactor(
    accumulator,
    comorbidities.includes("anemia"),
    15,
    "Pasien memiliki penyakit penyerta anemia.",
  );

  const score = Math.min(100, accumulator.score);

  return {
    score,
    category: determineRiskCategory(
      score,
      accumulator.criticalFactors.length > 0,
    ),
    factors: accumulator.factors,
    criticalFactors: accumulator.criticalFactors,
  };
}
