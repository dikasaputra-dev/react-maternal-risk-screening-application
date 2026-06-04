import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Menampilkan{" "}
        <span className="font-medium text-slate-900">{startItem}</span>
        {" - "}
        <span className="font-medium text-slate-900">{endItem}</span>
        {" dari "}
        <span className="font-medium text-slate-900">{totalItems}</span>
        {" data"}
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        <div className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
          Page {currentPage} / {totalPages}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
