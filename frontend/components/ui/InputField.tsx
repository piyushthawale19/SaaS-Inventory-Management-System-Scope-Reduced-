import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, className = "", ...props }: InputFieldProps) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label className="text-xs font-bold text-[#434655] mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </label>
      <input
        className={`block w-full px-3 py-2.5 bg-[#f3f4f5] rounded-md placeholder-[#737686] text-sm text-[#191c1d] focus:outline-none focus:bg-white focus:ring-2 transition-colors ${
          error ? "ring-2 ring-[#ba1a1a]/40" : "focus:ring-[#004ac6]/40"
        }`}
        style={{ border: 'none' }}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#ba1a1a]">{error}</p>}
    </div>
  );
}
