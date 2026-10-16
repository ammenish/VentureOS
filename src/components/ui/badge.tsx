import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "destructive"
    | "primary"
    | "outline"
    | "indigo";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#111110]/[0.07] text-[#111110] border-[#111110]/15",
    primary: "bg-[#111110] text-white border-transparent",
    secondary: "bg-neutral-100 text-neutral-700 border-neutral-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    destructive: "bg-red-50 text-red-700 border-red-200",
    outline: "bg-transparent text-neutral-600 border-neutral-300",
    indigo: "bg-[#111110]/[0.06] text-[#111110] border-[#E5E5E0]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps };
