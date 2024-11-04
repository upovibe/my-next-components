"use client";

import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type NumberInputProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  symbol?: string;
  showArrows?: boolean;
  showSideButtons?: boolean;
  decimalPlaces?: number;
  onChange?: (value: number | string) => void;
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
  onChange,
}) => {
  const [value, setValue] = useState<number | string>(0);
  const [isInvalid, setIsInvalid] = useState(false);

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
      if (onChange) {
        onChange(newValue);
      }
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
      if (input) {
        onChange?.(Number(input));
      }
    } else {
      setIsInvalid(true);
    }
  };

  // Increment and Decrement functions with support for decimal step values
  const increment = () => handleValueChange((Number(value) || 0) + step);
  const decrement = () => handleValueChange((Number(value) || 0) - step);

  return (
    <div className="relative w-full flex flex-col items-start mb-4">
      {/* Regular label */}
      {label && !floatingLabel && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {showSideButtons && (
          <button
            type="button"
            onClick={decrement}
            disabled={disabled}
            className={`border-2 w-10 flex items-center justify-center border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-l-md ${buttonSizeClass} ${
              disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
            }`}
          >
            -
          </button>
        )}

        {/* Input Field */}
        <div className="relative w-full">
        <input
            type="text"
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
                className="focus:outline-none text-xs mb-2"
                aria-label="Increase value"
              >
                <FaArrowUp />
              </button>
              <button
                type="button"
                onClick={decrement}
                disabled={disabled}
                className="focus:outline-none text-xs"
                aria-label="Decrease value"
              >
                <FaArrowDown />
              </button>
            </div>
          )}
        </div>

        {/* Right increment button (if showSideButtons is true) */}
        {showSideButtons && (
          <button
            type="button"
            onClick={increment}
            disabled={disabled}
            className={`border-2 w-10 flex items-center justify-center border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-r-md ${buttonSizeClass} ${
              disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
            }`}
          >
            +
          </button>
        )}

        {/* Floating label */}
        {floatingLabel && (
          <label
            className={`absolute transition-all duration-200 text-soft dark:text-pale cursor-text ${
              showSideButtons ? "left-[3rem]" : "left-[1rem]"
            } ${
              value
                ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
                : "top-1/2 transform -translate-y-1/2 text-base"
            }`}
          >
            {placeholder}
          </label>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
