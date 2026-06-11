/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;

  readonly VITE_MOCK_AUTH?: string;
  readonly VITE_MOCK_PATIENTS?: string;
  readonly VITE_MOCK_SCREENINGS?: string;
  readonly VITE_MOCK_QUIZ?: string;
  readonly VITE_MOCK_ADMIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
