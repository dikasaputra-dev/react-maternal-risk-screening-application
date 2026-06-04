import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";

import { RiskBadge } from "@/features/patients/components/risk-badge";
import type { Patient } from "@/features/patients/types/patient.type";

type PatientTableProps = {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

export function PatientTable({
  patients,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <EmptyState
        title="Data pasien tidak ditemukan"
        description="Coba ubah kata kunci pencarian atau filter risiko."
      />
    );
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
            <TableCell>{patient.phone || "-"}</TableCell>
            <TableCell>{patient.lastScreeningDate}</TableCell>

            <TableCell>
              <RiskBadge risk={patient.riskCategory} />
            </TableCell>

            <TableCell>
              <div className="flex justify-end gap-2">
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(patient)}
                  >
                    Edit
                  </Button>
                )}

                {canDelete && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(patient.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
