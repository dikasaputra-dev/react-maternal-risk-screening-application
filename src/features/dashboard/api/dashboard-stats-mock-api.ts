import { readPatientsMockStorage } from "@/features/patients/api/patient-mock-storage";
import { readPatientWorkflowMockStorage } from "@/features/patients/api/patient-workflow-mock-api";
import { createDefaultPatientWorkflow } from "@/features/patients/data/patient-workflow.mock";
import { buildPatientListItem } from "@/features/patients/utils/patient-list";

import type { DashboardStats } from "../types/dashboard-stats.type";

function delay(milliseconds = 400) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function getDashboardStatsMock(): Promise<DashboardStats> {
  await delay();

  const patients = readPatientsMockStorage();

  const workflows = readPatientWorkflowMockStorage();

  const patientListItems = patients.map((patient) => {
    const workflow =
      workflows[patient.id] ?? createDefaultPatientWorkflow(patient.id);

    return buildPatientListItem(patient, workflow);
  });

  const workflow = {
    notStarted: patientListItems.filter(
      (patient) => patient.journey.status === "not_started",
    ).length,

    active: patientListItems.filter(
      (patient) => patient.journey.status === "active",
    ).length,

    completed: patientListItems.filter(
      (patient) => patient.journey.status === "completed",
    ).length,
  };

  const risk = {
    unassessed: patientListItems.filter(
      (patient) => patient.latestRisk === null,
    ).length,

    lowRisk: patientListItems.filter(
      (patient) => patient.latestRisk?.category === "low_risk",
    ).length,

    moderateRisk: patientListItems.filter(
      (patient) => patient.latestRisk?.category === "moderate_risk",
    ).length,

    highRisk: patientListItems.filter(
      (patient) => patient.latestRisk?.category === "high_risk",
    ).length,
  };

  const completionTotal = patientListItems.reduce(
    (total, patient) => total + patient.journey.completionPercentage,
    0,
  );

  const averageCompletionPercentage =
    patientListItems.length > 0
      ? Math.round(completionTotal / patientListItems.length)
      : 0;

  const highRiskActivePatients = patientListItems.filter(
    (patient) =>
      patient.journey.status === "active" &&
      patient.latestRisk?.category === "high_risk",
  ).length;

  return {
    totalPatients: patientListItems.length,

    workflow,

    risk,

    averageCompletionPercentage,

    highRiskActivePatients,
  };
}
