import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Navbar } from "@/components/layout/navbar";
import { MobileSidebar, Sidebar } from "@/components/layout/sidebar";
import { SkipLink } from "@/components/layout/skip-link";

const pageMeta: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Ringkasan data skrining dan pasien.",
  },
  "/patients": {
    title: "Patients",
    subtitle: "Kelola data pasien ibu hamil.",
  },
  "/screenings": {
    title: "Screenings",
    subtitle: "Form skrining awal persalinan.",
  },
  "/screenings/history": {
    title: "Screening History",
    subtitle: "Riwayat hasil skrining pasien.",
  },
  "/admin/audit-logs": {
    title: "Audit Logs",
    subtitle: "Pantau aktivitas sistem dan user.",
  },
};

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/patients/")) {
    return {
      title: "Patient Detail",
      subtitle: "Detail pasien dan riwayat skrining.",
    };
  }

  return (
    pageMeta[pathname] ?? {
      title: "Dashboard",
      subtitle: "Clinical Screening System",
    }
  );
}

export function DashboardLayout() {
  const location = useLocation();

  const [mobileSidebarOpenedPath, setMobileSidebarOpenedPath] = useState<
    string | null
  >(null);

  const meta = getPageMeta(location.pathname);

  const isMobileSidebarOpen = mobileSidebarOpenedPath === location.pathname;

  useEffect(() => {
    document.title = `${meta.title} | MaternityCare`;
  }, [meta.title]);

  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <SkipLink />

      <Sidebar activePath={location.pathname} />

      <MobileSidebar
        open={isMobileSidebarOpen}
        activePath={location.pathname}
        onClose={() => setMobileSidebarOpenedPath(null)}
      />

      <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
        <Navbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenSidebar={() => setMobileSidebarOpenedPath(location.pathname)}
        />

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
