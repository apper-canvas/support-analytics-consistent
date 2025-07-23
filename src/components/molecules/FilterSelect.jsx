import React from "react";
import { cn } from "@/utils/cn";

const FilterSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select...", 
  className,
  ...props 
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
        className
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;