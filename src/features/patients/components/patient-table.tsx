import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
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
import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";
import { patientJourneyStatusConfig } from "@/features/patient-journey/constants/patient-journey-config";
import {
  calculateAgeFromDateOfBirth,
  formatDate,
  formatDateTime,
} from "@/lib/date";

import { PatientProgressCell } from "./patient-progress-cell";
import {
  educationLabelMap,
  religionLabelMap,
} from "../constants/patient-options";
import { patientRoutes } from "../constants/patient-routes";
import type { PatientListItem } from "../types/patient-list.type";
import type { Patient } from "../types/patient.type";

type PatientTableProps = {
  patients: PatientListItem[];

  onEdit: (patient: Patient) => void;

  onDelete: (patientId: string) => void;

  canEdit?: boolean;
  canDelete?: boolean;
};

export function PatientTable({
  patients,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <EmptyState
        title="Data pasien tidak ditemukan"
        description="Tidak ada pasien yang sesuai dengan pencarian dan filter yang dipilih."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pasien</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead>Risiko Terakhir</TableHead>
          <TableHead>Status Pelayanan</TableHead>
          <TableHead>Progress Dokumentasi</TableHead>
          <TableHead>Terakhir Diperbarui</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((patient) => {
          const journeyStatusConfig =
            patientJourneyStatusConfig[patient.journey.status];

          return (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="min-w-52">
                  <p className="font-semibold text-slate-900">
                    {patient.fullName}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {religionLabelMap[patient.religion]}
                    {" · "}
                    {educationLabelMap[patient.education]}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {patient.occupation}
                    {" · "}
                    {patient.race}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="min-w-28">
                  <p className="font-medium text-slate-900">
                    {calculateAgeFromDateOfBirth(patient.dateOfBirth)} tahun
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(patient.dateOfBirth)}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <RiskBadge
                  category={patient.latestRisk?.category}
                  score={patient.latestRisk?.score}
                  showScore
                />
              </TableCell>

              <TableCell>
                <Badge variant={journeyStatusConfig.badgeVariant}>
                  {journeyStatusConfig.label}
                </Badge>
              </TableCell>

              <TableCell>
                <PatientProgressCell journey={patient.journey} />
              </TableCell>

              <TableCell>
                <div className="min-w-36 text-sm text-slate-600">
                  {formatDateTime(patient.updatedAt)}
                </div>
              </TableCell>

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
          );
        })}
      </TableBody>
    </Table>
  );
}
