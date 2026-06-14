import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { findPatientMock } from "@/features/patients/api/patient-mock-storage";
import { completeNewbornOutcomeWorkflowMock } from "@/features/patients/api/patient-workflow-mock-api";

import { newbornOutcomesMock } from "../data/newborn-outcomes.mock";
import type {
  NewbornOutcome,
  NewbornOutcomeFormValues,
} from "../types/newborn-outcome.type";

const STORAGE_KEY = "maternity_newborn_outcomes_mock_v1";

function delay(milliseconds = 450) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function seedStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newbornOutcomesMock));
  }
}

function readStorage(): Record<string, NewbornOutcome> {
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

    return parsedData as Record<string, NewbornOutcome>;
  } catch {
    return {};
  }
}

function writeStorage(outcomes: Record<string, NewbornOutcome>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(outcomes));
}

export function resetNewbornOutcomeMockStorage() {
  writeStorage(newbornOutcomesMock);
}

export async function getNewbornOutcomeMock(
  patientId: string,
): Promise<NewbornOutcome | null> {
  await delay();

  return readStorage()[patientId] ?? null;
}

export async function createNewbornOutcomeMock(
  patientId: string,
  values: NewbornOutcomeFormValues,
): Promise<NewbornOutcome> {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  if (!values.outcomeType) {
    throw new Error("Luaran kelahiran bayi wajib dipilih.");
  }

  const storage = readStorage();

  if (storage[patientId]) {
    throw new Error(
      "Luaran kelahiran bayi sudah pernah dicatat dan tidak dapat diubah.",
    );
  }

  const session = getAuthSession();

  const timestamp = new Date().toISOString();

  const baseOutcome = {
    id: crypto.randomUUID(),
    patientId,
    recordedAt: timestamp,

    recordedBy: {
      id: session?.user.id ?? "unknown",

      name: session?.user.username ?? "Unknown User",
    },

    createdAt: timestamp,
  };

  let newbornOutcome: NewbornOutcome;

  if (values.outcomeType === "apgar") {
    if (typeof values.apgarScore !== "number") {
      throw new Error("APGAR Score wajib diisi.");
    }

    newbornOutcome = {
      ...baseOutcome,
      outcomeType: "apgar",
      apgarScore: values.apgarScore,
    };
  } else {
    newbornOutcome = {
      ...baseOutcome,
      outcomeType: values.outcomeType,
      apgarScore: null,
    };
  }

  writeStorage({
    ...storage,
    [patientId]: newbornOutcome,
  });

  completeNewbornOutcomeWorkflowMock(patientId, timestamp);

  return newbornOutcome;
}
