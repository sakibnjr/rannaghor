import type { ReactNode } from "react";

export interface BadgeProps {
  variant?: "bestseller" | "success" | "neutral";
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "bestseller",
  children,
  className = "",
}: BadgeProps) {
  const styles = {
    bestseller:
      "bg-[#E8572A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs tracking-wide",
    success:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium px-2.5 py-1 rounded-full",
    neutral:
      "bg-stone-100 text-stone-700 text-xs font-medium px-2.5 py-0.5 rounded-full",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none select-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
