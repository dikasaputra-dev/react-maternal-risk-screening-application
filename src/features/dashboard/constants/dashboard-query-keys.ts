export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  stats() {
    return [...dashboardQueryKeys.all, "stats"] as const;
  },
};
