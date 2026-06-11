function readBooleanEnv(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;

  return value !== "false";
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",

  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,

  mock: {
    auth: readBooleanEnv(import.meta.env.VITE_MOCK_AUTH, true),
    patients: readBooleanEnv(import.meta.env.VITE_MOCK_PATIENTS, true),
    screenings: readBooleanEnv(import.meta.env.VITE_MOCK_SCREENINGS, true),
    quiz: readBooleanEnv(import.meta.env.VITE_MOCK_QUIZ, true),
    admin: readBooleanEnv(import.meta.env.VITE_MOCK_ADMIN, true),
  },
};
