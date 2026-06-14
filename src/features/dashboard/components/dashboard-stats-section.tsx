import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { TableSkeleton } from "@/components/ui/table-skeleton";

import { DashboardStatCard } from "./dashboard-stat-card";
import { RiskDistributionCard } from "./risk-distribution-card";
import { WorkflowDistributionCard } from "./workflow-distribution-card";
import { useDashboardStats } from "../hooks/use-dashboard-stats";

type DashboardStatsSectionProps = {
  enabled?: boolean;
};

export function DashboardStatsSection({
  enabled = true,
}: DashboardStatsSectionProps) {
  const statsQuery = useDashboardStats(enabled);

  if (statsQuery.isLoading) {
    return (
      <div role="status" aria-live="polite" className="space-y-6">
        <span className="sr-only">Memuat statistik dashboard...</span>

        <TableSkeleton rows={2} columns={4} />

        <TableSkeleton rows={4} columns={2} />
      </div>
    );
  }

  if (statsQuery.isError || !statsQuery.data) {
    return (
      <ErrorState
        title="Statistik gagal dimuat"
        description="Terjadi kesalahan saat mengambil statistik pelayanan pasien."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => statsQuery.refetch()}
          >
            Coba Lagi
          </Button>
        }
      />
    );
  }

  const stats = statsQuery.data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Total Pasien"
          value={stats.totalPatients}
          description="Seluruh pasien yang terdaftar di dalam sistem."
        />

        <DashboardStatCard
          label="Pelayanan Aktif"
          value={stats.workflow.active}
          description="Pasien yang sudah diskrining tetapi dokumentasinya belum selesai."
        />

        <DashboardStatCard
          label="Risiko Tinggi Aktif"
          value={stats.highRiskActivePatients}
          description="Pasien aktif dengan hasil risiko terbaru kategori tinggi."
        />

        <DashboardStatCard
          label="Rata-rata Kelengkapan"
          value={`${stats.averageCompletionPercentage}%`}
          description="Rata-rata kelengkapan milestone dokumentasi seluruh pasien."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <WorkflowDistributionCard
          distribution={stats.workflow}
          totalPatients={stats.totalPatients}
        />

        <RiskDistributionCard
          distribution={stats.risk}
          totalPatients={stats.totalPatients}
        />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Statistik bukan keputusan klinis
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-800">
          Statistik dashboard hanya digunakan untuk pemantauan dokumentasi dan
          distribusi data. Penanganan pasien tetap harus mengikuti pemeriksaan
          dan keputusan tenaga medis.
        </p>
      </div>
    </div>
  );
}
