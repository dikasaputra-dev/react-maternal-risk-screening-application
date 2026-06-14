import { Badge } from "@/components/ui/badge";

import { riskCategoryConfig } from "../constants/risk-config";
import type { RiskCategory } from "../types/risk.type";

type RiskBadgeProps = {
  category?: RiskCategory | null;
  score?: number | null;
  showScore?: boolean;
};

export function RiskBadge({
  category,
  score,
  showScore = false,
}: RiskBadgeProps) {
  if (!category) {
    return <Badge variant="default">Belum Dinilai</Badge>;
  }

  const config = riskCategoryConfig[category];

  const label =
    showScore && typeof score === "number"
      ? `${config.label} (${score})`
      : config.label;

  return <Badge variant={config.badgeVariant}>{label}</Badge>;
}
