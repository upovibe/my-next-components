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
  onBlur?: () => void;
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
  onBlur,
}) => {
  const [internalValue, setInternalValue] = useState<string[] | string>(
    multiple
      ? Array.isArray(value)
        ? value
        : []
      : typeof value === "string"
      ? value
      : ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    },
    [onBlur]
  );

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
    if (!disabled) setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

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
    <div className={`relative ${className}`} ref={buttonRef}>
      {floatingLabel && (
        <label
          className={`absolute left-2 transition-all duration-200 text-gray-500 cursor-text ${
            internalValue
              ? "-top-2 text-xs bg-white px-2 rounded"
              : "top-2 text-base"
          }`}
        >
          {label}
        </label>
      )}

      <div
        onClick={handleToggleDropdown}
        tabIndex={0}
        className={`whitespace-nowrap flex flex-col w-full border-2 space-x-2 relative border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${sizeClass} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex items-center">
          <span
            className={`flex-grow truncate ${
              internalValue ? "" : "text-gray-500"
            }`}
          >
            {multiple
              ? Array.isArray(internalValue) && internalValue.length > 0
                ? internalValue
                    .map((v) => options.find((o) => o.value === v)?.label)
                    .join(", ")
                : placeholder
              : options.find((o) => o.value === internalValue)?.label ||
                placeholder}
          </span>
          <span className="ml-4">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
      </div>

      {isOpen && (
        <ul
          className="fixed mt-1 z-50 max-h-60 overflow-y-auto bg-primary dark:bg-shade border border-border dark:border-coal rounded-md shadow-lg"
          style={{minWidth: buttonRef.current?.getBoundingClientRect().width,}}
          ref={dropdownRef}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value as string)}
              className={` whitespace-nowrap cursor-pointer p-2 flex justify-between items-center hover:bg-highlight/50 dark:hover:bg-ocean/50 ${
                isSelected(option.value as string)
                  ? "bg-highlight dark:bg-ocean text-white"
                  : "text-deep dark:text-light"
              }`}
            >
              <span className="truncate text-md">{option.label}</span>
              {isSelected(option.value as string) && (
                <FaCheck className="text-sm" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
