"use client";

import React, { useEffect, useRef } from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "nm" | "lg";
  className?: string;
  indeterminate?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  size = "sm",
  className = "",
  indeterminate = false,
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const sizeClass = {
    sm: "h-4 w-4 text-sm",
    nm: "h-5 w-5 text-base",
    lg: "h-6 w-6 text-lg",
  }[size];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        ref={checkboxRef} // Attach the ref here
        checked={checked}
        onChange={handleCheckboxChange}
        className={`cursor-pointer rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${sizeClass} ${className}`}
        aria-label={checked ? "Checked" : "Unchecked"}
      />
      <label
        className="text-deep dark:text-light cursor-pointer hidden"
        onClick={() => onChange && onChange(!checked)}
      >
        {checked ? "Checked" : "Unchecked"}
      </label>
    </div>
  );
};

export default Checkbox;
