import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/date";

import { deliveryOutcomeConfig } from "../constants/delivery-outcome-options";
import type { DeliveryOutcome } from "../types/delivery-outcome.type";

type DeliveryOutcomeResultCardProps = {
  outcome: DeliveryOutcome;
};

export function DeliveryOutcomeResultCard({
  outcome,
}: DeliveryOutcomeResultCardProps) {
  const config = deliveryOutcomeConfig[outcome.outcomeType];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Luaran Persalinan</CardTitle>

            <CardDescription>
              Hasil akhir metode persalinan pasien yang telah dicatat.
            </CardDescription>
          </div>

          <Badge variant="success">Selesai</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">Metode Persalinan</p>

          <h3 className="mt-1 text-lg font-semibold text-emerald-950">
            {config.label}
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-800">
            {config.description}
          </p>
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
            Luaran persalinan ini tidak dapat diedit atau dihapus dari halaman
            pelayanan. Koreksi harus melalui prosedur amendment dan audit log.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
