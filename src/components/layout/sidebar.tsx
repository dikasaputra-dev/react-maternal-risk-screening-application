import { NavLink } from "react-router-dom";

import { dashboardNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activePath?: string;
};

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 lg:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600">MaternityCare</h1>
        <p className="text-sm text-slate-500">Clinical Screening System</p>
      </div>

      <nav className="space-y-1">
        {dashboardNavigation.map((item) => {
          const isActive = activePath === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex rounded-xl px-3 py-2 text-sm font-medium transition",
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
    </aside>
  );
}