import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission } from "@/features/auth/utils/permission";
import { DashboardStatsSection } from "@/features/dashboard/components/dashboard-stats-section";
import { patientRoutes } from "@/features/patients/constants/patient-routes";

export function DashboardPage() {
  const session = getAuthSession();

  const canViewAdminStats = hasPermission(session?.user, "view_admin_stats");

  if (canViewAdminStats) {
    return <DashboardStatsSection />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selamat Datang</CardTitle>

        <CardDescription>
          Akses data pasien dan lanjutkan pelayanan berdasarkan tahapan
          masing-masing pasien.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="font-semibold text-blue-950">
            {session?.user.username ?? "Tenaga Medis"}
          </p>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-800">
            Anda dapat menambahkan pasien, melakukan skrining awal, mencatat
            pemantauan persalinan, tindakan, serta luaran pasien. Data yang
            telah disimpan tidak dapat diubah oleh nurse.
          </p>

          <Link
            to={patientRoutes.list}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Buka Data Pasien
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
