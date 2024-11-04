"use client";

import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // Import the icon

type Option = {
  label: string;
  value: any;
  children?: Option[]; // Recursively define the children type as an array of Option objects
};

type CascadeSelectProps = {
  options: Option[]; // Use the Option type for options
  placeholder: string; // Placeholder text
  label?: string; // Label for non-floating label mode
  floatingLabel?: boolean; // Flag to enable floating label
  hidePlaceholder?: boolean; // Option to hide the placeholder
  disabled?: boolean; // Option to disable the input
  size?: "sm" | "nm" | "lg"; // Size of the input (small, normal, large)
  className?: string; // Additional classes for customization
};

const CascadeSelect: React.FC<CascadeSelectProps> = ({
  options,
  placeholder = "Select an option",
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
  className = "",
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [subOptions, setSubOptions] = useState<Option[] | null>(null);
  const [showOptions, setShowOptions] = useState(false); // State to toggle dropdown visibility

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm", // Small size
    nm: "p-2 text-base", // Normal size
    lg: "p-3 text-lg", // Large size
  }[size];

  // Handle option selection
  const handleOptionSelect = (option: Option) => {
    if (option.children) {
      setSubOptions(option.children); // If there are children, show sub-options
    } else {
      setSelectedOption(option.label); // If no children, set the final selected option
      setSubOptions(null); // Close any sub-options
      setShowOptions(false); // Close the dropdown when an item is selected
    }
  };

  // Toggle dropdown menu visibility
  const toggleOptions = () => {
    if (!disabled) {
      setShowOptions(!showOptions);
    }
  };

  return (
    <div className="relative">
      {/* If a label is provided and floating label is disabled, show a regular label */}
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}

      {/* Input Box to show selected option */}
      <input
        type="text"
        value={selectedOption ? selectedOption : ""}
        placeholder={placeholder}
        readOnly
        onClick={toggleOptions} // Toggle options on input click
        disabled={disabled}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${hidePlaceholder || floatingLabel ? "placeholder-transparent" : "placeholder-soft dark:placeholder-pale"} ${sizeClass} ${className} ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
      />

      {/* If floatingLabel is true, display the floating label */}
      {floatingLabel && (
        <label
          className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text ${
            selectedOption
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-1/2 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder}
        </label>
      )}

      {/* Dropdown Menu */}
      {!disabled && showOptions && (
        <div className="absolute left-0 bg-white dark:bg-coal border-2 border-border dark:border-coal shadow-md rounded-md z-10 min-w-[14rem]">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-between"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
              {option.children && <FaChevronRight className="ml-2" />}
            </div>
          ))}
        </div>
      )}

      {/* Sub-Options if available */}
      {subOptions && showOptions && (
        <div className="absolute left-[14rem] bg-white dark:bg-coal border-2 border-border dark:border-coal shadow-md rounded-md z-10 min-w-[14rem]">
          {subOptions.map((subOption) => (
            <div
              key={subOption.value}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-between"
              onClick={() => handleOptionSelect(subOption)}
            >
              {subOption.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CascadeSelect;
