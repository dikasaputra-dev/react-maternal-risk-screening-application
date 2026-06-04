import { Button } from "@/components/ui/button";
import {
  clearAuthSession,
  getAuthSession,
} from "@/features/auth/utils/auth-storage";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  title: string;
  subtitle?: string;
};

export function Navbar({ title, subtitle }: NavbarProps) {
  const navigate = useNavigate();
  const session = getAuthSession();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            {session?.user.username ?? "User"}
          </p>
          <p className="text-xs text-slate-500">
            {session?.user.role ?? "role"}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
