import type { ReactNode } from "react";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function ErrorState({
  title = "Terjadi kesalahan",
  description = "Data gagal dimuat. Silakan coba lagi.",
  action,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
        !
      </div>

      <h3 className="text-sm font-semibold text-red-900">{title}</h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-red-700">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
