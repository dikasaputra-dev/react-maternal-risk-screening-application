import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";

import type { LaborMonitoringRiskResult } from "../types/labor-monitoring.type";

type LaborMonitoringRiskPreviewProps = {
  result: LaborMonitoringRiskResult;
};

export function LaborMonitoringRiskPreview({
  result,
}: LaborMonitoringRiskPreviewProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Preview Risiko</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {result.score}
          </p>
        </div>

        <RiskBadge category={result.category} score={result.score} showScore />
      </div>

      {result.criticalFactors.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3"
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

      <div>
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
            Tidak ada faktor risiko tambahan yang terdeteksi.
          </p>
        )}
      </div>

      <p className="text-xs leading-5 text-amber-700">
        Preview ini menggunakan provisional rule engine. Backend production
        harus menjadi sumber hasil risiko final.
      </p>
    </div>
  );
}
