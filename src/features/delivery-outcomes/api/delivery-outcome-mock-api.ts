import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { findPatientMock } from "@/features/patients/api/patient-mock-storage";
import { completeDeliveryOutcomeWorkflowMock } from "@/features/patients/api/patient-workflow-mock-api";

import { deliveryOutcomesMock } from "../data/delivery-outcomes.mock";
import type {
  DeliveryOutcome,
  DeliveryOutcomeFormValues,
} from "../types/delivery-outcome.type";

const STORAGE_KEY = "maternity_delivery_outcomes_mock_v1";

function delay(milliseconds = 450) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function seedStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveryOutcomesMock));
  }
}

function readStorage(): Record<string, DeliveryOutcome> {
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

    return parsedData as Record<string, DeliveryOutcome>;
  } catch {
    return {};
  }
}

function writeStorage(outcomes: Record<string, DeliveryOutcome>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(outcomes));
}

export function resetDeliveryOutcomeMockStorage() {
  writeStorage(deliveryOutcomesMock);
}

export async function getDeliveryOutcomeMock(
  patientId: string,
): Promise<DeliveryOutcome | null> {
  await delay();

  return readStorage()[patientId] ?? null;
}

export async function createDeliveryOutcomeMock(
  patientId: string,
  values: DeliveryOutcomeFormValues,
) {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  if (!values.outcomeType) {
    throw new Error("Luaran persalinan wajib dipilih.");
  }

  const storage = readStorage();

  if (storage[patientId]) {
    throw new Error(
      "Luaran persalinan pasien ini sudah pernah dicatat dan tidak dapat diubah.",
    );
  }

  const session = getAuthSession();
  const timestamp = new Date().toISOString();

  const deliveryOutcome: DeliveryOutcome = {
    id: crypto.randomUUID(),
    patientId,
    outcomeType: values.outcomeType,
    recordedAt: timestamp,

    recordedBy: {
      id: session?.user.id ?? "unknown",

      name: session?.user.username ?? "Unknown User",
    },

    createdAt: timestamp,
  };

  writeStorage({
    ...storage,
    [patientId]: deliveryOutcome,
  });

  completeDeliveryOutcomeWorkflowMock(patientId, timestamp);

  return deliveryOutcome;
}
