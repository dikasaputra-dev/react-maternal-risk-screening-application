import { useMemo, useState } from "react";

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

export function PatientTableSection() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const { data: patients = [], isLoading, isError } = usePatients();

  const createPatientMutation = useCreatePatient();
  const updatePatientMutation = useUpdatePatient();
  const deletePatientMutation = useDeletePatient();
  const resetPatientsMutation = useResetPatientsMock();

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        patient.fullName.toLowerCase().includes(keyword) ||
        patient.nik.toLowerCase().includes(keyword);

      const matchRisk =
        riskFilter === "all" || patient.riskCategory === riskFilter;

      return matchSearch && matchRisk;
    });
  }, [patients, search, riskFilter]);

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

            <div className="flex gap-2">
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
              onChange={(event) => setSearch(event.target.value)}
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
                    onClick={() => setRiskFilter(option.value)}
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
            <PatientTable
              patients={filteredPatients}
              onEdit={handleOpenEditModal}
              onDelete={handleDeletePatient}
            />
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
