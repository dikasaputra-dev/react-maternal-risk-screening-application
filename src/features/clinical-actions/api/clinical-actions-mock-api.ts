import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { findPatientMock } from "@/features/patients/api/patient-mock-storage";
import {
  ensurePatientWorkflowMock,
  setClinicalActionCountWorkflowMock,
} from "@/features/patients/api/patient-workflow-mock-api";

import { clinicalActionsMock } from "../data/clinical-actions.mock";
import type {
  ClinicalAction,
  ClinicalActionFormValues,
  LaboratoryResult,
} from "../types/clinical-action.type";

const STORAGE_KEY = "maternity_clinical_actions_mock_v1";

function delay(milliseconds = 450) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function seedStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clinicalActionsMock));
  }
}

function readStorage(): Record<string, ClinicalAction[]> {
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

    return parsedData as Record<string, ClinicalAction[]>;
  } catch {
    return {};
  }
}

function writeStorage(actions: Record<string, ClinicalAction[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
}

function createLaboratoryResults(
  values: ClinicalActionFormValues,
): LaboratoryResult[] {
  return values.laboratoryResults.map((laboratoryResult) => ({
    id: crypto.randomUUID(),
    examinationDate: laboratoryResult.examinationDate,
    specimen: laboratoryResult.specimen.trim(),
    result: laboratoryResult.result.trim(),
  }));
}

export function resetClinicalActionMockStorage() {
  writeStorage(clinicalActionsMock);
}

export async function getClinicalActionsMock(patientId: string) {
  await delay();

  const actions = readStorage()[patientId] ?? [];

  return [...actions].sort(
    (firstAction, secondAction) =>
      new Date(secondAction.recordedAt).getTime() -
      new Date(firstAction.recordedAt).getTime(),
  );
}

export async function createClinicalActionMock(
  patientId: string,
  values: ClinicalActionFormValues,
) {
  await delay();

  const patient = findPatientMock(patientId);

  if (!patient) {
    throw new Error("Data pasien tidak ditemukan.");
  }

  ensurePatientWorkflowMock(patientId);

  const session = getAuthSession();

  const recordedAt = new Date(values.recordedAt).toISOString();

  const medicationsAndFluids = values.selectedMedicationFluidTypes.map(
    (type) => ({
      type,
      oxytocinUnits: type === "oxytocin_drip" ? values.oxytocinUnits : null,
    }),
  );

  const decisionDescription = values.clinicalDecision.description.trim();

  const clinicalAction: ClinicalAction = {
    id: crypto.randomUUID(),
    patientId,
    recordedAt,

    medicationsAndFluids,

    clinicalDecision: {
      type: values.clinicalDecision.type,
      description:
        values.clinicalDecision.type === "procedure" && decisionDescription
          ? decisionDescription
          : null,
    },

    laboratoryResults: createLaboratoryResults(values),

    recordedBy: {
      id: session?.user.id ?? "unknown",
      name: session?.user.username ?? "Unknown User",
    },

    createdAt: new Date().toISOString(),
  };

  const storage = readStorage();

  const currentActions = storage[patientId] ?? [];

  const updatedActions = [clinicalAction, ...currentActions];

  writeStorage({
    ...storage,
    [patientId]: updatedActions,
  });

  setClinicalActionCountWorkflowMock(
    patientId,
    updatedActions.length,
    clinicalAction.createdAt,
  );

  return clinicalAction;
}
