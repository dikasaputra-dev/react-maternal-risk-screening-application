function encodeRouteParameter(value: string) {
  return encodeURIComponent(value);
}

export const patientRouteSegments = {
  initialScreening: "screening",
  laborMonitoring: "monitoring",
  clinicalActions: "actions",
  deliveryOutcome: "delivery-outcome",
  newbornOutcome: "newborn-outcome",
} as const;

export const patientRoutes = {
  list: "/patients",

  create: "/patients/new",

  detail(patientId: string) {
    return `/patients/${encodeRouteParameter(patientId)}`;
  },

  initialScreening(patientId: string) {
    return [
      "/patients",
      encodeRouteParameter(patientId),
      patientRouteSegments.initialScreening,
    ].join("/");
  },

  laborMonitoring(patientId: string) {
    return [
      "/patients",
      encodeRouteParameter(patientId),
      patientRouteSegments.laborMonitoring,
    ].join("/");
  },

  clinicalActions(patientId: string) {
    return [
      "/patients",
      encodeRouteParameter(patientId),
      patientRouteSegments.clinicalActions,
    ].join("/");
  },

  deliveryOutcome(patientId: string) {
    return [
      "/patients",
      encodeRouteParameter(patientId),
      patientRouteSegments.deliveryOutcome,
    ].join("/");
  },

  newbornOutcome(patientId: string) {
    return [
      "/patients",
      encodeRouteParameter(patientId),
      patientRouteSegments.newbornOutcome,
    ].join("/");
  },
};
