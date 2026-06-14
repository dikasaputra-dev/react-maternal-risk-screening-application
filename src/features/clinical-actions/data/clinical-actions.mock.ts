import type { ClinicalAction } from "../types/clinical-action.type";

export const clinicalActionsMock: Record<string, ClinicalAction[]> = {
  "3": [
    {
      id: "clinical-action-3-2",
      patientId: "3",
      recordedAt: "2026-06-14T11:45:00.000Z",

      medicationsAndFluids: [
        {
          type: "ringer_lactate",
          oxytocinUnits: null,
        },
        {
          type: "oxytocin_drip",
          oxytocinUnits: 5,
        },
      ],

      clinicalDecision: {
        type: "procedure",
        description:
          "Lanjutkan pemantauan ketat dan evaluasi progres persalinan setiap 30 menit.",
      },

      laboratoryResults: [
        {
          id: "lab-result-3-2-1",
          examinationDate: "2026-06-14",
          specimen: "Darah",
          result: "Hemoglobin 10,2 g/dL.",
        },
        {
          id: "lab-result-3-2-2",
          examinationDate: "2026-06-14",
          specimen: "Urine",
          result: "Protein urine positif satu.",
        },
      ],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },

      createdAt: "2026-06-14T11:45:00.000Z",
    },
    {
      id: "clinical-action-3-1",
      patientId: "3",
      recordedAt: "2026-06-14T09:45:00.000Z",

      medicationsAndFluids: [
        {
          type: "nacl",
          oxytocinUnits: null,
        },
      ],

      clinicalDecision: {
        type: "observation",
        description: null,
      },

      laboratoryResults: [],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },

      createdAt: "2026-06-14T09:45:00.000Z",
    },
  ],

  "4": [
    {
      id: "clinical-action-4-1",
      patientId: "4",
      recordedAt: "2026-06-14T12:50:00.000Z",

      medicationsAndFluids: [
        {
          type: "magnesium_sulfate",
          oxytocinUnits: null,
        },
        {
          type: "ringer_lactate",
          oxytocinUnits: null,
        },
      ],

      clinicalDecision: {
        type: "procedure",
        description:
          "Kolaborasi dengan dokter dan persiapan tindakan lanjutan karena kondisi risiko tinggi.",
      },

      laboratoryResults: [
        {
          id: "lab-result-4-1-1",
          examinationDate: "2026-06-14",
          specimen: "Darah",
          result: "Trombosit 95.000/µL.",
        },
      ],

      recordedBy: {
        id: "nurse-1",
        name: "Ns. Rini",
      },

      createdAt: "2026-06-14T12:50:00.000Z",
    },
  ],
};
