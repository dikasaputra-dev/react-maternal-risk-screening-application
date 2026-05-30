import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode,
  variant?: BadgeVariant,
}

export function Badge({
  children, 
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </span>
  )
}