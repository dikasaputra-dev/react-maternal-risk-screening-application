export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",

  mock: {
    auth: import.meta.env.VITE_MOCK_AUTH !== "false",
    patients: import.meta.env.VITE_MOCK_PATIENTS !== "false",
    screenings: import.meta.env.VITE_MOCK_SCREENINGS !== "false",
    quiz: import.meta.env.VITE_MOCK_QUIZ !== "false",
    admin: import.meta.env.VITE_MOCK_ADMIN !== "false",
  },
};
