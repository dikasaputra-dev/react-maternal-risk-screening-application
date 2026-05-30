import { Badge } from "@/components/ui/badge";
import type { RiskCategory } from "@/features/patients/types/patient.type"

type RiskBadgeProps = {
  risk: RiskCategory
};

const riskMap: Record<
  RiskCategory,
  {
    label:string;
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
  }
}

export function RiskBadge({risk}: RiskBadgeProps) {
  const config = riskMap[risk];

  return <Badge variant={config.variant}>{config.label}</Badge>
}