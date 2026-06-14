export type DashboardStatsDto = {
  total_patients: number;

  workflow_distribution: {
    not_started: number;
    active: number;
    completed: number;
  };

  risk_distribution: {
    unassessed: number;
    low_risk: number;
    moderate_risk: number;
    high_risk: number;
  };

  average_completion_percentage: number;

  high_risk_active_patients: number;
};
