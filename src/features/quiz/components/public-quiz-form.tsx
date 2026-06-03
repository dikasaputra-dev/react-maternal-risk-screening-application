import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScreeningRiskBadge } from "@/features/screenings/components/screening-risk-badge";
import { medicalHistoryOptions } from "@/features/screenings/constants/screening-options";

import type { QuizFormValues } from "@/features/quiz/types/quiz.type";
import { calculateQuizResult } from "@/features/quiz/utils/quiz-calculator";
import { saveQuizResult } from "@/features/quiz/utils/quiz-storage";

const initialForm: QuizFormValues = {
  maternalAge: 0,
  gestationalAgeWeeks: 37,
  systolicBp: 120,
  diastolicBp: 80,
  estimatedFetalWeight: 3000,
  medicalHistory: {
    diabetes: false,
    hypertension: false,
    asthma: false,
    heart_disease: false,
    preeclampsia_history: false,
  },
};

export function PublicQuizForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<QuizFormValues>(initialForm);

  const previewResult = useMemo(() => {
    return calculateQuizResult(form);
  }, [form]);

  const handleNumberChange = (
    field: keyof Omit<QuizFormValues, "medicalHistory">,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleMedicalHistoryChange = (
    key: keyof QuizFormValues["medicalHistory"],
    checked: boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [key]: checked,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = calculateQuizResult(form);

    saveQuizResult(result);

    navigate(`/quiz/results/${result.token}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 lg:grid-cols-[1fr_320px]"
    >
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Kuis Skrining Awal Persalinan</CardTitle>
            <CardDescription>
              Isi data umum untuk mendapatkan estimasi kategori risiko awal.
              Kuis ini tidak menggantikan pemeriksaan tenaga kesehatan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="quizMaternalAge"
                type="number"
                label="Usia Ibu"
                value={form.maternalAge || ""}
                onChange={(event) =>
                  handleNumberChange("maternalAge", event.target.value)
                }
              />

              <Input
                id="quizGestationalAgeWeeks"
                type="number"
                label="Usia Kehamilan (minggu)"
                value={form.gestationalAgeWeeks}
                onChange={(event) =>
                  handleNumberChange("gestationalAgeWeeks", event.target.value)
                }
              />

              <Input
                id="quizSystolicBp"
                type="number"
                label="Tekanan Darah Sistolik"
                value={form.systolicBp}
                onChange={(event) =>
                  handleNumberChange("systolicBp", event.target.value)
                }
              />

              <Input
                id="quizDiastolicBp"
                type="number"
                label="Tekanan Darah Diastolik"
                value={form.diastolicBp}
                onChange={(event) =>
                  handleNumberChange("diastolicBp", event.target.value)
                }
              />

              <Input
                id="quizEstimatedFetalWeight"
                type="number"
                label="TBJ / Taksiran Berat Janin (gram)"
                value={form.estimatedFetalWeight}
                onChange={(event) =>
                  handleNumberChange("estimatedFetalWeight", event.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Penyakit</CardTitle>
            <CardDescription>
              Pilih jika memiliki riwayat penyakit berikut.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {medicalHistoryOptions.map((item) => (
                <Checkbox
                  key={item.key}
                  label={item.label}
                  description={item.description}
                  checked={form.medicalHistory[item.key]}
                  onChange={(event) =>
                    handleMedicalHistoryChange(item.key, event.target.checked)
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <aside>
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Preview Hasil</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Skor Risiko</p>
                <p className="text-4xl font-bold text-slate-900">
                  {previewResult.riskScore}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-500">Kategori</p>
                <ScreeningRiskBadge risk={previewResult.riskCategory} />
              </div>

              <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                Hasil ini hanya estimasi awal. Segera hubungi tenaga kesehatan
                bila muncul tanda bahaya atau risiko tinggi.
              </div>

              <Button type="submit" className="w-full">
                Lihat Hasil
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </form>
  );
}
