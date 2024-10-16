"use client";

import React, { useState } from "react";

type InputProps = {
  placeholder: string; // Placeholder text
  label?: string; // Label for non-floating label mode
  floatingLabel?: boolean; // Flag to enable floating label
  hidePlaceholder?: boolean; // Option to hide the placeholder
  type?: string; // Input type (default to text)
  disabled?: boolean; // Option to disable the input
  size?: "sm" | "nm" | "lg"; // Size of the input (small, normal, large)
  className?: string; // Additional classes for customization
  value?: string; // External value for controlled input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // External onChange handler
};

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  type = "text",
  disabled = false,
  size = "nm",
  className = "",
  value, // Accept external value
  onChange, // Accept external onChange handler
}) => {
  const [internalValue, setInternalValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e); // Call the external onChange if provided
  };

  const inputValue = value !== undefined ? value : internalValue;

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm", // Small size
    nm: "p-2 text-base", // Normal size
    lg: "p-3 text-lg", // Large size
  }[size];

  return (
    <div className="relative">
      {/* If a label is provided and floating label is disabled, show a regular label */}
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}

      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={hidePlaceholder ? "" : placeholder}
        disabled={disabled}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel ? "placeholder-transparent" : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`} // Apply size classes and disabled styles
      />

      {/* If floatingLabel is true, display the floating label */}
      {floatingLabel && (
        <label
          className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text ${
            inputValue
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-1/2 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default Input;
