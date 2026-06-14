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
import { getErrorMessage } from "@/lib/error";

import { ClinicalActionForm } from "./clinical-action-form";
import { ClinicalActionTable } from "./clinical-action-table";
import { useClinicalActions } from "../hooks/use-clinical-actions";
import { useCreateClinicalAction } from "../hooks/use-clinical-action-mutations";
import type { ClinicalActionFormValues } from "../types/clinical-action.type";

type ClinicalActionSectionProps = {
  patientId: string;
  canCreate: boolean;
};

export function ClinicalActionSection({
  patientId,
  canCreate,
}: ClinicalActionSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { showToast } = useToast();

  const clinicalActionsQuery = useClinicalActions(patientId);

  const createClinicalActionMutation = useCreateClinicalAction();

  const handleSubmit = async (values: ClinicalActionFormValues) => {
    try {
      await createClinicalActionMutation.mutateAsync({
        patientId,
        values,
      });

      showToast({
        type: "success",
        title: "Tindakan berhasil disimpan",
        description: "Catatan tindakan klinis berhasil ditambahkan.",
      });

      setModalOpen(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan tindakan",
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
              <CardTitle>Tindakan</CardTitle>

              <CardDescription>
                Catatan obat, cairan, keputusan klinis, dan hasil pemeriksaan
                laboratorium.
              </CardDescription>
            </div>

            {canCreate && (
              <Button type="button" onClick={() => setModalOpen(true)}>
                Tambah Tindakan
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {clinicalActionsQuery.isLoading ? (
            <TableSkeleton rows={4} columns={5} />
          ) : clinicalActionsQuery.isError ? (
            <ErrorState
              title="Gagal memuat tindakan"
              description="Terjadi kesalahan saat mengambil catatan tindakan pasien."
              action={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => clinicalActionsQuery.refetch()}
                >
                  Coba Lagi
                </Button>
              }
            />
          ) : (
            <ClinicalActionTable actions={clinicalActionsQuery.data ?? []} />
          )}
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        title="Tambah Tindakan"
        description="Catat obat, cairan, keputusan klinis, dan hasil laboratorium pasien."
        onClose={() => setModalOpen(false)}
      >
        <ClinicalActionForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={createClinicalActionMutation.isPending}
        />
      </Modal>
    </>
  );
}
