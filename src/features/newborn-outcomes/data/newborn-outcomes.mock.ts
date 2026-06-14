import type { NewbornOutcome } from "../types/newborn-outcome.type";

export const newbornOutcomesMock: Record<string, NewbornOutcome> = {
  "3": {
    id: "newborn-outcome-3",
    patientId: "3",
    outcomeType: "apgar",
    apgarScore: 8,

    recordedAt: "2026-06-14T13:35:00.000Z",

    recordedBy: {
      id: "nurse-1",
      name: "Ns. Rini",
    },

    createdAt: "2026-06-14T13:35:00.000Z",
  },
};
