import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminStatsMock } from "@/features/admin/data/admin.mock";

export function AdminStatsSection() {
  const stats = [
    {
      title: "Total Users",
      description: "Admin dan perawat aktif",
      value: adminStatsMock.totalUsers,
    },
    {
      title: "Total Patients",
      description: "Pasien terdaftar",
      value: adminStatsMock.totalPatients,
    },
    {
      title: "Total Screenings",
      description: "Total sesi skrining",
      value: adminStatsMock.totalScreenings,
    },
    {
      title: "High Risk Cases",
      description: "Kasus risiko tinggi",
      value: adminStatsMock.highRiskCases,
      danger: true,
    },
    {
      title: "Audit Events Today",
      description: "Aktivitas sistem hari ini",
      value: adminStatsMock.auditEventsToday,
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
