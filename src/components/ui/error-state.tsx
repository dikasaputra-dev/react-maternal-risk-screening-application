import type { ReactNode } from "react";

type ErrorStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <h3 className="text-base font-semibold text-red-900">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-red-700">{description}</p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
