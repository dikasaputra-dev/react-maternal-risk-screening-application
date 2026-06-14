import type { DeliveryOutcome } from "../types/delivery-outcome.type";

export const deliveryOutcomesMock: Record<string, DeliveryOutcome> = {
  "3": {
    id: "delivery-outcome-3",
    patientId: "3",
    outcomeType: "spontaneous",
    recordedAt: "2026-06-14T13:30:00.000Z",

    recordedBy: {
      id: "nurse-1",
      name: "Ns. Rini",
    },

    createdAt: "2026-06-14T13:30:00.000Z",
  },
};
