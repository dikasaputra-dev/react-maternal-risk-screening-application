import type { PatientListParams } from "@/api/patients.api";
import type { PaginatedResponse } from "@/types/api";

import { patientsMock } from "@/features/patients/data/patients.mock";
import type {
  Patient,
  PatientFormValues,
} from "@/features/patients/types/patient.type";
import { screeningHistoryMock } from "@/features/screenings/data/screening-history.mock";

const STORAGE_KEY = "maternity_patients_mock";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function seedPatientsIfEmpty() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patientsMock));
  }
}

function readPatients(): Patient[] {
  seedPatientsIfEmpty();

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as Patient[];
  } catch {
    return [];
  }
}

function writePatients(patients: Patient[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

export async function getPatientsMock(
  params?: PatientListParams,
): Promise<PaginatedResponse<Patient>> {
  await delay();

  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 5;
  const search = params?.search?.toLowerCase() ?? "";
  const risk = params?.risk ?? "all";

  const patients = readPatients();

  const filteredPatients = patients.filter((patient) => {
    const matchSearch =
      !search ||
      patient.fullName.toLowerCase().includes(search) ||
      patient.nik.toLowerCase().includes(search);

    const matchRisk = risk === "all" || patient.riskCategory === risk;

    return matchSearch && matchRisk;
  });

  const count = filteredPatients.length;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filteredPatients.slice(start, end),
    pagination: {
      count,
      currentPage: safePage,
      totalPages,
      pageSize,
    },
  };
}

export async function getPatientByIdMock(id: string) {
  await delay();

  const patients = readPatients();

  const patient = patients.find((item) => item.id === id);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  return patient;
}

export async function getPatientScreeningsMock(id: string) {
  await delay();

  return screeningHistoryMock.filter((item) => item.patientId === id);
}

export async function createPatientMock(values: PatientFormValues) {
  await delay();

  const patients = readPatients();

  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...values,
    lastScreeningDate: "-",
    riskCategory: "no_risk",
  };

  writePatients([newPatient, ...patients]);

  return newPatient;
}

export async function updatePatientMock(id: string, values: PatientFormValues) {
  await delay();

  const patients = readPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === id
      ? {
          ...patient,
          ...values,
        }
      : patient,
  );

  writePatients(updatedPatients);

  const updatedPatient = updatedPatients.find((patient) => patient.id === id);

  if (!updatedPatient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  return updatedPatient;
}

export async function deletePatientMock(id: string) {
  await delay();

  const patients = readPatients();

  const exists = patients.some((patient) => patient.id === id);

  if (!exists) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  writePatients(patients.filter((patient) => patient.id !== id));

  return id;
}

export async function resetPatientsMock() {
  await delay();

  writePatients(patientsMock);

  return patientsMock;
}
