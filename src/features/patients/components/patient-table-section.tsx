import { useState } from "react";

import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

import { PatientForm } from "@/features/patients/components/patient-form";
import { PatientTable } from "@/features/patients/components/patient-table";
import { usePatients } from "@/features/patients/hooks/use-patients";

import type {
  Patient,
  PatientFormValues,
  RiskCategory,
} from "@/features/patients/types/patient.type";
import {
  useCreatePatient,
  useDeletePatient,
  useResetPatientsMock,
  useUpdatePatient,
} from "@/features/patients/hooks/use-patient-mutations";
import { Pagination } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

type RiskFilter = "all" | RiskCategory;

const riskOptions: {
  label: string;
  value: RiskFilter;
}[] = [
  { label: "Semua", value: "all" },
  { label: "Tidak Berisiko", value: "no_risk" },
  { label: "Risiko Rendah", value: "low_risk" },
  { label: "Risiko Tinggi", value: "high_risk" },
];

function getValidRisk(value: string | null): RiskFilter {
  if (value === "no_risk" || value === "low_risk" || value === "high_risk") {
    return value;
  }

  return "all";
}

function getPositiveNumber(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function PatientTableSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const riskFilter = getValidRisk(searchParams.get("risk"));
  const page = getPositiveNumber(searchParams.get("page"), 1);
  const pageSize = getPositiveNumber(searchParams.get("pageSize"), 5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const { data, isLoading, isError } = usePatients({
    search,
    risk: riskFilter,
    page,
    pageSize,
  });

  const patients = data?.data ?? [];
  const pagination = data?.pagination ?? {
    count: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize,
  };

  const createPatientMutation = useCreatePatient();
  const updatePatientMutation = useUpdatePatient();
  const deletePatientMutation = useDeletePatient();
  const resetPatientsMutation = useResetPatientsMock();

  const updateParams = (
    nextValues: Partial<{
      search: string;
      risk: RiskFilter;
      page: number;
      pageSize: number;
    }>,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    const nextSearch = nextValues.search ?? search;
    const nextRisk = nextValues.risk ?? riskFilter;
    const nextPage = nextValues.page ?? page;
    const nextPageSize = nextValues.pageSize ?? pageSize;

    if (nextSearch) {
      nextParams.set("search", nextSearch);
    } else {
      nextParams.delete("search");
    }

    if (nextRisk !== "all") {
      nextParams.set("risk", nextRisk);
    } else {
      nextParams.delete("risk");
    }

    nextParams.set("page", String(nextPage));
    nextParams.set("pageSize", String(nextPageSize));

    setSearchParams(nextParams);
  };

  const handleSearchChange = (value: string) => {
    updateParams({
      search: value,
      page: 1,
    });
  };

  const handleRiskChange = (risk: RiskFilter) => {
    updateParams({
      risk,
      page: 1,
    });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({
      page: nextPage,
    });
  };

  const handleOpenCreateModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  const handleSubmitPatient = async (values: PatientFormValues) => {
    if (selectedPatient) {
      await updatePatientMutation.mutateAsync({
        id: selectedPatient.id,
        values,
      });

      handleCloseModal();
      return;
    }

    await createPatientMutation.mutateAsync(values);
    handleCloseModal();

    updateParams({
      page: 1,
    });
  };

  const handleDeletePatient = (patientId: string) => {
    const patient = patients.find((item) => item.id === patientId);

    if (!patient) return;

    setPatientToDelete(patient);
  };

  const handleConfirmDelete = async () => {
    if (!patientToDelete) return;

    await deletePatientMutation.mutateAsync(patientToDelete.id);
    setPatientToDelete(null);
  };

  const handleResetFilter = () => {
    setSearchParams({
      page: "1",
      pageSize: String(pageSize),
    });
  };

  const isSubmitting =
    createPatientMutation.isPending || updatePatientMutation.isPending;

  if (isError) {
    return (
      <Card>
        <CardContent>
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Gagal memuat data pasien.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Data Pasien</CardTitle>
              <CardDescription>
                Cari pasien berdasarkan nama, NIK, dan status risiko.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleResetFilter}>
                Reset Filter
              </Button>

              <Button
                variant="outline"
                onClick={() => resetPatientsMutation.mutate()}
                loading={resetPatientsMutation.isPending}
              >
                Reset Mock
              </Button>

              <Button onClick={handleOpenCreateModal}>Tambah Pasien</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Input
              placeholder="Cari nama atau NIK..."
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="lg:max-w-sm"
            />

            <div className="flex flex-wrap gap-2">
              {riskOptions.map((option) => {
                const isActive = riskFilter === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant={isActive ? "primary" : "outline"}
                    onClick={() => handleRiskChange(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
              Memuat data pasien...
            </div>
          ) : (
            <div className="space-y-4">
              <PatientTable
                patients={patients}
                onEdit={handleOpenEditModal}
                onDelete={handleDeletePatient}
              />

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                pageSize={pagination.pageSize}
                totalItems={pagination.count}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        title={selectedPatient ? "Edit Pasien" : "Tambah Pasien"}
        description={
          selectedPatient
            ? "Perbarui data identitas pasien."
            : "Tambahkan data pasien baru ke sistem."
        }
        onClose={handleCloseModal}
      >
        <PatientForm
          initialData={selectedPatient}
          onSubmit={handleSubmitPatient}
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(patientToDelete)}
        title="Hapus Data Pasien"
        description={`Apakah Anda yakin ingin menghapus data pasien ${patientToDelete?.fullName}?`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onCancel={() => setPatientToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
