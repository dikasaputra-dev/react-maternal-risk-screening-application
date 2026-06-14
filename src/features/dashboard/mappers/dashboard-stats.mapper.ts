import type { DashboardStatsDto } from "../types/dashboard-stats.dto";
import type { DashboardStats } from "../types/dashboard-stats.type";

export function mapDashboardStatsDtoToDashboardStats(
  dto: DashboardStatsDto,
): DashboardStats {
  return {
    totalPatients: dto.total_patients,

    workflow: {
      notStarted: dto.workflow_distribution.not_started,

      active: dto.workflow_distribution.active,

      completed: dto.workflow_distribution.completed,
    },

    risk: {
      unassessed: dto.risk_distribution.unassessed,

      lowRisk: dto.risk_distribution.low_risk,

      moderateRisk: dto.risk_distribution.moderate_risk,

      highRisk: dto.risk_distribution.high_risk,
    },

    averageCompletionPercentage: dto.average_completion_percentage,

    highRiskActivePatients: dto.high_risk_active_patients,
  };
}
