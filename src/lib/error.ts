import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>;
};

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data;

    if (data?.message) return data.message;
    if (data?.detail) return data.detail;

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];

      if (firstError) return firstError;
    }

    return "Terjadi kesalahan pada server.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}
