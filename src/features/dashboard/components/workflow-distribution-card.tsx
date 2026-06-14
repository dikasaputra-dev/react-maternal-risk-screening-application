import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { DashboardWorkflowDistribution } from "../types/dashboard-stats.type";

type WorkflowDistributionCardProps = {
  distribution: DashboardWorkflowDistribution;

  totalPatients: number;
};

function calculatePercentage(value: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

export function WorkflowDistributionCard({
  distribution,
  totalPatients,
}: WorkflowDistributionCardProps) {
  const items = [
    {
      label: "Belum Dimulai",
      value: distribution.notStarted,
    },
    {
      label: "Pelayanan Berjalan",
      value: distribution.active,
    },
    {
      label: "Dokumentasi Selesai",
      value: distribution.completed,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Status Pelayanan</CardTitle>

        <CardDescription>
          Jumlah pasien berdasarkan tahapan perjalanan pelayanan.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {items.map((item) => {
            const percentage = calculatePercentage(item.value, totalPatients);

            return (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-700">
                    {item.label}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.value} pasien
                    {" · "}
                    {percentage}%
                  </p>
                </div>

                <div
                  className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200"
                  role="progressbar"
                  aria-label={item.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                >
                  <div
                    className="h-full rounded-full bg-blue-600 transition-[width] duration-300"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
