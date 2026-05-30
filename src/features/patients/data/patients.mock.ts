import type { Patient } from "@/features/patients/types/patient.type";

export const patientsMock: Patient[] = [
  {
    id: "1",
    nik: "320101xxxxxxxxxx",
    fullName: "Siti Aminah",
    age: 28,
    phone: "081234567890",
    lastScreeningDate: "2026-05-21",
    riskCategory: "high_risk",
  },
  {
    id: "2",
    nik: "320102xxxxxxxxxx",
    fullName: "Dewi Lestari",
    age: 24,
    phone: "082112223333",
    lastScreeningDate: "2026-05-22",
    riskCategory: "low_risk",
  },
  {
    id: "3",
    nik: "320103xxxxxxxxxx",
    fullName: "Rina Marlina",
    age: 31,
    phone: "-",
    lastScreeningDate: "2026-05-23",
    riskCategory: "no_risk",
  },
];
