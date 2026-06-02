import { Badge } from "@/components/ui/badge";
import type { RiskCategory } from "@/features/screenings/types/screening.type";

type ScreeningRiskBadgeProps = {
  risk: RiskCategory;
};

const riskMap: Record<
  RiskCategory,
  {
    label: string;
    variant: "success" | "warning" | "danger";
  }
> = {
  no_risk: {
    label: "Tidak Berisiko",
    variant: "success",
  },
  low_risk: {
    label: "Risiko Rendah",
    variant: "warning",
  },
  high_risk: {
    label: "Risiko Tinggi",
    variant: "danger",
  },
};

export function ScreeningRiskBadge({ risk }: ScreeningRiskBadgeProps) {
  const config = riskMap[risk];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
