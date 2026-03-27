import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 ${className}`} style={{ boxShadow: '0 0 40px rgba(0,74,198,0.04)' }}>
      {title && (
        <h3 className="text-base font-semibold text-[#191c1d] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
