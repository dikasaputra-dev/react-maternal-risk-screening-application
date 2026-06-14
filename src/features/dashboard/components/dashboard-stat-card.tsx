import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type DashboardStatCardProps = {
  label: string;
  value: string | number;
  description: string;
  footer?: ReactNode;
};

export function DashboardStatCard({
  label,
  value,
  description,
  footer,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-2 text-sm leading-5 text-slate-500">{description}</p>

        {footer && (
          <div className="mt-4 border-t border-slate-200 pt-3">{footer}</div>
        )}
      </CardContent>
    </Card>
  );
}
