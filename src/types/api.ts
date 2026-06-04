export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
};
