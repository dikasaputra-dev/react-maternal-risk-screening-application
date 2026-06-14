import { getAuthSession } from "@/features/auth/utils/auth-storage";
import type { PatientRiskSummary } from "@/features/clinical-risk/types/risk.type";
import {
  findPatientMock,
  updatePatientLatestRiskMock,
} from "@/features/patients/api/patient-mock-storage";
import {
  ensurePatientWorkflowMock,
  setLaborMonitoringCountWorkflowMock,
} from "@/features/patients/api/patient-workflow-mock-api";

import { laborMonitoringMock } from "../data/labor-monitoring.mock";
import type {
  LaborMonitoringEntry,
  LaborMonitoringFormValues,
} from "../types/labor-monitoring.type";
import { calculateLaborMonitoringRisk } from "../utils/labor-monitoring-risk";

const STORAGE_KEY = "maternity_labor_monitoring_mock_v1";

function delay(milliseconds = 450) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function seedStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(laborMonitoringMock));
  }
}

function readStorage(): Record<string, LaborMonitoringEntry[]> {
  seedStorage();

  const rawData = localStorage.getItem(STORAGE_KEY);

  if (!rawData) {
    return {};
  }

  try {
    const parsedData: unknown = JSON.parse(rawData);

    if (
      !parsedData ||
      typeof parsedData !== "object" ||
      Array.isArray(parsedData)
    ) {
      return {};
    }

    return parsedData as Record<string, LaborMonitoringEntry[]>;
  } catch {
    return {};
  }
}

function writeStorage(entries: Record<string, LaborMonitoringEntry[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function resetLaborMonitoringMockStorage() {
  writeStorage(laborMonitoringMock);
}

export async function getLaborMonitoringEntriesMock(patientId: string) {
  await delay();

  const entries = readStorage()[patientId] ?? [];

  return [...entries].sort(
    (firstEntry, secondEntry) =>
      new Date(secondEntry.recordedAt).getTime() -
      new Date(firstEntry.recordedAt).getTime(),
  );
}

export async function createLaborMonitoringEntryMock(
  patientId: string,
  values: LaborMonitoringFormValues,
) {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  const workflow = ensurePatientWorkflowMock(patientId);

  if (!workflow.hasInitialScreening) {
    throw new Error(
      "Skrining awal harus diselesaikan sebelum menambahkan pemantauan.",
    );
  }

  const riskResult = calculateLaborMonitoringRisk(values);

  const session = getAuthSession();

  const recordedAt = new Date(values.recordedAt).toISOString();

  const entry: LaborMonitoringEntry = {
    id: crypto.randomUUID(),
    patientId,

    recordedAt,

    vitalSigns: {
      ...values.vitalSigns,
    },

    fetalHeartRate: values.fetalHeartRate,

    fetalMovement: values.fetalMovement,

    contractions: {
      ...values.contractions,
    },

    cervicalDilationCm: values.cervicalDilationCm,

    headDescent: values.headDescent,

    membranes: {
      status: values.membranes.status,
      rupturedAt:
        values.membranes.status === "ruptured"
          ? new Date(values.membranes.rupturedAt).toISOString()
          : null,
      color:
        values.membranes.status === "ruptured" && values.membranes.color
          ? values.membranes.color
          : null,
    },

    urine: {
      ...values.urine,
    },

    riskScore: riskResult.score,

    riskCategory: riskResult.category,

    riskFactors: riskResult.factors,

    criticalFactors: riskResult.criticalFactors,

    recordedBy: {
      id: session?.user.id ?? "unknown",
      name: session?.user.username ?? "Unknown User",
    },
  };

  const storage = readStorage();

  const currentEntries = storage[patientId] ?? [];

  const updatedEntries = [entry, ...currentEntries];

  writeStorage({
    ...storage,
    [patientId]: updatedEntries,
  });

  const latestRisk: PatientRiskSummary = {
    score: entry.riskScore,
    category: entry.riskCategory,
    source: "labor_monitoring",
    assessedAt: recordedAt,
  };

  updatePatientLatestRiskMock(patientId, latestRisk);

  setLaborMonitoringCountWorkflowMock(
    patientId,
    updatedEntries.length,
    recordedAt,
  );

  return entry;
}
