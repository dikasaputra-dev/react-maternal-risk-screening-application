import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";

import type { InitialScreeningRiskResult } from "../types/initial-screening.type";

type InitialScreeningRiskPreviewProps = {
  result: InitialScreeningRiskResult;
};

export function InitialScreeningRiskPreview({
  result,
}: InitialScreeningRiskPreviewProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Preview Hasil Risiko</CardTitle>

        <CardDescription>
          Hasil sementara berdasarkan data yang sedang diisi.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-500">Skor Risiko</p>

            <p className="mt-1 text-4xl font-bold text-slate-900">
              {result.score}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-500">Kategori Risiko</p>

            <RiskBadge
              category={result.category}
              score={result.score}
              showScore
            />
          </div>

          {result.criticalFactors.length > 0 && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-4"
            >
              <p className="text-sm font-semibold text-red-900">
                Faktor kritis terdeteksi
              </p>

              <ul className="mt-2 space-y-1 text-sm text-red-700">
                {result.criticalFactors.map((factor) => (
                  <li key={factor}>• {factor}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Faktor yang memengaruhi
            </p>

            {result.factors.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                {result.factors.map((factor) => (
                  <li key={factor}>• {factor}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Belum ada faktor risiko tambahan yang terdeteksi.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-800">
            Preview ini merupakan provisional rule engine untuk pengembangan
            frontend. Hasil production harus mengikuti kalkulasi backend yang
            telah divalidasi tim klinis.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
