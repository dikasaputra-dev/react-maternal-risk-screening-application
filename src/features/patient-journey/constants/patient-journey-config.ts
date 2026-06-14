import type {
  ClinicalTimelineEventType,
  JourneyMilestoneStatus,
  PatientJourneyStatus,
} from "../types/patient-journey.type";

export type PatientJourneyBadgeVariant =
  | "default"
  | "info"
  | "success"
  | "warning";

export type PatientJourneyStatusConfig = {
  label: string;
  description: string;
  badgeVariant: PatientJourneyBadgeVariant;
};

export const patientJourneyStatusConfig: Record<
  PatientJourneyStatus,
  PatientJourneyStatusConfig
> = {
  not_started: {
    label: "Belum Dimulai",
    description: "Pasien belum menyelesaikan skrining awal.",
    badgeVariant: "default",
  },

  active: {
    label: "Pelayanan Berjalan",
    description:
      "Pelayanan pasien masih berlangsung dan dokumentasi belum seluruhnya selesai.",
    badgeVariant: "info",
  },

  completed: {
    label: "Dokumentasi Selesai",
    description: "Luaran persalinan dan luaran kelahiran bayi telah dicatat.",
    badgeVariant: "success",
  },
};

export const journeyMilestoneStatusConfig: Record<
  JourneyMilestoneStatus,
  {
    label: string;
    badgeVariant: PatientJourneyBadgeVariant;
  }
> = {
  not_started: {
    label: "Belum Dimulai",
    badgeVariant: "default",
  },

  in_progress: {
    label: "Berjalan",
    badgeVariant: "info",
  },

  completed: {
    label: "Selesai",
    badgeVariant: "success",
  },
};

export const clinicalTimelineEventConfig: Record<
  ClinicalTimelineEventType,
  {
    label: string;
    markerClassName: string;
  }
> = {
  initial_screening: {
    label: "Skrining Awal",
    markerClassName: "border-blue-200 bg-blue-100 text-blue-700",
  },

  labor_monitoring: {
    label: "Pemantauan Persalinan",
    markerClassName: "border-violet-200 bg-violet-100 text-violet-700",
  },

  clinical_action: {
    label: "Tindakan",
    markerClassName: "border-amber-200 bg-amber-100 text-amber-700",
  },

  delivery_outcome: {
    label: "Luaran Persalinan",
    markerClassName: "border-emerald-200 bg-emerald-100 text-emerald-700",
  },

  newborn_outcome: {
    label: "Luaran Kelahiran Bayi",
    markerClassName: "border-cyan-200 bg-cyan-100 text-cyan-700",
  },
};
