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
  const baseStyle = "flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    ghost: "border-transparent text-gray-700 bg-transparent hover:bg-gray-100 shadow-none focus:ring-gray-500"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseStyle} ${variants[variant]} ${width} ${className}`} {...props}>
      {children}
    </button>
  );
}
