import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Navbar } from "@/components/layout/navbar";
import { MobileSidebar, Sidebar } from "@/components/layout/sidebar";
import { SkipLink } from "@/components/layout/skip-link";

type PageMeta = {
  title: string;
  subtitle: string;
};

const staticPageMeta: Record<string, PageMeta> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Ringkasan pelayanan pasien bersalin.",
  },

  "/patients": {
    title: "Patients",
    subtitle: "Kelola identitas dan pelayanan pasien.",
  },

  "/admin/audit-logs": {
    title: "Audit Logs",
    subtitle: "Pantau aktivitas dan perubahan data sistem.",
  },
};

function getPatientWorkflowPageMeta(pathname: string): PageMeta | null {
  if (!pathname.startsWith("/patients/")) {
    return null;
  }

  if (pathname.endsWith("/screening")) {
    return {
      title: "Skrining Awal",
      subtitle: "Pengkajian awal kondisi pasien bersalin.",
    };
  }

  if (pathname.endsWith("/monitoring")) {
    return {
      title: "Pemantauan Persalinan",
      subtitle: "Pemantauan kondisi ibu dan janin secara berkala.",
    };
  }

  if (pathname.endsWith("/actions")) {
    return {
      title: "Tindakan",
      subtitle: "Pencatatan tindakan dan keputusan klinis.",
    };
  }

  if (pathname.endsWith("/delivery-outcome")) {
    return {
      title: "Luaran Persalinan",
      subtitle: "Pencatatan hasil akhir proses persalinan.",
    };
  }

  if (pathname.endsWith("/newborn-outcome")) {
    return {
      title: "Luaran Kelahiran Bayi",
      subtitle: "Pencatatan kondisi bayi setelah kelahiran.",
    };
  }

  return {
    title: "Detail Pasien",
    subtitle: "Identitas dan alur pelayanan pasien.",
  };
}

function getPageMeta(pathname: string): PageMeta {
  const patientWorkflowMeta = getPatientWorkflowPageMeta(pathname);

  if (patientWorkflowMeta) {
    return patientWorkflowMeta;
  }

  return (
    staticPageMeta[pathname] ?? {
      title: "MaternityCare",
      subtitle: "Sistem manajemen pasien bersalin.",
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
