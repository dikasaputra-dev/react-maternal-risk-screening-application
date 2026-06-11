import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  clearAuthSession,
  getAuthSession,
} from "@/features/auth/utils/auth-storage";

type NavbarProps = {
  title: string;
  subtitle?: string;
  onOpenSidebar?: () => void;
};

export function Navbar({ title, subtitle, onOpenSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const session = getAuthSession();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Buka sidebar"
            onClick={onOpenSidebar}
          >
            ☰
          </Button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-slate-900">
              {title}
            </h2>

            {subtitle && (
              <p className="truncate text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-900">
              {session?.user.username ?? "User"}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {session?.user.role ?? "guest"}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
