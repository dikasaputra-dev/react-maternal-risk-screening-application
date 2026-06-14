import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  journeyMilestoneStatusConfig,
  patientJourneyStatusConfig,
} from "../constants/patient-journey-config";
import type { PatientJourneyData } from "../types/patient-journey.type";

type WorkflowCompletionCardProps = {
  journey: PatientJourneyData;
};

export function WorkflowCompletionCard({
  journey,
}: WorkflowCompletionCardProps) {
  const statusConfig = patientJourneyStatusConfig[journey.status];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Status Alur Pelayanan</CardTitle>

            <CardDescription>
              Ringkasan kelengkapan dokumentasi pelayanan pasien.
            </CardDescription>
          </div>

          <Badge variant={statusConfig.badgeVariant}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Kelengkapan Dokumentasi
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {journey.completionPercentage}%
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {journey.documentedMilestones} dari {journey.totalMilestones}{" "}
                milestone
              </p>
            </div>

            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-label="Kelengkapan dokumentasi pasien"
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

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {statusConfig.description}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {journey.milestones.map((milestone) => {
              const milestoneConfig =
                journeyMilestoneStatusConfig[milestone.status];

              return (
                <div
                  key={milestone.key}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {milestone.label}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {milestone.description}
                      </p>
                    </div>

                    <Badge variant={milestoneConfig.badgeVariant}>
                      {milestoneConfig.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              Bukan indikator keputusan klinis
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              Persentase ini hanya menunjukkan kelengkapan dokumentasi pada
              sistem. Nilai ini tidak menggantikan penilaian klinis tenaga
              medis.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
