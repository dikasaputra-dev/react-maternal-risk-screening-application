import { useMemo } from "react";

import { useClinicalActions } from "@/features/clinical-actions/hooks/use-clinical-actions";
import { useDeliveryOutcome } from "@/features/delivery-outcomes/hooks/use-delivery-outcome";
import { useLaborMonitoring } from "@/features/labor-monitoring/hooks/use-labor-monitoring";
import { useNewbornOutcome } from "@/features/newborn-outcomes/hooks/use-newborn-outcome";
import { usePatient } from "@/features/patients/hooks/use-patient";
import { usePatientWorkflow } from "@/features/patients/hooks/use-patient-workflow";

import { buildPatientJourneyData } from "../utils/patient-journey";

export function usePatientJourney(patientId: string | undefined) {
  const patientQuery = usePatient(patientId);

  const workflowQuery = usePatientWorkflow(patientId);

  const hasInitialScreening = Boolean(workflowQuery.data?.hasInitialScreening);

  const monitoringQuery = useLaborMonitoring(patientId, hasInitialScreening);

  const clinicalActionsQuery = useClinicalActions(
    patientId,
    Boolean(patientId),
  );

  const deliveryOutcomeQuery = useDeliveryOutcome(
    patientId,
    Boolean(patientId),
  );

  const newbornOutcomeQuery = useNewbornOutcome(patientId, Boolean(patientId));

  const isLoading =
    patientQuery.isLoading ||
    workflowQuery.isLoading ||
    (hasInitialScreening && monitoringQuery.isLoading) ||
    clinicalActionsQuery.isLoading ||
    deliveryOutcomeQuery.isLoading ||
    newbornOutcomeQuery.isLoading;

  const isError =
    patientQuery.isError ||
    workflowQuery.isError ||
    (hasInitialScreening && monitoringQuery.isError) ||
    clinicalActionsQuery.isError ||
    deliveryOutcomeQuery.isError ||
    newbornOutcomeQuery.isError;

  const data = useMemo(() => {
    if (!patientQuery.data || !workflowQuery.data) {
      return null;
    }

    return buildPatientJourneyData({
      patient: patientQuery.data,

      workflow: workflowQuery.data,

      monitoringEntries: monitoringQuery.data ?? [],

      clinicalActions: clinicalActionsQuery.data ?? [],

      deliveryOutcome: deliveryOutcomeQuery.data ?? null,

      newbornOutcome: newbornOutcomeQuery.data ?? null,
    });
  }, [
    patientQuery.data,
    workflowQuery.data,
    monitoringQuery.data,
    clinicalActionsQuery.data,
    deliveryOutcomeQuery.data,
    newbornOutcomeQuery.data,
  ]);

  const refetch = async () => {
    await Promise.all([
      patientQuery.refetch(),
      workflowQuery.refetch(),
      monitoringQuery.refetch(),
      clinicalActionsQuery.refetch(),
      deliveryOutcomeQuery.refetch(),
      newbornOutcomeQuery.refetch(),
    ]);
  };

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
