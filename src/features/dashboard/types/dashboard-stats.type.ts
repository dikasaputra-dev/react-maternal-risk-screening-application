export type DashboardWorkflowDistribution = {
  notStarted: number;
  active: number;
  completed: number;
};

export type DashboardRiskDistribution = {
  unassessed: number;
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
};

export type DashboardStats = {
  totalPatients: number;

  workflow: DashboardWorkflowDistribution;

  risk: DashboardRiskDistribution;

  averageCompletionPercentage: number;

  highRiskActivePatients: number;
};
