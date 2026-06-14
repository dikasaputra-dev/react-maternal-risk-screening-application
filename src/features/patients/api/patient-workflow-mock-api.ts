import {
  createDefaultPatientWorkflow,
  patientWorkflowMock,
} from "../data/patient-workflow.mock";
import type { PatientWorkflowStatus } from "../types/patient-workflow.type";

const STORAGE_KEY = "maternity_patient_workflows_mock_v1";

function delay(milliseconds = 300) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function seedWorkflowStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patientWorkflowMock));
  }
}

export function readPatientWorkflowMockStorage(): Record<
  string,
  PatientWorkflowStatus
> {
  seedWorkflowStorage();

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

    return parsedData as Record<string, PatientWorkflowStatus>;
  } catch {
    return {};
  }
}

function writeWorkflowStorage(
  workflows: Record<string, PatientWorkflowStatus>,
) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
}

export function ensurePatientWorkflowMock(patientId: string) {
  const workflows = readPatientWorkflowMockStorage();

  const existingWorkflow = workflows[patientId];

  if (existingWorkflow) {
    return existingWorkflow;
  }

  const workflow = createDefaultPatientWorkflow(patientId);

  writeWorkflowStorage({
    ...workflows,
    [patientId]: workflow,
  });

  return workflow;
}

export function completeInitialScreeningWorkflowMock(
  patientId: string,
  initialScreeningId: string,
  completedAt: string,
) {
  const workflows = readPatientWorkflowMockStorage();

  const currentWorkflow =
    workflows[patientId] ?? createDefaultPatientWorkflow(patientId);

  const updatedWorkflow: PatientWorkflowStatus = {
    ...currentWorkflow,

    hasInitialScreening: true,

    initialScreeningId,

    initialScreeningCompletedAt: completedAt,

    updatedAt: completedAt,
  };

  writeWorkflowStorage({
    ...workflows,
    [patientId]: updatedWorkflow,
  });

  return updatedWorkflow;
}

export function setLaborMonitoringCountWorkflowMock(
  patientId: string,
  monitoringEntryCount: number,
  updatedAt: string,
) {
  const workflows = readPatientWorkflowMockStorage();

  const currentWorkflow =
    workflows[patientId] ?? createDefaultPatientWorkflow(patientId);

  const updatedWorkflow: PatientWorkflowStatus = {
    ...currentWorkflow,

    monitoringEntryCount,

    updatedAt,
  };

  writeWorkflowStorage({
    ...workflows,
    [patientId]: updatedWorkflow,
  });

  return updatedWorkflow;
}

export function setClinicalActionCountWorkflowMock(
  patientId: string,
  clinicalActionCount: number,
  updatedAt: string,
) {
  const workflows = readPatientWorkflowMockStorage();

  const currentWorkflow =
    workflows[patientId] ?? createDefaultPatientWorkflow(patientId);

  const updatedWorkflow: PatientWorkflowStatus = {
    ...currentWorkflow,

    clinicalActionCount,

    updatedAt,
  };

  writeWorkflowStorage({
    ...workflows,
    [patientId]: updatedWorkflow,
  });

  return updatedWorkflow;
}

export function completeDeliveryOutcomeWorkflowMock(
  patientId: string,
  completedAt: string,
) {
  const workflows = readPatientWorkflowMockStorage();

  const currentWorkflow =
    workflows[patientId] ?? createDefaultPatientWorkflow(patientId);

  const updatedWorkflow: PatientWorkflowStatus = {
    ...currentWorkflow,

    hasDeliveryOutcome: true,

    updatedAt: completedAt,
  };

  writeWorkflowStorage({
    ...workflows,
    [patientId]: updatedWorkflow,
  });

  return updatedWorkflow;
}

export function completeNewbornOutcomeWorkflowMock(
  patientId: string,
  completedAt: string,
) {
  const workflows = readPatientWorkflowMockStorage();

  const currentWorkflow =
    workflows[patientId] ?? createDefaultPatientWorkflow(patientId);

  const updatedWorkflow: PatientWorkflowStatus = {
    ...currentWorkflow,

    hasNewbornOutcome: true,

    updatedAt: completedAt,
  };

  writeWorkflowStorage({
    ...workflows,
    [patientId]: updatedWorkflow,
  });

  return updatedWorkflow;
}

export function removePatientWorkflowMock(patientId: string) {
  const workflows = readPatientWorkflowMockStorage();

  const { [patientId]: removedWorkflow, ...remainingWorkflows } = workflows;

  void removedWorkflow;

  writeWorkflowStorage(remainingWorkflows);
}

export function resetPatientWorkflowMockStorage() {
  writeWorkflowStorage(patientWorkflowMock);
}

export async function getPatientWorkflowStatusMock(patientId: string) {
  await delay();

  return ensurePatientWorkflowMock(patientId);
}
