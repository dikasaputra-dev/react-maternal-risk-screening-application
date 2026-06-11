import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import type { QuizFormValues } from "@/features/quiz/types/quiz.type";
import { getErrorMessage } from "@/lib/error";
import { useToast } from "@/components/ui/toast-context";
import { useSubmitQuiz } from "@/features/quiz/hooks/use-quiz";

const initialForm: QuizFormValues = {
  maternalAge: 0,
  gestationalAgeWeeks: 37,
  systolicBp: 120,
  diastolicBp: 80,
  hasBleeding: false,
  hasSevereHeadache: false,
  hasSwollenHandsFace: false,
  hasFever: false,
  hasReducedFetalMovement: false,
};

export function PublicQuizForm() {
  const [form, setForm] = useState<QuizFormValues>(initialForm);

  const navigate = useNavigate();
  const { showToast } = useToast();
  const submitQuizMutation = useSubmitQuiz();

  const handleNumberChange = (
    field: keyof Pick<
      QuizFormValues,
      "maternalAge" | "gestationalAgeWeeks" | "systolicBp" | "diastolicBp"
    >,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleBooleanChange = (
    field: keyof Pick<
      QuizFormValues,
      | "hasBleeding"
      | "hasSevereHeadache"
      | "hasSwollenHandsFace"
      | "hasFever"
      | "hasReducedFetalMovement"
    >,
    checked: boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await submitQuizMutation.mutateAsync(form);

      showToast({
        type: "success",
        title: "Kuis berhasil dikirim",
        description: "Hasil kuis berhasil dibuat.",
      });

      navigate(`/quiz/results/${result.token}`);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal mengirim kuis",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Usia Ibu"
              type="number"
              value={form.maternalAge || ""}
              onChange={(event) =>
                handleNumberChange("maternalAge", event.target.value)
              }
            />

            <Input
              label="Usia Kehamilan Minggu"
              type="number"
              value={form.gestationalAgeWeeks}
              onChange={(event) =>
                handleNumberChange("gestationalAgeWeeks", event.target.value)
              }
            />

            <Input
              label="Sistolik"
              type="number"
              value={form.systolicBp}
              onChange={(event) =>
                handleNumberChange("systolicBp", event.target.value)
              }
            />

            <Input
              label="Diastolik"
              type="number"
              value={form.diastolicBp}
              onChange={(event) =>
                handleNumberChange("diastolicBp", event.target.value)
              }
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Checkbox
              label="Perdarahan"
              description="Ada perdarahan selama kehamilan."
              checked={form.hasBleeding}
              onChange={(event) =>
                handleBooleanChange("hasBleeding", event.target.checked)
              }
            />

            <Checkbox
              label="Sakit kepala berat"
              description="Sakit kepala berat atau pandangan kabur."
              checked={form.hasSevereHeadache}
              onChange={(event) =>
                handleBooleanChange("hasSevereHeadache", event.target.checked)
              }
            />

            <Checkbox
              label="Bengkak wajah/tangan"
              description="Bengkak pada wajah atau tangan."
              checked={form.hasSwollenHandsFace}
              onChange={(event) =>
                handleBooleanChange("hasSwollenHandsFace", event.target.checked)
              }
            />

            <Checkbox
              label="Demam"
              description="Mengalami demam atau infeksi."
              checked={form.hasFever}
              onChange={(event) =>
                handleBooleanChange("hasFever", event.target.checked)
              }
            />

            <Checkbox
              label="Gerakan janin berkurang"
              description="Gerakan janin terasa berkurang dari biasanya."
              checked={form.hasReducedFetalMovement}
              onChange={(event) =>
                handleBooleanChange(
                  "hasReducedFetalMovement",
                  event.target.checked,
                )
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={submitQuizMutation.isPending}
            disabled={submitQuizMutation.isPending}
          >
            Lihat Hasil Kuis
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
