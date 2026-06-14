import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useToast } from "@/components/ui/toast-context";
import { riskCategoryConfig } from "@/features/clinical-risk/constants/risk-config";
import { getErrorMessage } from "@/lib/error";

import { LaborMonitoringForm } from "./labor-monitoring-form";
import { LaborMonitoringTable } from "./labor-monitoring-table";
import { useLaborMonitoring } from "../hooks/use-labor-monitoring";
import { useCreateLaborMonitoring } from "../hooks/use-labor-monitoring-mutations";
import type { LaborMonitoringFormValues } from "../types/labor-monitoring.type";

type LaborMonitoringSectionProps = {
  patientId: string;
  canCreate: boolean;
};

export function LaborMonitoringSection({
  patientId,
  canCreate,
}: LaborMonitoringSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { showToast } = useToast();

  const monitoringQuery = useLaborMonitoring(patientId);

  const createMonitoringMutation = useCreateLaborMonitoring();

  const handleSubmit = async (values: LaborMonitoringFormValues) => {
    try {
      const entry = await createMonitoringMutation.mutateAsync({
        patientId,
        values,
      });

      showToast({
        type: "success",
        title: "Pemantauan berhasil disimpan",
        description: `Hasil pemantauan: ${
          riskCategoryConfig[entry.riskCategory].label
        } dengan skor ${entry.riskScore}.`,
      });

      setModalOpen(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan pemantauan",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>Pemantauan Persalinan</CardTitle>

              <CardDescription>
                Catatan berkala kondisi ibu, janin, kontraksi, ketuban, urine,
                dan perkembangan persalinan.
              </CardDescription>
            </div>

            {canCreate && (
              <Button type="button" onClick={() => setModalOpen(true)}>
                Tambah Pemantauan
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {monitoringQuery.isLoading ? (
            <TableSkeleton rows={5} columns={10} />
          ) : monitoringQuery.isError ? (
            <ErrorState
              title="Gagal memuat pemantauan"
              description="Terjadi kesalahan saat mengambil riwayat pemantauan persalinan."
              action={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => monitoringQuery.refetch()}
                >
                  Coba Lagi
                </Button>
              }
            />
          ) : (
            <LaborMonitoringTable entries={monitoringQuery.data ?? []} />
          )}
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        title="Tambah Pemantauan Persalinan"
        description="Isi kondisi ibu dan janin pada waktu pemeriksaan ini."
        onClose={() => setModalOpen(false)}
      >
        <LaborMonitoringForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={createMonitoringMutation.isPending}
        />
      </Modal>
    </>
  );
}
