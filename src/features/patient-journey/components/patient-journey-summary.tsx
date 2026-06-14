import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";
import { riskSourceLabelMap } from "@/features/clinical-risk/constants/risk-config";
import { formatDateTime } from "@/lib/date";

import { patientJourneyStatusConfig } from "../constants/patient-journey-config";
import type { PatientJourneyData } from "../types/patient-journey.type";

type PatientJourneySummaryProps = {
  journey: PatientJourneyData;
};

export function PatientJourneySummary({ journey }: PatientJourneySummaryProps) {
  const statusConfig = patientJourneyStatusConfig[journey.status];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle>Ringkasan Perjalanan Pasien</CardTitle>

            <CardDescription>
              Ringkasan status pelayanan, aktivitas klinis, dan risiko terbaru
              pasien.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusConfig.badgeVariant}>
              {statusConfig.label}
            </Badge>

            <Link
              to={journey.primaryClinicalRoute}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {journey.status === "not_started"
                ? "Mulai Skrining Awal"
                : "Buka Pelayanan Klinis"}
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Kelengkapan Dokumentasi</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {journey.completionPercentage}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {journey.documentedMilestones} dari {journey.totalMilestones}{" "}
              milestone tercatat
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pemantauan Persalinan</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {journey.monitoringEntryCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">catatan pemantauan</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Tindakan Klinis</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {journey.clinicalActionCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">catatan tindakan</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Risiko Terbaru</p>

            <div className="mt-3">
              <RiskBadge
                category={journey.latestRisk?.category}
                score={journey.latestRisk?.score}
                showScore
              />
            </div>

            {journey.latestRisk && (
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <p>{riskSourceLabelMap[journey.latestRisk.source]}</p>

                <p>{formatDateTime(journey.latestRisk.assessedAt)}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
