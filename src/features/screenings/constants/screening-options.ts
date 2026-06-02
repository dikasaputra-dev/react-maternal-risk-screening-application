import type {
  ChecklistKey,
  MedicalHistoryKey,
} from "@/features/screenings/types/screening.type";

export const medicalHistoryOptions: {
  key: MedicalHistoryKey;
  label: string;
  description: string;
}[] = [
  {
    key: "diabetes",
    label: "Diabetes",
    description: "Riwayat diabetes sebelum atau saat kehamilan.",
  },
  {
    key: "hypertension",
    label: "Hipertensi",
    description: "Riwayat tekanan darah tinggi.",
  },
  {
    key: "asthma",
    label: "Asma",
    description: "Riwayat gangguan pernapasan.",
  },
  {
    key: "heart_disease",
    label: "Penyakit Jantung",
    description: "Riwayat penyakit jantung.",
  },
  {
    key: "preeclampsia_history",
    label: "Riwayat Preeklampsia",
    description: "Pernah mengalami preeklampsia sebelumnya.",
  },
];

export const checklistOptions: {
  key: ChecklistKey;
  label: string;
}[] = [
  {
    key: "leopold_done",
    label: "Pemeriksaan Leopold sudah dilakukan",
  },
  {
    key: "fetal_heartbeat_checked",
    label: "Denyut jantung janin sudah diperiksa",
  },
  {
    key: "urine_protein_checked",
    label: "Protein urine sudah diperiksa",
  },
  {
    key: "blood_pressure_checked",
    label: "Tekanan darah sudah diperiksa",
  },
];
