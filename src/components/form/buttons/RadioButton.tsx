"use client";

import React from "react";

type RadioButtonProps = {
  options: { value: string; label: string }[]; // Array of options with value and label
  name: string; // Name attribute for grouping radio buttons
  selectedValue?: string; // Currently selected value
  onChange: (value: string) => void; // Callback when a radio button is selected
  disabled?: boolean; // Option to disable all radio buttons
  className?: string; // Additional classes for customization
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center mb-4 cursor-pointer ${disabled ? "text-gray-400" : "text-black"}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            className={`appearance-none size-4 border-2 border-border dark:border-coal rounded-full bg-transparent checked:bg-secondary dark:checked:bg-dim 
              focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-light 
              checked:border-highlight dark:checked:border-ocean transition-all duration-100 cursor-pointer 
              ${disabled ? "cursor-not-allowed" : ""}`}
          />
          <span
            className={`ml-2 ${disabled ? "text-gray-400" : "text-black"}`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
