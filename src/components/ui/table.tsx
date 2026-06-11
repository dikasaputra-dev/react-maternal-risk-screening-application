import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
      <table
        className={cn("w-full min-w-760px text-left text-sm", className)}
        {...props}
      />
    </div>
  );
}

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead className={cn("bg-slate-50 text-slate-600", className)} {...props} />
  );
}

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-slate-200", className)} {...props} />
  );
}

type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={cn("bg-white", className)} {...props} />;
}

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn("whitespace-nowrap px-4 py-3 font-medium", className)}
      {...props}
    />
  );
}

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, ...props }: TableCellProps) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}
