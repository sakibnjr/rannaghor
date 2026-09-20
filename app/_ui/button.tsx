import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8572A] disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-98 select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 min-h-[36px] rounded-full",
    md: "text-sm px-5 py-2.5 min-h-[44px] rounded-full",
    lg: "text-base px-6 py-3.5 min-h-[48px] rounded-full font-semibold",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#E8572A] text-white hover:bg-[#D24519] shadow-sm hover:shadow-md active:bg-[#C03D14]",
    secondary:
      "bg-[#17624F] text-white hover:bg-[#124f40] shadow-sm",
    outline:
      "bg-white border border-[#EAE5E1] text-[#1D2522] hover:bg-stone-50 hover:border-stone-300 shadow-2xs",
    ghost:
      "bg-transparent text-[#1D2522] hover:bg-stone-100",
    icon:
      "p-2 rounded-full min-h-[40px] min-w-[40px] text-[#1D2522] hover:bg-stone-100",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
