import type { LaborMonitoringEntry } from "../types/labor-monitoring.type";

export const laborMonitoringMock: Record<string, LaborMonitoringEntry[]> = {
  "3": [
    {
      id: "monitoring-3-2",
      patientId: "3",
      recordedAt: "2026-06-14T11:30:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 145,
        diastolicBloodPressure: 95,
        pulse: 96,
        respiratoryRate: 22,
        temperature: 36.8,
        oxygenSaturation: 96,
      },

      fetalHeartRate: 166,
      fetalMovement: "reduced",

      contractions: {
        frequencyPer10Minutes: 4,
        durationSeconds: 60,
        intensity: "strong",
      },

      cervicalDilationCm: 6,
      headDescent: "hodge_iii",

      membranes: {
        status: "ruptured",
        rupturedAt: "2026-06-14T10:45:00.000Z",
        color: "green",
      },

      urine: {
        volumeMl: 200,
        protein: "positive",
        acetone: "negative",
      },

      riskScore: 52,
      riskCategory: "moderate_risk",

      riskFactors: [
        "Tekanan darah menunjukkan hipertensi.",
        "Gerak janin dilaporkan berkurang.",
        "Warna air ketuban menunjukkan kemungkinan mekonium.",
      ],

      criticalFactors: [],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
    {
      id: "monitoring-3-1",
      patientId: "3",
      recordedAt: "2026-06-14T09:30:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 125,
        diastolicBloodPressure: 80,
        pulse: 84,
        respiratoryRate: 20,
        temperature: 36.5,
        oxygenSaturation: 98,
      },

      fetalHeartRate: 144,
      fetalMovement: "active",

      contractions: {
        frequencyPer10Minutes: 3,
        durationSeconds: 45,
        intensity: "moderate",
      },

      cervicalDilationCm: 4,
      headDescent: "hodge_ii",

      membranes: {
        status: "intact",
        rupturedAt: null,
        color: null,
      },

      urine: {
        volumeMl: 250,
        protein: "negative",
        acetone: "negative",
      },

      riskScore: 18,
      riskCategory: "low_risk",
      riskFactors: [],
      criticalFactors: [],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
  ],

  "4": [
    {
      id: "monitoring-4-1",
      patientId: "4",
      recordedAt: "2026-06-14T12:45:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 170,
        diastolicBloodPressure: 115,
        pulse: 128,
        respiratoryRate: 28,
        temperature: 38.2,
        oxygenSaturation: 92,
      },

      fetalHeartRate: 185,
      fetalMovement: "not_felt",

      contractions: {
        frequencyPer10Minutes: 5,
        durationSeconds: 95,
        intensity: "strong",
      },

      cervicalDilationCm: 7,
      headDescent: "hodge_iii",

      membranes: {
        status: "ruptured",
        rupturedAt: "2026-06-14T12:10:00.000Z",
        color: "bloody",
      },

      urine: {
        volumeMl: 100,
        protein: "positive",
        acetone: "positive",
      },

      riskScore: 77,
      riskCategory: "high_risk",

      riskFactors: [
        "Tekanan darah menunjukkan hipertensi berat.",
        "Denyut jantung janin berada pada rentang kritis.",
        "Gerak janin tidak terasa.",
        "Air ketuban bercampur darah.",
      ],

      criticalFactors: [
        "Tekanan darah menunjukkan hipertensi berat.",
        "Denyut jantung janin berada pada rentang kritis.",
        "Gerak janin tidak terasa.",
        "Air ketuban bercampur darah.",
      ],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
  ],

  "7": [
    {
      id: "monitoring-7-1",
      patientId: "7",
      recordedAt: "2026-06-14T07:30:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 120,
        diastolicBloodPressure: 78,
        pulse: 82,
        respiratoryRate: 20,
        temperature: 36.4,
        oxygenSaturation: 99,
      },

      fetalHeartRate: 140,
      fetalMovement: "active",

      contractions: {
        frequencyPer10Minutes: 2,
        durationSeconds: 35,
        intensity: "weak",
      },

      cervicalDilationCm: 3,
      headDescent: "hodge_i",

      membranes: {
        status: "intact",
        rupturedAt: null,
        color: null,
      },

      urine: {
        volumeMl: 300,
        protein: "negative",
        acetone: "negative",
      },

      riskScore: 18,
      riskCategory: "low_risk",
      riskFactors: [],
      criticalFactors: [],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
  ],

  "9": [
    {
      id: "monitoring-9-1",
      patientId: "9",
      recordedAt: "2026-06-14T06:50:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 145,
        diastolicBloodPressure: 94,
        pulse: 94,
        respiratoryRate: 22,
        temperature: 36.7,
        oxygenSaturation: 96,
      },

      fetalHeartRate: 164,
      fetalMovement: "active",

      contractions: {
        frequencyPer10Minutes: 4,
        durationSeconds: 55,
        intensity: "moderate",
      },

      cervicalDilationCm: 5,
      headDescent: "hodge_ii",

      membranes: {
        status: "intact",
        rupturedAt: null,
        color: null,
      },

      urine: {
        volumeMl: 180,
        protein: "positive",
        acetone: "negative",
      },

      riskScore: 31,
      riskCategory: "moderate_risk",

      riskFactors: [
        "Tekanan darah menunjukkan hipertensi.",
        "Protein urine menunjukkan hasil positif.",
      ],

      criticalFactors: [],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
  ],

  "11": [
    {
      id: "monitoring-11-1",
      patientId: "11",
      recordedAt: "2026-06-14T05:45:00.000Z",

      vitalSigns: {
        systolicBloodPressure: 165,
        diastolicBloodPressure: 112,
        pulse: 122,
        respiratoryRate: 26,
        temperature: 37.8,
        oxygenSaturation: 91,
      },

      fetalHeartRate: 175,
      fetalMovement: "reduced",

      contractions: {
        frequencyPer10Minutes: 5,
        durationSeconds: 80,
        intensity: "strong",
      },

      cervicalDilationCm: 8,
      headDescent: "hodge_iv",

      membranes: {
        status: "ruptured",
        rupturedAt: "2026-06-14T05:15:00.000Z",
        color: "brown",
      },

      urine: {
        volumeMl: 120,
        protein: "positive",
        acetone: "positive",
      },

      riskScore: 69,
      riskCategory: "high_risk",

      riskFactors: [
        "Tekanan darah menunjukkan hipertensi berat.",
        "Saturasi oksigen berada di bawah 95%.",
        "Gerak janin dilaporkan berkurang.",
      ],

      criticalFactors: ["Tekanan darah menunjukkan hipertensi berat."],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },
    },
  ],
};
