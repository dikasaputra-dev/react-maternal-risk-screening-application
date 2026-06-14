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

import { PatientListFilters } from "./patient-list-filters";
import { PatientListPagination } from "./patient-list-pagination";
import { PatientTable } from "./patient-table";
import { usePatientListSearchParams } from "../hooks/use-patient-list-search-params";
import { usePatients } from "../hooks/use-patients";
import type { Patient } from "../types/patient.type";

type PatientTableSectionProps = {
  canCreatePatient?: boolean;
  canUpdatePatient?: boolean;
  canDeletePatient?: boolean;

  onCreatePatient?: () => void;

  onEditPatient: (patient: Patient) => void;

  onDeletePatient: (patientId: string) => void;
};

export function PatientTableSection({
  canCreatePatient = false,
  canUpdatePatient = false,
  canDeletePatient = false,
  onCreatePatient,
  onEditPatient,
  onDeletePatient,
}: PatientTableSectionProps) {
  const { filters, page, applyFilters, setPage, resetFilters } =
    usePatientListSearchParams();

  const patientsQuery = usePatients({
    search: filters.search || undefined,

    page,

    pageSize: filters.pageSize,

    journeyStatus:
      filters.journeyStatus === "all" ? undefined : filters.journeyStatus,

    riskCategory:
      filters.riskCategory === "all" ? undefined : filters.riskCategory,
  });

  const formKey = [
    filters.search,
    filters.journeyStatus,
    filters.riskCategory,
    filters.pageSize,
  ].join("-");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle>Data Pasien</CardTitle>

            <CardDescription>
              Cari pasien berdasarkan identitas, status perjalanan, dan kategori
              risiko.
            </CardDescription>
          </div>

          {canCreatePatient && onCreatePatient && (
            <Button type="button" onClick={onCreatePatient}>
              Tambah Pasien
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <PatientListFilters
            values={filters}
            formKey={formKey}
            onApply={applyFilters}
            onReset={resetFilters}
          />

          {patientsQuery.isLoading ? (
            <TableSkeleton rows={filters.pageSize} columns={7} />
          ) : patientsQuery.isError ? (
            <ErrorState
              title="Gagal memuat pasien"
              description="Terjadi kesalahan saat mengambil daftar pasien."
              action={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => patientsQuery.refetch()}
                >
                  Coba Lagi
                </Button>
              }
            />
          ) : (
            <>
              <PatientTable
                patients={patientsQuery.data?.data ?? []}
                canEdit={canUpdatePatient}
                canDelete={canDeletePatient}
                onEdit={onEditPatient}
                onDelete={onDeletePatient}
              />

              {patientsQuery.data && (
                <PatientListPagination
                  currentPage={patientsQuery.data.pagination.currentPage}
                  totalPages={patientsQuery.data.pagination.totalPages}
                  count={patientsQuery.data.pagination.count}
                  pageSize={patientsQuery.data.pagination.pageSize}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
