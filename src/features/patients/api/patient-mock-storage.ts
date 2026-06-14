import type { PatientRiskSummary } from "@/features/clinical-risk/types/risk.type";

import { patientsMock } from "../data/patients.mock";
import type { Patient } from "../types/patient.type";

const STORAGE_KEY = "maternity_patients_mock_v3";

function seedPatientsIfEmpty() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patientsMock));
  }
}

export function readPatientsMockStorage(): Patient[] {
  seedPatientsIfEmpty();

  const rawData = localStorage.getItem(STORAGE_KEY);

  if (!rawData) {
    return [];
  }

  try {
    const parsedData: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData as Patient[];
  } catch {
    return [];
  }
}

export function writePatientsMockStorage(patients: Patient[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

export function findPatientMock(patientId: string) {
  return readPatientsMockStorage().find((patient) => patient.id === patientId);
}

export function updatePatientLatestRiskMock(
  patientId: string,
  latestRisk: PatientRiskSummary,
) {
  const patients = readPatientsMockStorage();

  const existingPatient = patients.find((patient) => patient.id === patientId);

  if (!existingPatient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  const updatedPatient: Patient = {
    ...existingPatient,
    latestRisk,
    updatedAt: new Date().toISOString(),
  };

  writePatientsMockStorage(
    patients.map((patient) =>
      patient.id === patientId ? updatedPatient : patient,
    ),
  );

  return updatedPatient;
}

export function resetPatientsMockStorage() {
  writePatientsMockStorage(patientsMock);
}
