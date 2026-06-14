import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDateTime } from "@/lib/date";

import {
  clinicalDecisionLabelMap,
  medicationFluidLabelMap,
} from "../constants/clinical-action-options";
import type { ClinicalAction } from "../types/clinical-action.type";

type ClinicalActionTableProps = {
  actions: ClinicalAction[];
};

function formatMedicationFluid(action: ClinicalAction) {
  return action.medicationsAndFluids.map((item) => {
    const label = medicationFluidLabelMap[item.type];

    if (item.type === "oxytocin_drip" && item.oxytocinUnits) {
      return `${label} ${item.oxytocinUnits} UI`;
    }

    return label;
  });
}

export function ClinicalActionTable({ actions }: ClinicalActionTableProps) {
  if (actions.length === 0) {
    return (
      <EmptyState
        title="Belum ada tindakan"
        description="Tambahkan catatan obat, cairan, keputusan klinis, atau hasil laboratorium."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal/Jam</TableHead>

          <TableHead>Obat dan Cairan</TableHead>

          <TableHead>Keputusan Klinis</TableHead>

          <TableHead>Hasil Laboratorium</TableHead>

          <TableHead>Petugas</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {actions.map((action) => {
          const medicationLabels = formatMedicationFluid(action);

          return (
            <TableRow key={action.id}>
              <TableCell className="whitespace-nowrap align-top">
                {formatDateTime(action.recordedAt)}
              </TableCell>

              <TableCell className="align-top">
                <ul className="min-w-40 space-y-1 text-sm">
                  {medicationLabels.map((label) => (
                    <li key={label}>• {label}</li>
                  ))}
                </ul>
              </TableCell>

              <TableCell className="align-top">
                <div className="min-w-52">
                  <p className="font-medium text-slate-900">
                    {clinicalDecisionLabelMap[action.clinicalDecision.type]}
                  </p>

                  {action.clinicalDecision.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {action.clinicalDecision.description}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className="align-top">
                {action.laboratoryResults.length === 0 ? (
                  <span className="text-sm text-slate-500">
                    Belum ada hasil lab
                  </span>
                ) : (
                  <div className="min-w-72 space-y-3">
                    {action.laboratoryResults.map((laboratoryResult) => (
                      <div
                        key={laboratoryResult.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <p className="text-xs text-slate-500">
                          {formatDate(laboratoryResult.examinationDate)}
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {laboratoryResult.specimen}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-slate-600">
                          {laboratoryResult.result}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap align-top">
                {action.recordedBy.name}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
