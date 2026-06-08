import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { PatientProfileCard } from "@/features/patients/components/patient-profile-card";
import { PatientScreeningHistoryTable } from "@/features/patients/components/patient-screening-history-table";
import {
  usePatient,
  usePatientScreenings,
} from "@/features/patients/hooks/use-patient";

export function PatientDetailPage() {
  const { patientId } = useParams<{ patientId: string }>();

  const {
    data: patient,
    isLoading: isPatientLoading,
    isError: isPatientError,
  } = usePatient(patientId);

  const { data: histories = [], isLoading: isHistoriesLoading } =
    usePatientScreenings(patientId);

  if (isPatientLoading) {
    return (
      <div className="space-y-6">
        <TableSkeleton rows={3} columns={5} />
        <TableSkeleton rows={5} columns={5} />
      </div>
    );
  }

  if (isPatientError || !patient) {
    return (
      <ErrorState
        title="Data pasien tidak ditemukan"
        description="Pasien yang Anda cari tidak tersedia atau sudah dihapus."
        action={
          <Link to="/patients">
            <Button variant="outline">Kembali ke Patients</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/patients">
          <Button variant="outline" size="sm">
            Kembali
          </Button>
        </Link>
      </div>

      <PatientProfileCard patient={patient} />

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Skrining</CardTitle>
          <CardDescription>
            Daftar sesi skrining yang pernah dilakukan untuk pasien ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isHistoriesLoading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : (
            <PatientScreeningHistoryTable histories={histories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
