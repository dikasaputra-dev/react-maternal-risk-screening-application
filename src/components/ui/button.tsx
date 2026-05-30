import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "danger" 
  | "ghost";
  
type ButtonSize = 
  | "sm" 
  | "md" 
  | "lg" 
  | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}