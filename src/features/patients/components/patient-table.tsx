import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateAgeFromDateOfBirth, formatDate } from "@/lib/date";

import {
  educationLabelMap,
  religionLabelMap,
} from "../constants/patient-options";
import { patientRoutes } from "../constants/patient-routes";
import type { Patient } from "../types/patient.type";

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
        description="Belum ada pasien yang sesuai dengan kata kunci pencarian."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Tanggal Lahir</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead>Agama</TableHead>
          <TableHead>Pendidikan</TableHead>
          <TableHead>Pekerjaan</TableHead>
          <TableHead>Ras</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium text-slate-900">
              {patient.fullName}
            </TableCell>

            <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>

            <TableCell>
              {calculateAgeFromDateOfBirth(patient.dateOfBirth)} tahun
            </TableCell>

            <TableCell>{religionLabelMap[patient.religion]}</TableCell>

            <TableCell>{educationLabelMap[patient.education]}</TableCell>

            <TableCell>{patient.occupation}</TableCell>

            <TableCell>{patient.race}</TableCell>

            <TableCell>
              <div className="flex justify-end gap-2">
                <Link
                  to={patientRoutes.detail(patient.id)}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Detail
                </Link>

                {canEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(patient)}
                  >
                    Edit
                  </Button>
                )}

                {canDelete && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(patient.id)}
                  >
                    Hapus
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
