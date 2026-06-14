import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useToast } from "@/components/ui/toast-context";
import { env } from "@/config/env";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { getErrorMessage } from "@/lib/error";

import { PatientForm } from "./patient-form";
import { PatientTable } from "./patient-table";
import {
  useCreatePatient,
  useDeletePatient,
  useResetPatientsMock,
  useUpdatePatient,
} from "../hooks/use-patient-mutations";
import { usePatients } from "../hooks/use-patients";
import type { Patient, PatientFormValues } from "../types/patient.type";

function getPositiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export function PatientTableSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const page = getPositiveInteger(searchParams.get("page"), 1);

  const pageSize = getPositiveInteger(searchParams.get("pageSize"), 5);

  const [isPatientModalOpen, setPatientModalOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const { showToast } = useToast();

  const session = getAuthSession();
  const user = session?.user ?? null;

  const canCreatePatient = hasPermission(user, "create_patient");

  const canUpdatePatient = hasPermission(user, "update_patient");

  const canDeletePatient = hasPermission(user, "delete_patient");

  const { data, isLoading, isError, refetch } = usePatients({
    search,
    page,
    pageSize,
  });

  const createPatientMutation = useCreatePatient();

  const updatePatientMutation = useUpdatePatient();

  const deletePatientMutation = useDeletePatient();

  const resetPatientsMutation = useResetPatientsMock();

  const patients = data?.data ?? [];

  const pagination = data?.pagination ?? {
    count: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize,
  };

  const updateSearchParams = (
    nextValues: Partial<{
      search: string;
      page: number;
      pageSize: number;
    }>,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    const nextSearch = nextValues.search ?? search;

    const nextPage = nextValues.page ?? page;

    const nextPageSize = nextValues.pageSize ?? pageSize;

    if (nextSearch.trim()) {
      nextParams.set("search", nextSearch);
    } else {
      nextParams.delete("search");
    }

    nextParams.set("page", String(nextPage));

    nextParams.set("pageSize", String(nextPageSize));

    setSearchParams(nextParams);
  };

  const handleSearchChange = (value: string) => {
    updateSearchParams({
      search: value,
      page: 1,
    });
  };

  const handlePageChange = (nextPage: number) => {
    updateSearchParams({
      page: nextPage,
    });
  };

  const handleResetFilter = () => {
    setSearchParams({
      page: "1",
      pageSize: String(pageSize),
    });
  };

  const handleOpenCreateModal = () => {
    setSelectedPatient(null);
    setPatientModalOpen(true);
  };

  const handleOpenEditModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientModalOpen(true);
  };

  const handleClosePatientModal = () => {
    setSelectedPatient(null);
    setPatientModalOpen(false);
  };

  const handleSubmitPatient = async (values: PatientFormValues) => {
    try {
      if (selectedPatient) {
        await updatePatientMutation.mutateAsync({
          id: selectedPatient.id,
          values,
        });

        showToast({
          type: "success",
          title: "Data pasien diperbarui",
          description: "Perubahan data pasien berhasil disimpan.",
        });

        handleClosePatientModal();

        return;
      }

      await createPatientMutation.mutateAsync(values);

      showToast({
        type: "success",
        title: "Pasien ditambahkan",
        description: "Data pasien baru berhasil disimpan.",
      });

      handleClosePatientModal();

      updateSearchParams({
        search: "",
        page: 1,
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan pasien",
        description: getErrorMessage(error),
      });
    }
  };

  const handleDeletePatient = (patientId: string) => {
    const patient = patients.find((item) => item.id === patientId);

    if (!patient) {
      return;
    }

    setPatientToDelete(patient);
  };

  const handleConfirmDelete = async () => {
    if (!patientToDelete) {
      return;
    }

    try {
      await deletePatientMutation.mutateAsync(patientToDelete.id);

      showToast({
        type: "success",
        title: "Data pasien dihapus",
        description: `${patientToDelete.fullName} berhasil dihapus.`,
      });

      setPatientToDelete(null);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menghapus pasien",
        description: getErrorMessage(error),
      });
    }
  };

  const handleResetMock = async () => {
    try {
      await resetPatientsMutation.mutateAsync();

      updateSearchParams({
        search: "",
        page: 1,
      });

      showToast({
        type: "success",
        title: "Mock pasien direset",
        description: "Data pasien dikembalikan ke kondisi awal.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal mereset mock",
        description: getErrorMessage(error),
      });
    }
  };

  const isSubmitting =
    createPatientMutation.isPending || updatePatientMutation.isPending;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Data Pasien</CardTitle>

              <CardDescription>
                Kelola identitas pasien bersalin berdasarkan nama, agama,
                pendidikan, pekerjaan, dan ras.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetFilter}
              >
                Reset Pencarian
              </Button>

              {env.mock.patients && (
                <Button
                  type="button"
                  variant="outline"
                  loading={resetPatientsMutation.isPending}
                  onClick={handleResetMock}
                >
                  Reset Mock
                </Button>
              )}

              {canCreatePatient && (
                <Button type="button" onClick={handleOpenCreateModal}>
                  Tambah Pasien
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <Input
              id="patientSearch"
              placeholder="Cari nama, agama, pendidikan, pekerjaan, atau ras..."
              value={search}
              className="lg:max-w-md"
              onChange={(event) => handleSearchChange(event.target.value)}
            />
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} columns={8} />
          ) : isError ? (
            <ErrorState
              title="Gagal memuat data pasien"
              description="Terjadi kesalahan saat mengambil data pasien."
              action={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Coba Lagi
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              <PatientTable
                patients={patients}
                onEdit={handleOpenEditModal}
                onDelete={handleDeletePatient}
                canEdit={canUpdatePatient}
                canDelete={canDeletePatient}
              />

              {pagination.count > 0 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  pageSize={pagination.pageSize}
                  totalItems={pagination.count}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={isPatientModalOpen}
        title={selectedPatient ? "Edit Pasien" : "Tambah Pasien"}
        description={
          selectedPatient
            ? "Perbarui data identitas pasien."
            : "Isi identitas awal pasien sebelum melanjutkan pelayanan."
        }
        onClose={handleClosePatientModal}
      >
        <PatientForm
          initialData={selectedPatient}
          onSubmit={handleSubmitPatient}
          onCancel={handleClosePatientModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(patientToDelete)}
        title="Hapus Data Pasien"
        description={`Apakah Anda yakin ingin menghapus data ${patientToDelete?.fullName ?? "pasien ini"}?`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPatientToDelete(null)}
      />
    </>
  );
}
