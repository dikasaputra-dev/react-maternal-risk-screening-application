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

import { DeliveryOutcomeForm } from "./delivery-outcome-form";
import { DeliveryOutcomeResultCard } from "./delivery-outcome-result-card";
import { useDeliveryOutcome } from "../hooks/use-delivery-outcome";
import { useCreateDeliveryOutcome } from "../hooks/use-delivery-outcome-mutations";
import type { DeliveryOutcomeFormValues } from "../types/delivery-outcome.type";

type DeliveryOutcomeSectionProps = {
  patientId: string;
  canCreate: boolean;
};

export function DeliveryOutcomeSection({
  patientId,
  canCreate,
}: DeliveryOutcomeSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { showToast } = useToast();

  const deliveryOutcomeQuery = useDeliveryOutcome(patientId);

  const createDeliveryOutcomeMutation = useCreateDeliveryOutcome();

  const handleSubmit = async (values: DeliveryOutcomeFormValues) => {
    try {
      await createDeliveryOutcomeMutation.mutateAsync({
        patientId,
        values,
      });

      showToast({
        type: "success",
        title: "Luaran persalinan berhasil disimpan",
        description:
          "Hasil persalinan telah dicatat dan sekarang bersifat read-only.",
      });

      setModalOpen(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal menyimpan luaran persalinan",
        description: getErrorMessage(error),
      });
    }
  };

  if (deliveryOutcomeQuery.isLoading) {
    return <TableSkeleton rows={4} columns={3} />;
  }

  if (deliveryOutcomeQuery.isError) {
    return (
      <ErrorState
        title="Gagal memuat luaran persalinan"
        description="Terjadi kesalahan saat mengambil data luaran persalinan."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => deliveryOutcomeQuery.refetch()}
          >
            Coba Lagi
          </Button>
        }
      />
    );
  }

  const outcome = deliveryOutcomeQuery.data;

  if (outcome) {
    return <DeliveryOutcomeResultCard outcome={outcome} />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Luaran Persalinan</CardTitle>

          <CardDescription>
            Catat metode yang menjadi hasil akhir proses persalinan pasien.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EmptyState
            title="Luaran persalinan belum dicatat"
            description="Pilih satu metode persalinan untuk menyelesaikan bagian luaran persalinan pasien."
            action={
              canCreate ? (
                <Button type="button" onClick={() => setModalOpen(true)}>
                  Catat Luaran Persalinan
                </Button>
              ) : undefined
            }
          />
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        title="Catat Luaran Persalinan"
        description="Pilih satu metode persalinan sebagai hasil akhir pasien."
        onClose={() => setModalOpen(false)}
      >
        <DeliveryOutcomeForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={createDeliveryOutcomeMutation.isPending}
        />
      </Modal>
    </>
  );
}
