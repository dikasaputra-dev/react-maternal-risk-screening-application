import { cn } from "@/lib/utils";
import type { HTMLAttributes, HtmlHTMLAttributes, TableHTMLAttributes } from "react";

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-slate-50", className)} {...props} />
}

export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-slate-200", className)} {...props} />
}

export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr 
      className={cn("transition-colors hover:bg-slate-50", className)} 
      {...props} 
    />
  )
}

export function TableHead({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th 
      className={cn(
        "h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-slate-500", 
        className,
      )} 
      {...props}
    />
  )
}

export function TableCell ({
  className, 
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td 
      className={cn("px-4 py-3 align-middle text-slate-700", className)}
      {...props}
    />
  )
}