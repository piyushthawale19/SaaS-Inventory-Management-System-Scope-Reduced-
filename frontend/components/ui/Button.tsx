import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary: "text-white bg-gradient-to-br from-[#004ac6] to-[#2563eb] hover:from-[#003ea8] hover:to-[#004ac6] focus:ring-[#b4c5ff]",
    secondary: "text-[#191c1d] bg-[#e7e8e9] hover:bg-[#d9dadb] focus:ring-[#c3c6d7]",
    danger: "text-white bg-[#ba1a1a] hover:bg-[#93000a] focus:ring-[#ffdad6]",
    ghost: "text-[#004ac6] bg-transparent hover:bg-[#f3f4f5] focus:ring-[#dbe1ff] shadow-none"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button className={`${base} ${variants[variant]} ${width} ${className}`} {...props}>
      {children}
    </button>
  );
}
