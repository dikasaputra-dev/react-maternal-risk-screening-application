import type { PatientListParams } from "@/api/patients.api";
import { resetClinicalActionMockStorage } from "@/features/clinical-actions/api/clinical-actions-mock-api";
import { riskCategoryConfig } from "@/features/clinical-risk/constants/risk-config";
import { resetInitialScreeningMockStorage } from "@/features/initial-screening/api/initial-screening-mock-api";
import { resetLaborMonitoringMockStorage } from "@/features/labor-monitoring/api/labor-monitoring-mock-api";
import { screeningHistoryMock } from "@/features/screenings/data/screening-history.mock";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";
import type { PaginatedResponse } from "@/types/api";

import {
  findPatientMock,
  readPatientsMockStorage,
  resetPatientsMockStorage,
  writePatientsMockStorage,
} from "./patient-mock-storage";
import {
  ensurePatientWorkflowMock,
  removePatientWorkflowMock,
  resetPatientWorkflowMockStorage,
} from "./patient-workflow-mock-api";
import {
  educationLabelMap,
  religionLabelMap,
} from "../constants/patient-options";
import { patientsMock } from "../data/patients.mock";
import type { Patient, PatientFormValues } from "../types/patient.type";

function delay(milliseconds = 400) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function matchesSearch(patient: Patient, search: string) {
  if (!search) {
    return true;
  }

  const riskLabel = patient.latestRisk
    ? riskCategoryConfig[patient.latestRisk.category].label
    : "Belum Dinilai";

  const searchableValues = [
    patient.fullName,
    patient.occupation,
    patient.race,
    patient.religion,
    religionLabelMap[patient.religion],
    patient.education,
    educationLabelMap[patient.education],
    riskLabel,
  ];

  return searchableValues.some((value) => value.toLowerCase().includes(search));
}

export async function getPatientsMock(
  params?: PatientListParams,
): Promise<PaginatedResponse<Patient>> {
  await delay();

  const page = params?.page ?? 1;

  const pageSize = params?.pageSize ?? 5;

  const search = params?.search?.trim().toLowerCase() ?? "";

  const filteredPatients = readPatientsMockStorage().filter((patient) =>
    matchesSearch(patient, search),
  );

  const count = filteredPatients.length;

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + pageSize,
  );

  return {
    data: paginatedPatients,
    pagination: {
      count,
      currentPage,
      totalPages,
      pageSize,
    },
  };
}

export async function getPatientByIdMock(patientId: string) {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  return patient;
}

export async function createPatientMock(values: PatientFormValues) {
  await delay();

  if (!values.religion || !values.education) {
    throw new Error("Agama dan pendidikan pasien wajib dipilih.");
  }

  const timestamp = new Date().toISOString();

  const patient: Patient = {
    id: crypto.randomUUID(),

    fullName: values.fullName.trim(),

    dateOfBirth: values.dateOfBirth,

    religion: values.religion,

    education: values.education,

    occupation: values.occupation.trim(),

    race: values.race.trim(),

    latestRisk: null,

    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const patients = readPatientsMockStorage();

  writePatientsMockStorage([patient, ...patients]);

  ensurePatientWorkflowMock(patient.id);

  return patient;
}

export async function updatePatientMock(
  patientId: string,
  values: PatientFormValues,
) {
  await delay();

  if (!values.religion || !values.education) {
    throw new Error("Agama dan pendidikan pasien wajib dipilih.");
  }

  const patients = readPatientsMockStorage();

  const existingPatient = findPatientMock(patientId);

  if (!existingPatient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  const updatedPatient: Patient = {
    ...existingPatient,

    fullName: values.fullName.trim(),

    dateOfBirth: values.dateOfBirth,

    religion: values.religion,

    education: values.education,

    occupation: values.occupation.trim(),

    race: values.race.trim(),

    updatedAt: new Date().toISOString(),
  };

  writePatientsMockStorage(
    patients.map((patient) =>
      patient.id === patientId ? updatedPatient : patient,
    ),
  );

  return updatedPatient;
}

export async function deletePatientMock(patientId: string) {
  await delay();

  const patients = readPatientsMockStorage();

  const patientExists = patients.some((patient) => patient.id === patientId);

  if (!patientExists) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  writePatientsMockStorage(
    patients.filter((patient) => patient.id !== patientId),
  );

  removePatientWorkflowMock(patientId);

  return patientId;
}

export async function getPatientScreeningsMock(
  patientId: string,
): Promise<ScreeningHistory[]> {
  await delay();

  return screeningHistoryMock.filter(
    (history) => history.patientId === patientId,
  );
}

export async function resetPatientsMock() {
  await delay();

  resetPatientsMockStorage();
  resetPatientWorkflowMockStorage();
  resetInitialScreeningMockStorage();
  resetLaborMonitoringMockStorage();
  resetClinicalActionMockStorage();

  return patientsMock;
}
