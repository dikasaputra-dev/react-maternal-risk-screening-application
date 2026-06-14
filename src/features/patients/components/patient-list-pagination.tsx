import { Button } from "@/components/ui/button";

type PatientListPaginationProps = {
  currentPage: number;
  totalPages: number;
  count: number;
  pageSize: number;

  onPageChange: (page: number) => void;
};

export function PatientListPagination({
  currentPage,
  totalPages,
  count,
  pageSize,
  onPageChange,
}: PatientListPaginationProps) {
  if (count === 0) {
    return null;
  }

  const firstItem = (currentPage - 1) * pageSize + 1;

  const lastItem = Math.min(currentPage * pageSize, count);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Menampilkan {firstItem}–{lastItem} dari {count} pasien
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Sebelumnya
        </Button>

        <span className="min-w-24 text-center text-sm font-medium text-slate-700">
          Halaman {currentPage} dari {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}
