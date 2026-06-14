import {
  clinicalDecisionLabelMap,
  medicationFluidLabelMap,
} from "@/features/clinical-actions/constants/clinical-action-options";
import type { ClinicalAction } from "@/features/clinical-actions/types/clinical-action.type";
import type { DeliveryOutcome } from "@/features/delivery-outcomes/types/delivery-outcome.type";
import { deliveryOutcomeConfig } from "@/features/delivery-outcomes/constants/delivery-outcome-options";
import type { LaborMonitoringEntry } from "@/features/labor-monitoring/types/labor-monitoring.type";
import {
  fetalMovementLabelMap,
  headDescentLabelMap,
} from "@/features/labor-monitoring/constants/labor-monitoring-options";
import { newbornOutcomeConfig } from "@/features/newborn-outcomes/constants/newborn-outcome-options";
import type { NewbornOutcome } from "@/features/newborn-outcomes/types/newborn-outcome.type";
import { patientRoutes } from "@/features/patients/constants/patient-routes";
import type { PatientWorkflowStatus } from "@/features/patients/types/patient-workflow.type";
import type { Patient } from "@/features/patients/types/patient.type";

import type {
  ClinicalTimelineEvent,
  JourneyMilestone,
  JourneyMilestoneStatus,
  PatientJourneyData,
  PatientJourneyStatus,
} from "../types/patient-journey.type";

type BuildPatientJourneyParameters = {
  patient: Patient;
  workflow: PatientWorkflowStatus;
  monitoringEntries: LaborMonitoringEntry[];
  clinicalActions: ClinicalAction[];
  deliveryOutcome: DeliveryOutcome | null;
  newbornOutcome: NewbornOutcome | null;
};

function getMonitoringMilestoneStatus(
  workflow: PatientWorkflowStatus,
): JourneyMilestoneStatus {
  if (workflow.monitoringEntryCount === 0) {
    return "not_started";
  }

  if (workflow.hasDeliveryOutcome && workflow.hasNewbornOutcome) {
    return "completed";
  }

  return "in_progress";
}

function getPatientJourneyStatus(
  workflow: PatientWorkflowStatus,
): PatientJourneyStatus {
  if (!workflow.hasInitialScreening) {
    return "not_started";
  }

  if (workflow.hasDeliveryOutcome && workflow.hasNewbornOutcome) {
    return "completed";
  }

  return "active";
}

function buildMilestones(workflow: PatientWorkflowStatus): JourneyMilestone[] {
  return [
    {
      key: "initial_screening",
      label: "Skrining Awal",
      description: "Pengkajian awal kondisi ibu sebelum pemantauan persalinan.",
      status: workflow.hasInitialScreening ? "completed" : "not_started",
    },

    {
      key: "labor_monitoring",
      label: "Pemantauan Persalinan",
      description:
        "Dokumentasi berkala kondisi ibu dan janin selama persalinan.",
      status: getMonitoringMilestoneStatus(workflow),
    },

    {
      key: "delivery_outcome",
      label: "Luaran Persalinan",
      description: "Pencatatan metode akhir persalinan pasien.",
      status: workflow.hasDeliveryOutcome ? "completed" : "not_started",
    },

    {
      key: "newborn_outcome",
      label: "Luaran Kelahiran Bayi",
      description: "Pencatatan APGAR, IUFD, atau stillbirth.",
      status: workflow.hasNewbornOutcome ? "completed" : "not_started",
    },
  ];
}

function createInitialScreeningEvent(
  patient: Patient,
  workflow: PatientWorkflowStatus,
): ClinicalTimelineEvent | null {
  if (!workflow.hasInitialScreening) {
    return null;
  }

  const occurredAt = workflow.initialScreeningCompletedAt ?? workflow.updatedAt;

  const latestRisk =
    patient.latestRisk?.source === "initial_screening"
      ? {
          score: patient.latestRisk.score,
          category: patient.latestRisk.category,
        }
      : null;

  return {
    id: workflow.initialScreeningId ?? `initial-screening-${patient.id}`,

    type: "initial_screening",

    occurredAt,

    title: "Skrining awal diselesaikan",

    description:
      "Data pengkajian awal pasien telah dicatat dan tahap pemantauan persalinan telah dibuka.",

    details: [],

    recordedBy: null,

    risk: latestRisk,
  };
}

function createMonitoringEvents(
  entries: LaborMonitoringEntry[],
): ClinicalTimelineEvent[] {
  return entries.map((entry) => ({
    id: entry.id,

    type: "labor_monitoring",

    occurredAt: entry.recordedAt,

    title: "Pemantauan persalinan dicatat",

    description:
      "Kondisi ibu, janin, kontraksi, pembukaan, ketuban, dan urine telah diperbarui.",

    details: [
      {
        label: "Tekanan Darah",
        value: `${entry.vitalSigns.systolicBloodPressure}/${entry.vitalSigns.diastolicBloodPressure} mmHg`,
      },
      {
        label: "DJJ",
        value: `${entry.fetalHeartRate} x/menit`,
      },
      {
        label: "Gerak Janin",
        value: fetalMovementLabelMap[entry.fetalMovement],
      },
      {
        label: "Pembukaan",
        value: `${entry.cervicalDilationCm} cm`,
      },
      {
        label: "Penurunan Kepala",
        value: headDescentLabelMap[entry.headDescent],
      },
    ],

    recordedBy: entry.recordedBy.name,

    risk: {
      score: entry.riskScore,
      category: entry.riskCategory,
    },
  }));
}

function formatMedicationAndFluid(action: ClinicalAction) {
  return action.medicationsAndFluids
    .map((item) => {
      const label = medicationFluidLabelMap[item.type];

      if (item.type === "oxytocin_drip" && item.oxytocinUnits) {
        return `${label} ${item.oxytocinUnits} UI`;
      }

      return label;
    })
    .join(", ");
}

function createClinicalActionEvents(
  actions: ClinicalAction[],
): ClinicalTimelineEvent[] {
  return actions.map((action) => ({
    id: action.id,

    type: "clinical_action",

    occurredAt: action.recordedAt,

    title: "Tindakan klinis dicatat",

    description:
      action.clinicalDecision.description ??
      "Keputusan dan tindakan klinis pasien telah didokumentasikan.",

    details: [
      {
        label: "Obat dan Cairan",
        value: formatMedicationAndFluid(action) || "Tidak ada",
      },
      {
        label: "Keputusan",
        value: clinicalDecisionLabelMap[action.clinicalDecision.type],
      },
      {
        label: "Hasil Laboratorium",
        value: `${action.laboratoryResults.length} hasil`,
      },
    ],

    recordedBy: action.recordedBy.name,

    risk: null,
  }));
}

function createDeliveryOutcomeEvent(
  outcome: DeliveryOutcome | null,
): ClinicalTimelineEvent | null {
  if (!outcome) {
    return null;
  }

  const config = deliveryOutcomeConfig[outcome.outcomeType];

  return {
    id: outcome.id,

    type: "delivery_outcome",

    occurredAt: outcome.recordedAt,

    title: "Luaran persalinan dicatat",

    description:
      "Metode akhir persalinan pasien telah ditetapkan dan disimpan sebagai record immutable.",

    details: [
      {
        label: "Metode Persalinan",
        value: config.label,
      },
    ],

    recordedBy: outcome.recordedBy.name,

    risk: null,
  };
}

function createNewbornOutcomeEvent(
  outcome: NewbornOutcome | null,
): ClinicalTimelineEvent | null {
  if (!outcome) {
    return null;
  }

  const config = newbornOutcomeConfig[outcome.outcomeType];

  const details = [
    {
      label: "Luaran Bayi",
      value: config.label,
    },
  ];

  if (outcome.outcomeType === "apgar") {
    details.push({
      label: "APGAR Score",
      value: `${outcome.apgarScore} dari 10`,
    });
  }

  return {
    id: outcome.id,

    type: "newborn_outcome",

    occurredAt: outcome.recordedAt,

    title: "Luaran kelahiran bayi dicatat",

    description:
      "Hasil kelahiran bayi telah disimpan sebagai record immutable.",

    details,

    recordedBy: outcome.recordedBy.name,

    risk: null,
  };
}

function sortTimelineEvents(events: ClinicalTimelineEvent[]) {
  return [...events].sort(
    (firstEvent, secondEvent) =>
      new Date(secondEvent.occurredAt).getTime() -
      new Date(firstEvent.occurredAt).getTime(),
  );
}

export function buildPatientJourneyData({
  patient,
  workflow,
  monitoringEntries,
  clinicalActions,
  deliveryOutcome,
  newbornOutcome,
}: BuildPatientJourneyParameters): PatientJourneyData {
  const milestones = buildMilestones(workflow);

  const documentedMilestones = [
    workflow.hasInitialScreening,
    workflow.monitoringEntryCount > 0,
    workflow.hasDeliveryOutcome,
    workflow.hasNewbornOutcome,
  ].filter(Boolean).length;

  const totalMilestones = 4;

  const completionPercentage = Math.round(
    (documentedMilestones / totalMilestones) * 100,
  );

  const timelineEvents: ClinicalTimelineEvent[] = [];

  const initialScreeningEvent = createInitialScreeningEvent(patient, workflow);

  if (initialScreeningEvent) {
    timelineEvents.push(initialScreeningEvent);
  }

  timelineEvents.push(...createMonitoringEvents(monitoringEntries));

  timelineEvents.push(...createClinicalActionEvents(clinicalActions));

  const deliveryOutcomeEvent = createDeliveryOutcomeEvent(deliveryOutcome);

  if (deliveryOutcomeEvent) {
    timelineEvents.push(deliveryOutcomeEvent);
  }

  const newbornOutcomeEvent = createNewbornOutcomeEvent(newbornOutcome);

  if (newbornOutcomeEvent) {
    timelineEvents.push(newbornOutcomeEvent);
  }

  return {
    patientId: patient.id,

    status: getPatientJourneyStatus(workflow),

    documentedMilestones,

    totalMilestones,

    completionPercentage,

    monitoringEntryCount: workflow.monitoringEntryCount,

    clinicalActionCount: workflow.clinicalActionCount,

    latestRisk: patient.latestRisk,

    primaryClinicalRoute: workflow.hasInitialScreening
      ? patientRoutes.laborMonitoring(patient.id)
      : patientRoutes.initialScreening(patient.id),

    milestones,

    timeline: sortTimelineEvents(timelineEvents),
  };
}
