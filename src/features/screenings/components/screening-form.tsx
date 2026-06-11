import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import type {
  ChecklistKey,
  MedicalHistoryKey,
  ScreeningFormValues,
} from "@/features/screenings/types/screening.type";
import {
  checklistOptions,
  medicalHistoryOptions,
} from "@/features/screenings/constants/screening-options";
import { calculateRisk } from "@/features/screenings/utils/risk-calculator";
import { ScreeningRiskBadge } from "@/features/screenings/components/screening-risk-badge";
import { useToast } from "@/components/ui/toast-context";
import { useSubmitScreening } from "@/features/screenings/hooks/use-screening-mutations";
import { getErrorMessage } from "@/lib/error";

const initialForm: ScreeningFormValues = {
  patientId: "",
  maternalAge: 0,
  gravida: 1,
  partus: 0,
  abortus: 0,
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
  checklistItems: {
    leopold_done: false,
    fetal_heartbeat_checked: false,
    urine_protein_checked: false,
    blood_pressure_checked: false,
  },
};

export function ScreeningForm() {
  const [form, setForm] = useState<ScreeningFormValues>(initialForm);

  const riskResult = useMemo(() => {
    return calculateRisk(form);
  }, [form]);

  const { showToast } = useToast();
  const submitScreeningMutation = useSubmitScreening();

  const handleNumberChange = (
    field: keyof Omit<
      ScreeningFormValues,
      "medicalHistory" | "checklistItems" | "patientId"
    >,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleMedicalHistoryChange = (
    key: MedicalHistoryKey,
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

  const handleChecklistChange = (key: ChecklistKey, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [key]: checked,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.patientId) {
      showToast({
        type: "error",
        title: "Pasien belum dipilih",
        description: "Masukkan atau pilih pasien sebelum submit skrining.",
      });

      return;
    }

    try {
      const result = await submitScreeningMutation.mutateAsync(form);

      showToast({
        type: "success",
        title: "Skrining berhasil disubmit",
        description: `Kategori risiko: ${result.riskCategory}, skor: ${result.riskScore}.`,
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal submit skrining",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 xl:grid-cols-[1fr_320px]"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Klinis Ibu</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="patientId"
                label="Patient ID"
                placeholder="Masukkan ID pasien"
                value={form.patientId}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    patientId: event.target.value,
                  }))
                }
              />

              <Input
                id="maternalAge"
                type="number"
                label="Usia Ibu"
                value={form.maternalAge || ""}
                onChange={(event) =>
                  handleNumberChange("maternalAge", event.target.value)
                }
              />

              <Input
                id="gestationalAgeWeeks"
                type="number"
                label="Usia Kehamilan (minggu)"
                value={form.gestationalAgeWeeks || ""}
                onChange={(event) =>
                  handleNumberChange("gestationalAgeWeeks", event.target.value)
                }
              />

              <Input
                id="gravida"
                type="number"
                label="Gravida"
                value={form.gravida}
                onChange={(event) =>
                  handleNumberChange("gravida", event.target.value)
                }
              />

              <Input
                id="partus"
                type="number"
                label="Partus"
                value={form.partus}
                onChange={(event) =>
                  handleNumberChange("partus", event.target.value)
                }
              />

              <Input
                id="abortus"
                type="number"
                label="Abortus"
                value={form.abortus}
                onChange={(event) =>
                  handleNumberChange("abortus", event.target.value)
                }
              />

              <Input
                id="estimatedFetalWeight"
                type="number"
                label="TBJ / Taksiran Berat Janin (gram)"
                value={form.estimatedFetalWeight}
                onChange={(event) =>
                  handleNumberChange("estimatedFetalWeight", event.target.value)
                }
              />

              <Input
                id="systolicBp"
                type="number"
                label="Tekanan Darah Sistolik"
                value={form.systolicBp}
                onChange={(event) =>
                  handleNumberChange("systolicBp", event.target.value)
                }
              />

              <Input
                id="diastolicBp"
                type="number"
                label="Tekanan Darah Diastolik"
                value={form.diastolicBp}
                onChange={(event) =>
                  handleNumberChange("diastolicBp", event.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Penyakit</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Checklist Pemeriksaan</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {checklistOptions.map((item) => (
                <Checkbox
                  key={item.key}
                  label={item.label}
                  checked={form.checklistItems[item.key]}
                  onChange={(event) =>
                    handleChecklistChange(item.key, event.target.checked)
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Preview Risiko</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Skor Risiko</p>
                <p className="text-4xl font-bold text-slate-900">
                  {riskResult.riskScore}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-500">Kategori Risiko</p>
                <ScreeningRiskBadge risk={riskResult.riskCategory} />
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                Preview ini hanya simulasi frontend. Hasil final tetap berasal
                dari backend saat submit.
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={submitScreeningMutation.isPending}
                disabled={submitScreeningMutation.isPending}
              >
                Submit Skrining
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </form>
  );
}
