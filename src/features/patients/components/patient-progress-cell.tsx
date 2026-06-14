import type { PatientJourneyListSummary } from "../types/patient-list.type";

type PatientProgressCellProps = {
  journey: PatientJourneyListSummary;
};

export function PatientProgressCell({ journey }: PatientProgressCellProps) {
  return (
    <div className="min-w-36">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900">
          {journey.completionPercentage}%
        </span>

        <span className="text-xs text-slate-500">
          {journey.documentedMilestones}/{journey.totalMilestones}
        </span>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label="Progress dokumentasi pasien"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={journey.completionPercentage}
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-300"
          style={{
            width: `${journey.completionPercentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {journey.monitoringEntryCount} pemantauan
        {" · "}
        {journey.clinicalActionCount} tindakan
      </p>
    </div>
  );
}
