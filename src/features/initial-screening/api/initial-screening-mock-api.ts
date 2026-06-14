import type { PatientRiskSummary } from "@/features/clinical-risk/types/risk.type";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import {
  findPatientMock,
  updatePatientLatestRiskMock,
} from "@/features/patients/api/patient-mock-storage";
import { completeInitialScreeningWorkflowMock } from "@/features/patients/api/patient-workflow-mock-api";
import { calculateAgeFromDateOfBirth } from "@/lib/date";

import type {
  InitialScreening,
  InitialScreeningFormValues,
} from "../types/initial-screening.type";
import { calculateInitialScreeningRisk } from "../utils/initial-screening-risk";

const STORAGE_KEY = "maternity_initial_screenings_mock_v1";

function delay(milliseconds = 500) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function readInitialScreeningStorage(): Record<string, InitialScreening> {
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

    return parsedData as Record<string, InitialScreening>;
  } catch {
    return {};
  }
}

function writeInitialScreeningStorage(
  screenings: Record<string, InitialScreening>,
) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(screenings));
}

export function resetInitialScreeningMockStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function getInitialScreeningMock(patientId: string) {
  await delay();

  const screening = readInitialScreeningStorage()[patientId];

  if (!screening) {
    throw new Error("Data skrining awal tidak ditemukan.");
  }

  return screening;
}

export async function createInitialScreeningMock(
  patientId: string,
  values: InitialScreeningFormValues,
) {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  const screenings = readInitialScreeningStorage();

  if (screenings[patientId]) {
    throw new Error("Skrining awal untuk pasien ini sudah pernah dilakukan.");
  }

  const maternalAge = calculateAgeFromDateOfBirth(patient.dateOfBirth);

  const riskResult = calculateInitialScreeningRisk(values, maternalAge);

  const session = getAuthSession();
  const timestamp = new Date().toISOString();

  const screening: InitialScreening = {
    id: crypto.randomUUID(),
    patientId,

    heightCm: values.heightCm,

    vitalSigns: {
      ...values.vitalSigns,
    },

    obstetricStatus: {
      ...values.obstetricStatus,
    },

    previousDeliveryInterval: {
      ...values.previousDeliveryInterval,
    },

    previousPregnancyHistory: [...values.previousPregnancyHistory],

    comorbidities: [...values.comorbidities],

    riskScore: riskResult.score,
    riskCategory: riskResult.category,
    riskFactors: riskResult.factors,
    criticalFactors: riskResult.criticalFactors,

    screenedAt: timestamp,

    screenedBy: {
      id: session?.user.id ?? "unknown",
      name: session?.user.username ?? "Unknown User",
    },
  };

  const latestRisk: PatientRiskSummary = {
    score: screening.riskScore,
    category: screening.riskCategory,
    source: "initial_screening",
    assessedAt: timestamp,
  };

  writeInitialScreeningStorage({
    ...screenings,
    [patientId]: screening,
  });

  updatePatientLatestRiskMock(patientId, latestRisk);

  completeInitialScreeningWorkflowMock(patientId, screening.id, timestamp);

  return screening;
}
