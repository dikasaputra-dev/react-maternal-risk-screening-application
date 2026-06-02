import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: ReactNode;
}

export function Checkbox({
  label,
  description,
  className,
  ...props
}: CheckBoxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50",
        className,
      )}
    >
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />

      <span>
        <span className="block text-sm font-medium text-slate-900">
          {label}
        </span>

        {description && (
          <span className="mt-1 block text-sm text-slate-500">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
