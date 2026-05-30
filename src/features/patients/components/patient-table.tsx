import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskBadge } from "@/features/patients/components/risk-badge";
import type { Patient } from "@/features/patients/types/patient.type";

type PatientTableProps = {
  patients: Patient[];
};

export function PatientTable({ patients }: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <h3 className="text-sm font-semibold text-slate-900">
          Data pasien tidak ditemukan
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Coba ubah kata kunci pencarian atau filter risiko.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Pasien</TableHead>
          <TableHead>NIK</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead>No. HP</TableHead>
          <TableHead>Skrining Terakhir</TableHead>
          <TableHead>Status Risiko</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium text-slate-900">
              {patient.fullName}
            </TableCell>
            <TableCell>{patient.nik}</TableCell>
            <TableCell>{patient.age} tahun</TableCell>
            <TableCell>{patient.phone ?? "-"}</TableCell>
            <TableCell>{patient.lastScreeningDate}</TableCell>
            <TableCell>
              <RiskBadge risk={patient.riskCategory} />
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


