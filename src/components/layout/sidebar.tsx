import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { dashboardNavigation } from "@/constants/navigation";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { hasPermission, hasRole } from "@/features/auth/utils/permission";
import { cn } from "@/lib/utils";

type SidebarNavigationProps = {
  activePath?: string;
  onNavigate?: () => void;
};

function SidebarNavigation({ activePath, onNavigate }: SidebarNavigationProps) {
  const session = getAuthSession();
  const user = session?.user ?? null;

  const navigationItems = dashboardNavigation.filter((item) => {
    if (item.allowedRoles && !hasRole(user, item.allowedRoles)) {
      return false;
    }

    if (
      item.requiredPermission &&
      !hasPermission(user, item.requiredPermission)
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600">MaternityCare</h1>
        <p className="text-sm text-slate-500">Clinical Screening System</p>
      </div>

      <nav className="space-y-1" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const isActive = activePath === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

type SidebarProps = {
  activePath?: string;
};

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 lg:block">
      <SidebarNavigation activePath={activePath} />
    </aside>
  );
}

type MobileSidebarProps = {
  open: boolean;
  activePath?: string;
  onClose: () => void;
};

export function MobileSidebar({
  open,
  activePath,
  onClose,
}: MobileSidebarProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Tutup sidebar"
        className="absolute inset-0 bg-slate-950/50"
        onClick={onClose}
      />

      <aside className="relative z-10 h-full w-72 max-w-[85vw] bg-white px-4 py-6 shadow-xl">
        <div className="mb-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>

        <SidebarNavigation activePath={activePath} onNavigate={onClose} />
      </aside>
    </div>
  );
}
