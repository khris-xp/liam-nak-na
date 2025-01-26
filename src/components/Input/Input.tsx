"use client";

import React from "react";
import { X } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  variant?: "default" | "filled" | "outlined";
  shadow?: boolean;
}

export default function Input({
  label,
  error,
  icon,
  clearable = false,
  variant = "default",
  shadow = false,
  className = "",
  value,
  onChange,
  ...props
}: InputProps) {
  const [localValue, setLocalValue] = React.useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setLocalValue("");
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const baseStyles =
    "w-full rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2";
  const variantStyles = {
    default:
      "bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-200",
    filled:
      "bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-blue-200",
    outlined:
      "bg-transparent border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200",
  };
  const shadowStyles = shadow ? "shadow-sm" : "";
  const errorStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          value={localValue}
          onChange={handleChange}
          className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${shadowStyles}
            ${errorStyles}
            ${icon ? "pl-10" : ""}
            ${clearable && localValue ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />
        {clearable && localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
