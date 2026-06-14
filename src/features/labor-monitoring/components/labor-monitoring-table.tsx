import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";
import { formatDateTime } from "@/lib/date";

import {
  amnioticFluidColorLabelMap,
  contractionIntensityLabelMap,
  fetalMovementLabelMap,
  headDescentLabelMap,
  urineMarkerLabelMap,
} from "../constants/labor-monitoring-options";
import type { LaborMonitoringEntry } from "../types/labor-monitoring.type";

type LaborMonitoringTableProps = {
  entries: LaborMonitoringEntry[];
};

function formatMembrane(entry: LaborMonitoringEntry) {
  if (entry.membranes.status === "intact") {
    return "Utuh";
  }

  const color = entry.membranes.color
    ? amnioticFluidColorLabelMap[entry.membranes.color]
    : "-";

  return [
    "Pecah",
    formatDateTime(entry.membranes.rupturedAt ?? undefined),
    color,
  ].join(" · ");
}

export function LaborMonitoringTable({ entries }: LaborMonitoringTableProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Belum ada pemantauan"
        description="Tambahkan catatan pemantauan pertama untuk pasien ini."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tgl/Jam</TableHead>
          <TableHead>TTV</TableHead>
          <TableHead>DJJ</TableHead>
          <TableHead>Gerak Janin</TableHead>
          <TableHead>Kontraksi</TableHead>
          <TableHead>Pembukaan/Penurunan</TableHead>
          <TableHead>Ketuban</TableHead>
          <TableHead>Urine</TableHead>
          <TableHead>Risiko</TableHead>
          <TableHead>Petugas</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(entry.recordedAt)}
            </TableCell>

            <TableCell>
              <div className="min-w-40 space-y-1 text-xs leading-5">
                <p>
                  TD {entry.vitalSigns.systolicBloodPressure}/
                  {entry.vitalSigns.diastolicBloodPressure} mmHg
                </p>

                <p>Nadi {entry.vitalSigns.pulse} x/menit</p>

                <p>Napas {entry.vitalSigns.respiratoryRate} x/menit</p>

                <p>Suhu {entry.vitalSigns.temperature} °C</p>

                <p>SpO₂ {entry.vitalSigns.oxygenSaturation}%</p>
              </div>
            </TableCell>

            <TableCell>{entry.fetalHeartRate} x/menit</TableCell>

            <TableCell>{fetalMovementLabelMap[entry.fetalMovement]}</TableCell>

            <TableCell>
              <div className="min-w-36 space-y-1 text-xs leading-5">
                <p>
                  {entry.contractions.frequencyPer10Minutes}
                  x/10 menit
                </p>

                <p>{entry.contractions.durationSeconds} detik</p>

                <p>
                  {contractionIntensityLabelMap[entry.contractions.intensity]}
                </p>
              </div>
            </TableCell>

            <TableCell>
              <div className="min-w-32 space-y-1 text-xs leading-5">
                <p>Pembukaan {entry.cervicalDilationCm} cm</p>

                <p>{headDescentLabelMap[entry.headDescent]}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="min-w-44 text-xs leading-5">
                {formatMembrane(entry)}
              </div>
            </TableCell>

            <TableCell>
              <div className="min-w-32 space-y-1 text-xs leading-5">
                <p>Volume {entry.urine.volumeMl} ml</p>

                <p>Protein {urineMarkerLabelMap[entry.urine.protein]}</p>

                <p>Aseton {urineMarkerLabelMap[entry.urine.acetone]}</p>
              </div>
            </TableCell>

            <TableCell>
              <RiskBadge
                category={entry.riskCategory}
                score={entry.riskScore}
                showScore
              />
            </TableCell>

            <TableCell>{entry.recordedBy.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
