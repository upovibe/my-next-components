"use client";

import React, { useState, useEffect } from "react";

type SelectInputProps = {
  placeholder: string;
  options: string[];
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  type?: string;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  options,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  type = "text",
  disabled = false,
  size = "nm",
  className = "",
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsDropdownVisible(true);

    if (onChange) onChange(inputValue);
  };

  const handleOptionClick = (option: string) => {
    setInternalValue(option);
    setIsDropdownVisible(false);
    if (onChange) onChange(option);
  };

  const inputValue = value !== undefined ? value : internalValue;

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".input-select-container")) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative input-select-container">
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
        } ${sizeClass} ${className} ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
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

      {/* Dropdown for filtered options */}
      {isDropdownVisible && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md max-h-60 overflow-y-auto mt-1">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;