import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScreeningRiskBadge } from "@/features/screenings/components/screening-risk-badge";
import { getQuizResultByToken } from "@/features/quiz/utils/quiz-storage";

export function QuizResultPage() {
  const { token } = useParams<{ token: string }>();

  const result = token ? getQuizResultByToken(token) : null;

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hasil Tidak Ditemukan</CardTitle>
          <CardDescription>
            Token hasil kuis tidak valid atau data sudah tidak tersedia di
            browser ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link to="/quiz">
            <Button>Isi Kuis Lagi</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Hasil Kuis Skrining</CardTitle>
        <CardDescription>
          Berikut estimasi risiko awal berdasarkan data yang Anda isi.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">Skor Risiko</p>
            <p className="mt-2 text-5xl font-bold text-slate-900">
              {result.riskScore}
            </p>

            <div className="mt-4">
              <ScreeningRiskBadge risk={result.riskCategory} />
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
            Simpan link hasil ini jika diperlukan. Pada implementasi backend,
            hasil akan diakses melalui session token dari server.
          </div>

          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
            Kuis ini bukan diagnosis medis. Untuk keputusan klinis, tetap
            lakukan pemeriksaan langsung dengan bidan, perawat, atau dokter.
          </div>

          <div className="flex justify-end gap-2">
            <Link to="/quiz">
              <Button variant="outline">Isi Ulang</Button>
            </Link>

            <Link to="/dashboard">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
