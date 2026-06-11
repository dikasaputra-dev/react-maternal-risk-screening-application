import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStats } from "@/features/admin/hooks/use-admin";

export function AdminStatsSection() {
  const { data: adminStats, isLoading, isError, refetch } = useAdminStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-9 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !adminStats) {
    return (
      <ErrorState
        title="Gagal memuat statistik admin"
        description="Terjadi kesalahan saat mengambil data statistik admin."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Coba Lagi
          </button>
        }
      />
    );
  }

  const stats = [
    {
      title: "Total Users",
      description: "Admin dan perawat aktif",
      value: adminStats.totalUsers,
    },
    {
      title: "Total Patients",
      description: "Pasien terdaftar",
      value: adminStats.totalPatients,
    },
    {
      title: "Total Screenings",
      description: "Total sesi skrining",
      value: adminStats.totalScreenings,
    },
    {
      title: "High Risk Cases",
      description: "Kasus risiko tinggi",
      value: adminStats.highRiskCases,
      danger: true,
    },
    {
      title: "Audit Events Today",
      description: "Aktivitas sistem hari ini",
      value: adminStats.auditEventsToday,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="text-sm">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <p
              className={
                item.danger
                  ? "text-3xl font-bold text-red-600"
                  : "text-3xl font-bold text-slate-900"
              }
            >
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
