import { Button } from "@/components/ui/button";
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

type ScreeningHistoryProps = {
  histories: ScreeningHistory[];
};

export function ScreeningHistoryTable({ histories }: ScreeningHistoryProps) {
  if (histories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <h3 className="text-sm font-semibold text-slate-900">
          Riwayat skrining tidak ditemukan
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Coba ubah kata kunci pencarian atau filter risiko.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableHead>Pasien</TableHead>
        <TableHead>Perawat</TableHead>
        <TableHead>Tanggal</TableHead>
        <TableHead>Usia Ibu</TableHead>
        <TableHead>Usia Kehamilan</TableHead>
        <TableHead>Skor</TableHead>
        <TableHead>Kategori Risiko</TableHead>
        <TableHead className="text-right">Aksi</TableHead>
      </TableHeader>

      <TableBody>
        {histories.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium text-slate-900">
              {item.patientName}
            </TableCell>
            <TableCell>{item.nurseName}</TableCell>
            <TableCell>{item.screeningDate}</TableCell>
            <TableCell>{item.maternalAge} tahun</TableCell>
            <TableCell>{item.gestationalAgeWeeks} minggu</TableCell>
            <TableCell className="font-semibold text-slate-900">
              {item.riskScore}
            </TableCell>
            <TableCell>
              <ScreeningRiskBadge risk={item.riskCategory} />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
