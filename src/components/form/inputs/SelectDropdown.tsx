import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

type Option = {
  label: string;
  value: string | number;
};

type SelectDropdownProps = {
  options: Option[];
  label?: string;
  placeholder?: string;
  floatingLabel?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value?: string[] | string;
  onChange?: (selected: string[] | string) => void;
  onBlur?: () => void; // Added onBlur prop
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  label,
  placeholder = "Select...",
  floatingLabel,
  multiple,
  disabled,
  size = "nm",
  className = "",
  value,
  onChange,
  onBlur, // Added onBlur destructuring
}) => {
  const [internalValue, setInternalValue] = useState<string[] | string>(
    multiple ? (Array.isArray(value) ? value : []) : typeof value === "string" ? value : ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown

  // Memoize handleClickOutside using useCallback
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      if (onBlur) onBlur(); // Call onBlur when clicked outside
    }
  }, [onBlur]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const updatedValue = Array.isArray(internalValue)
        ? internalValue.includes(optionValue)
          ? internalValue.filter((v) => v !== optionValue)
          : [...internalValue, optionValue]
        : optionValue;
      setInternalValue(updatedValue);
      if (onChange) onChange(updatedValue);
    } else {
      setInternalValue(optionValue);
      if (onChange) onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]); // Added handleClickOutside to dependencies

  const isSelected = (optionValue: string) =>
    multiple
      ? Array.isArray(internalValue) && internalValue.includes(optionValue)
      : internalValue === optionValue;

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {floatingLabel && (
        <label
          className={`absolute left-2 transition-all duration-200 text-soft dark:text-pale cursor-text ${
            internalValue
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-2 text-base"
          }`}
        >
          {label}
        </label>
      )}

      <div
        onClick={handleToggleDropdown}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-pointer focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      >
        <span className={`block truncate ${internalValue ? "" : "text-soft dark:text-pale"}`}>
          {multiple
            ? Array.isArray(internalValue) && internalValue.length > 0
              ? internalValue
                  .map((v) => options.find((o) => o.value === v)?.label)
                  .join(", ")
              : placeholder
            : options.find((o) => o.value === internalValue)?.label || placeholder}
        </span>
        <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200`}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`absolute w-full max-h-60 overflow-y-auto mt-2 bg-primary dark:bg-shade border border-border dark:border-coal rounded-md shadow-lg z-10`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value as string)}
              className={`cursor-pointer p-2 flex justify-between items-center hover:bg-highlight/50 dark:hover:bg-ocean/50 ${
                isSelected(option.value as string)
                  ? "bg-highlight dark:bg-ocean text-white"
                  : "text-deep dark:text-light"
              }`}
            >
              <span>{option.label}</span>
              {isSelected(option.value as string) && <FaCheck />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
