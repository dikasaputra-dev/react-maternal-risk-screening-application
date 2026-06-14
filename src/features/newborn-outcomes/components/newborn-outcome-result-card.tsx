import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/date";

import { newbornOutcomeConfig } from "../constants/newborn-outcome-options";
import type { NewbornOutcome } from "../types/newborn-outcome.type";

type NewbornOutcomeResultCardProps = {
  outcome: NewbornOutcome;
};

export function NewbornOutcomeResultCard({
  outcome,
}: NewbornOutcomeResultCardProps) {
  const config = newbornOutcomeConfig[outcome.outcomeType];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Luaran Kelahiran Bayi</CardTitle>

            <CardDescription>
              Hasil kelahiran bayi yang telah dicatat dan bersifat read-only.
            </CardDescription>
          </div>

          <Badge variant="info">Tercatat</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Luaran Bayi</p>

          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            {config.label}
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {config.description}
          </p>

          {outcome.outcomeType === "apgar" && (
            <div className="mt-5 inline-flex items-baseline gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
              <span className="text-4xl font-bold text-blue-900">
                {outcome.apgarScore}
              </span>

              <span className="text-sm font-medium text-blue-700">dari 10</span>
            </div>
          )}
        </div>

        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Tanggal Pencatatan</dt>

            <dd className="mt-1 font-medium text-slate-900">
              {formatDateTime(outcome.recordedAt)}
            </dd>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Dicatat Oleh</dt>

            <dd className="mt-1 font-medium text-slate-900">
              {outcome.recordedBy.name}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900">
            Record immutable
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-700">
            Luaran kelahiran bayi tidak dapat diedit atau dihapus dari halaman
            pelayanan. Koreksi harus melalui prosedur amendment dan audit log.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
