import { Button } from "@/components/ui/button";

type NavbarProps = {
  title: string;
  subtitle?: string;
  username?: string;
}

export function Navbar({
  title,
  subtitle,
  username = "Ns. Rini",
}: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">{username}</p>
          <p className="text-xs text-slate-500">Nurse</p>
        </div>

        <Button variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  )
}