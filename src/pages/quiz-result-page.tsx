import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ScreeningRiskBadge } from "@/features/screenings/components/screening-risk-badge";
import { useQuizResult } from "@/features/quiz/hooks/use-quiz";

export function QuizResultPage() {
  const { token } = useParams<{ token: string }>();

  const { data: result, isLoading, isError } = useQuizResult(token);

  if (isLoading) {
    return <TableSkeleton rows={3} columns={2} />;
  }

  if (isError || !result) {
    return (
      <ErrorState
        title="Hasil kuis tidak ditemukan"
        description="Token hasil kuis tidak valid atau data sudah tidak tersedia."
        action={
          <Link to="/quiz">
            <Button variant="outline">Kembali ke Kuis</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hasil Kuis Skrining Awal</CardTitle>
          <CardDescription>
            Hasil ini bersifat skrining awal dan bukan diagnosis medis.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Skor Risiko</p>
              <p className="mt-2 text-5xl font-bold text-slate-900">
                {result.riskScore}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Kategori Risiko
              </p>
              <ScreeningRiskBadge risk={result.riskCategory} />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">Rekomendasi</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {result.recommendation}
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Submitted at: {result.submittedAt}
            </p>

            <Link to="/quiz">
              <Button variant="outline" className="w-full">
                Isi Kuis Lagi
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
