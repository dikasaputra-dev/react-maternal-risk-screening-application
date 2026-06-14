import type {
  PatientRiskFilter,
  PatientStatusFilter,
} from "../types/patient-list.type";

export const patientStatusFilterOptions: {
  label: string;
  value: PatientStatusFilter;
}[] = [
  {
    label: "Semua Status",
    value: "all",
  },
  {
    label: "Belum Dimulai",
    value: "not_started",
  },
  {
    label: "Pelayanan Berjalan",
    value: "active",
  },
  {
    label: "Dokumentasi Selesai",
    value: "completed",
  },
];

export const patientRiskFilterOptions: {
  label: string;
  value: PatientRiskFilter;
}[] = [
  {
    label: "Semua Risiko",
    value: "all",
  },
  {
    label: "Belum Dinilai",
    value: "unassessed",
  },
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

export const patientPageSizeOptions = [
  {
    label: "5 data",
    value: "5",
  },
  {
    label: "10 data",
    value: "10",
  },
  {
    label: "20 data",
    value: "20",
  },
];
