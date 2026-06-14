import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useToast } from "@/components/ui/toast-context";
import { getErrorMessage } from "@/lib/error";

import { NewbornOutcomeForm } from "./newborn-outcome-form";
import { NewbornOutcomeResultCard } from "./newborn-outcome-result-card";
import { useNewbornOutcome } from "../hooks/use-newborn-outcome";
import { useCreateNewbornOutcome } from "../hooks/use-newborn-outcome-mutations";
import type { NewbornOutcomeFormValues } from "../types/newborn-outcome.type";

type NewbornOutcomeSectionProps = {
  patientId: string;
  canCreate: boolean;
};

export function NewbornOutcomeSection({
  patientId,
  canCreate,
}: NewbornOutcomeSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { showToast } = useToast();

  const newbornOutcomeQuery = useNewbornOutcome(patientId);

  const createNewbornOutcomeMutation = useCreateNewbornOutcome();

  const handleSubmit = async (values: NewbornOutcomeFormValues) => {
    try {
      await createNewbornOutcomeMutation.mutateAsync({
        patientId,
        values,
      });

      showToast({
        type: "success",
        title: "Luaran kelahiran bayi berhasil disimpan",
        description:
          "Hasil kelahiran bayi telah dicatat dan sekarang bersifat read-only.",
      });

      setModalOpen(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan luaran kelahiran bayi",
        description: getErrorMessage(error),
      });
    }
  };

  if (newbornOutcomeQuery.isLoading) {
    return <TableSkeleton rows={4} columns={3} />;
  }

  if (newbornOutcomeQuery.isError) {
    return (
      <ErrorState
        title="Gagal memuat luaran kelahiran bayi"
        description="Terjadi kesalahan saat mengambil data luaran kelahiran bayi."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => newbornOutcomeQuery.refetch()}
          >
            Coba Lagi
          </Button>
        }
      />
    );
  }

  const outcome = newbornOutcomeQuery.data;

  if (outcome) {
    return <NewbornOutcomeResultCard outcome={outcome} />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Luaran Kelahiran Bayi</CardTitle>

          <CardDescription>
            Catat APGAR Score, IUFD, atau stillbirth sebagai hasil kelahiran
            bayi.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EmptyState
            title="Luaran kelahiran bayi belum dicatat"
            description="Pilih salah satu hasil kelahiran bayi dan isi APGAR Score apabila diperlukan."
            action={
              canCreate ? (
                <Button type="button" onClick={() => setModalOpen(true)}>
                  Catat Luaran Bayi
                </Button>
              ) : undefined
            }
          />
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        title="Catat Luaran Kelahiran Bayi"
        description="Pilih hasil kelahiran bayi dan isi APGAR Score jika bayi dinilai menggunakan APGAR."
        onClose={() => setModalOpen(false)}
      >
        <NewbornOutcomeForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={createNewbornOutcomeMutation.isPending}
        />
      </Modal>
    </>
  );
}
