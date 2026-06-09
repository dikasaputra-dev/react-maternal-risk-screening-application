import type { PaginatedResponse } from "@/types/api";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  code?: string | number;
  data: T;
};

type ApiPaginatedEnvelope<T> = {
  success?: boolean;
  message?: string;
  code?: string | number;
  data: T[];
  pagination?: {
    count: number;
    current_page?: number;
    currentPage?: number;
    total_pages?: number;
    totalPages?: number;
    page_size?: number;
    pageSize?: number;
  };
};

type DrfPaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function unwrapApiData<T>(payload: ApiEnvelope<T> | T): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

export function normalizePaginatedResponse<T>(
  payload: ApiPaginatedEnvelope<T> | DrfPaginatedResponse<T> | T[],
  page = 1,
  pageSize = 10,
): PaginatedResponse<T> {
  if (Array.isArray(payload)) {
    return {
      data: payload,
      pagination: {
        count: payload.length,
        currentPage: page,
        totalPages: 1,
        pageSize,
      },
    };
  }

  if ("results" in payload) {
    return {
      data: payload.results,
      pagination: {
        count: payload.count,
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(payload.count / pageSize)),
        pageSize,
      },
    };
  }

  return {
    data: payload.data,
    pagination: {
      count: payload.pagination?.count ?? payload.data.length,
      currentPage:
        payload.pagination?.currentPage ??
        payload.pagination?.current_page ??
        page,
      totalPages:
        payload.pagination?.totalPages ??
        payload.pagination?.total_pages ??
        Math.max(1, Math.ceil(payload.data.length / pageSize)),
      pageSize:
        payload.pagination?.pageSize ??
        payload.pagination?.page_size ??
        pageSize,
    },
  };
}
