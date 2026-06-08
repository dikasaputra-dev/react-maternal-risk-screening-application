import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScreeningRiskBadge } from "@/features/screenings/components/screening-risk-badge";
import type { ScreeningHistory } from "@/features/screenings/types/screening-history.type";

type PatientScreeningHistoryTableProps = {
  histories: ScreeningHistory[];
};

export function PatientScreeningHistoryTable({
  histories,
}: PatientScreeningHistoryTableProps) {
  if (histories.length === 0) {
    return (
      <EmptyState
        title="Belum ada riwayat skrining"
        description="Pasien ini belum memiliki data skrining."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Perawat</TableHead>
          <TableHead>Usia Ibu</TableHead>
          <TableHead>Usia Kehamilan</TableHead>
          <TableHead>Skor</TableHead>
          <TableHead>Kategori Risiko</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {histories.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.screeningDate}</TableCell>
            <TableCell>{item.nurseName}</TableCell>
            <TableCell>{item.maternalAge} tahun</TableCell>
            <TableCell>{item.gestationalAgeWeeks} minggu</TableCell>
            <TableCell className="font-semibold text-slate-900">
              {item.riskScore}
            </TableCell>
            <TableCell>
              <ScreeningRiskBadge risk={item.riskCategory} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
