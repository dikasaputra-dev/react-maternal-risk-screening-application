import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Outlet, useLocation } from "react-router-dom";

const pageMeta: Record<
  string,
  {
    title: string;
    subtitle?: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Ringkasan monitoring skrining awal persalinan",
  },
  "/patients": {
    title: "Patients",
    subtitle: "Kelola data pasien ibu hamil",
  },
  "/screenings": {
    title: "Screenings",
    subtitle: "Input dan pantau hasil skrining pasien",
  },
  "/screenings/history": {
    title: "Screening History",
    subtitle: "Riwayat skrining dengan filter dan export",
  },
  "/admin/audit-logs": {
    title: "Audit Logs",
    subtitle: "Jejak audit perubahan data medis",
  },
}

export function DashboardLayout() {
  const location = useLocation();

  const meta = pageMeta[location.pathname] ?? {
    title: "Dashboard",
    subtitle: "Clinical Screening System",
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <Sidebar activePath={location.pathname} />

      <main className="min-w-0 flex-1">
        <Navbar title={meta.title} subtitle={meta.subtitle} />

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}