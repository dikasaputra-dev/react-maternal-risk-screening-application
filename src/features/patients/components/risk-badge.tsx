import { RiskBadge as ClinicalRiskBadge } from "@/features/clinical-risk/components/risk-badge";
import type { RiskCategory } from "@/features/clinical-risk/types/risk.type";

type RiskBadgeProps = {
  risk?: RiskCategory | null;
  score?: number | null;
};

export function RiskBadge({ risk, score }: RiskBadgeProps) {
  return (
    <ClinicalRiskBadge
      category={risk}
      score={score}
      showScore={typeof score === "number"}
    />
  );
}
