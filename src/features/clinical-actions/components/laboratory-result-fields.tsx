import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type {
  ClinicalActionFieldName,
  ClinicalActionFormErrors,
  LaboratoryResultFormValues,
} from "../types/clinical-action.type";

type LaboratoryResultFieldsProps = {
  results: LaboratoryResultFormValues[];
  errors: ClinicalActionFormErrors;
  showErrors: boolean;
  disabled?: boolean;
  onAdd: () => void;
  onRemove: (clientId: string) => void;
  onChange: (
    clientId: string,
    field: "examinationDate" | "specimen" | "result",
    value: string,
  ) => void;
};

function getLaboratoryError(
  errors: ClinicalActionFormErrors,
  showErrors: boolean,
  index: number,
  field: "examinationDate" | "specimen" | "result",
) {
  if (!showErrors) {
    return undefined;
  }

  const key = `laboratoryResults.${index}.${field}` as ClinicalActionFieldName;

  return errors[key];
}

export function LaboratoryResultFields({
  results,
  errors,
  showErrors,
  disabled = false,
  onAdd,
  onRemove,
  onChange,
}: LaboratoryResultFieldsProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Hasil Pemeriksaan Laboratorium
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tambahkan tanggal pemeriksaan, spesimen, dan hasil laboratorium.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={onAdd}
        >
          Tambah Hasil Lab
        </Button>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Belum ada hasil laboratorium
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Bagian ini boleh dikosongkan jika belum ada pemeriksaan
            laboratorium.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((laboratoryResult, index) => (
            <div
              key={laboratoryResult.clientId}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  Hasil Laboratorium {index + 1}
                </p>

                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  disabled={disabled}
                  onClick={() => onRemove(laboratoryResult.clientId)}
                >
                  Hapus Baris
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id={`laboratoryDate-${laboratoryResult.clientId}`}
                  label="Tanggal Pemeriksaan"
                  type="date"
                  value={laboratoryResult.examinationDate}
                  error={getLaboratoryError(
                    errors,
                    showErrors,
                    index,
                    "examinationDate",
                  )}
                  disabled={disabled}
                  onChange={(event) =>
                    onChange(
                      laboratoryResult.clientId,
                      "examinationDate",
                      event.target.value,
                    )
                  }
                />

                <Input
                  id={`laboratorySpecimen-${laboratoryResult.clientId}`}
                  label="Spesimen"
                  placeholder="Contoh: Darah, urine"
                  value={laboratoryResult.specimen}
                  error={getLaboratoryError(
                    errors,
                    showErrors,
                    index,
                    "specimen",
                  )}
                  disabled={disabled}
                  onChange={(event) =>
                    onChange(
                      laboratoryResult.clientId,
                      "specimen",
                      event.target.value,
                    )
                  }
                />

                <div className="md:col-span-2">
                  <Textarea
                    id={`laboratoryResult-${laboratoryResult.clientId}`}
                    label="Hasil Laboratorium"
                    placeholder="Tuliskan hasil pemeriksaan laboratorium"
                    value={laboratoryResult.result}
                    error={getLaboratoryError(
                      errors,
                      showErrors,
                      index,
                      "result",
                    )}
                    disabled={disabled}
                    onChange={(event) =>
                      onChange(
                        laboratoryResult.clientId,
                        "result",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
