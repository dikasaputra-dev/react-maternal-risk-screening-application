import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ClinicalTimeline } from "@/features/patient-journey/components/clinical-timeline";
import { PatientJourneySummary } from "@/features/patient-journey/components/patient-journey-summary";
import { WorkflowCompletionCard } from "@/features/patient-journey/components/workflow-completion-card";
import { usePatientJourney } from "@/features/patient-journey/hooks/use-patient-journey";

export function PatientJourneyPage() {
  const { patientId } = useParams<{
    patientId: string;
  }>();

  const journeyQuery = usePatientJourney(patientId);

  if (!patientId) {
    return (
      <ErrorState
        title="Patient ID tidak valid"
        description="Ringkasan perjalanan pasien tidak dapat dibuka tanpa ID pasien."
      />
    );
  }

  if (journeyQuery.isLoading) {
    return (
      <div role="status" aria-live="polite" className="space-y-6">
        <span className="sr-only">Memuat ringkasan perjalanan pasien...</span>

        <TableSkeleton rows={2} columns={4} />

        <TableSkeleton rows={3} columns={2} />

        <TableSkeleton rows={5} columns={2} />
      </div>
    );
  }

  if (journeyQuery.isError || !journeyQuery.data) {
    return (
      <ErrorState
        title="Ringkasan perjalanan gagal dimuat"
        description="Terjadi kesalahan saat menggabungkan data pelayanan pasien."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => journeyQuery.refetch()}
          >
            Coba Lagi
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PatientJourneySummary journey={journeyQuery.data} />

      <WorkflowCompletionCard journey={journeyQuery.data} />

      <ClinicalTimeline events={journeyQuery.data.timeline} />
    </div>
  );
}
