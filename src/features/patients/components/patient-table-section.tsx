import { useMemo, useState } from "react";

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
import { patientsMock } from "@/features/patients/data/patients.mock";
import type {
  Patient,
  PatientFormValues,
  RiskCategory,
} from "@/features/patients/types/patient.type";

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
  const [patients, setPatients] = useState<Patient[]>(patientsMock);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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

  const handleSubmitPatient = (values: PatientFormValues) => {
    if (selectedPatient) {
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === selectedPatient.id
            ? {
                ...patient,
                ...values,
              }
            : patient,
        ),
      );

      handleCloseModal();
      return;
    }

    const newPatient: Patient = {
      id: crypto.randomUUID(),
      ...values,
      lastScreeningDate: "-",
      riskCategory: "no_risk",
    };

    setPatients((prev) => [newPatient, ...prev]);
    handleCloseModal();
  };

  const handleDeletePatient = (patientId: string) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data pasien ini?",
    );

    if (!confirmDelete) return;

    setPatients((prev) => prev.filter((patient) => patient.id !== patientId));
  };

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

            <Button onClick={handleOpenCreateModal}>Tambah Pasien</Button>
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

          <PatientTable
            patients={filteredPatients}
            onEdit={handleOpenEditModal}
            onDelete={handleDeletePatient}
          />
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
        />
      </Modal>
    </>
  );
}
