"use client";

import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing arrow icons

type NumberInputProps = {
  placeholder: string; // Placeholder text
  label?: string; // Label for non-floating label mode
  floatingLabel?: boolean; // Flag to enable floating label
  hidePlaceholder?: boolean; // Option to hide the placeholder
  disabled?: boolean; // Option to disable the input
  size?: "sm" | "nm" | "lg"; // Size of the input (small, normal, large)
  className?: string; // Additional classes for customization
  min?: number; // Minimum value
  max?: number; // Maximum value
  step?: number; // Step increment
  symbol?: string; // Optional symbol like $ or %
  showArrows?: boolean; // Show up and down arrows inside the input
  showSideButtons?: boolean; // Show left and right increment/decrement buttons
  decimalPlaces?: number; // Number of decimal places to allow
};

const NumberInput: React.FC<NumberInputProps> = ({
  placeholder,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
  className = "",
  min = 0,
  max = 100,
  step = 1,
  symbol = "",
  showArrows = false,
  showSideButtons = false,
  decimalPlaces = 2,
}) => {
  const [value, setValue] = useState<number | string>(0);
  const [isInvalid, setIsInvalid] = useState(false); // Track if input is invalid

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  const buttonSizeClass = {
    sm: "text-sm px-2 py-1",
    nm: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
  }[size];

  // Handle value change
  const handleValueChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setValue(newValue.toFixed(decimalPlaces));
      setIsInvalid(false);
    }
  };

  // Validate if the input is numeric, allows allowed symbols, and decimal points
  const validateInput = (input: string) => {
    const allowedSymbols = symbol
      ? `[${symbol.replace(/[\$\^\*\+\?\.\(\)]/g, "\\$&")}]?`
      : ""; // Escape special symbols
    const validRegex = new RegExp(
      `^${allowedSymbols}[0-9]*\\.?[0-9]{0,${decimalPlaces}}$`
    );
    return validRegex.test(input);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Validate input to allow numbers, decimal points, and symbols (e.g., $ or %)
    if (validateInput(input) || input === "") {
      setValue(input);
      setIsInvalid(false);
    } else {
      setIsInvalid(true); // Invalid input, show red border
    }
  };

  // Increment and Decrement functions with support for decimal step values
  const increment = () => handleValueChange((Number(value) || 0) + step);
  const decrement = () => handleValueChange((Number(value) || 0) - step);

  return (
    <div className="relative flex items-center">
      {/* Left decrement button (if showSideButtons is true) */}
      {showSideButtons && (
        <button
          type="button" // Set button type to button
          onClick={decrement}
          disabled={disabled}
          className={`border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-l-md ${buttonSizeClass} ${
            disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
          }`}
        >
          -
        </button>
      )}

      {/* Input Field */}
      <div className="relative w-full">
        <input
          type="text" // Allow symbols and decimals
          value={symbol ? `${symbol}${value}` : value}
          onChange={handleInputChange}
          placeholder={hidePlaceholder ? "" : placeholder}
          disabled={disabled}
          className={`w-full border-2 ${
            isInvalid ? "border-red-500" : "border-border"
          } dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
            hidePlaceholder || floatingLabel
              ? "placeholder-transparent"
              : "placeholder-soft dark:placeholder-pale"
          } ${sizeClass} ${className} ${
            disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
          }`}
        />

        {/* Up/Down arrows inside the input (if showArrows is true) */}
        {showArrows && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col text-gray-400">
            <button
              type="button"
              onClick={increment}
              disabled={disabled}
              className="focus:outline-none"
              aria-label="Increase value" // Add this line
            >
              <FaArrowUp />
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={disabled}
              className="focus:outline-none"
              aria-label="Decrease value" // Add this line
            >
              <FaArrowDown />
            </button>
          </div>
        )}
      </div>

      {/* Right increment button (if showSideButtons is true) */}
      {showSideButtons && (
        <button
          type="button" // Set button type to button
          onClick={increment}
          disabled={disabled}
          className={`border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-r-md ${buttonSizeClass} ${
            disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
          }`}
        >
          +
        </button>
      )}

      {/* Floating label */}
      {floatingLabel && (
        <label
          className={`absolute left-12 transition-all duration-200 text-soft dark:text-pale cursor-text ${
            value
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

export default NumberInput;
