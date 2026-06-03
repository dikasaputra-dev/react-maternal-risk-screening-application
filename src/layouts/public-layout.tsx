import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
        <Outlet />
      </div>
    </main>
  );
}
