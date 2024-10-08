"use client";

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

type AutoCompleteInputProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  suggestions: string[];
  completeMethod: (query: string) => void;
  dropdown?: boolean;
  dropdownMode?: "blank" | "current";
  multiple?: boolean;
  selectionLimit?: number;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  placeholder,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
  className = "",
  value,
  onChange,
  suggestions,
  completeMethod,
  dropdown = false,
  dropdownMode = "blank",
  multiple = false,
  selectionLimit = Infinity,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputError, setInputError] = useState<boolean>(false);

  const currentSelectionCount = Array.isArray(value) ? value.length : 0;

  useEffect(() => {
    if (Array.isArray(value)) {
      setInputValue(""); // Clear input when using multiple values
    } else {
      setInputValue(value as string);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setShowSuggestions(true);

    if (completeMethod) {
      completeMethod(val);
    }

    if (val && !suggestions.includes(val)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (multiple) {
      // Prevent duplicate selections
      if (
        !(value as string[]).includes(suggestion) &&
        currentSelectionCount < selectionLimit
      ) {
        const newValue = [...(value as string[]), suggestion];
        onChange(newValue);
      }
    } else {
      onChange(suggestion);
    }
    setInputValue("");
    setShowSuggestions(false);
    setInputError(false);
  };

  const handleRemoveSelectedItem = (itemToRemove: string) => {
    const newValue = (value as string[]).filter(
      (item) => item !== itemToRemove
    );
    onChange(newValue);
  };

  const handleDropdownClick = () => {
    const query = dropdownMode === "current" ? inputValue : "";
    completeMethod(query);
  };

  useEffect(() => {
    if (inputValue) {
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions]);

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative mb-4">
      {floatingLabel && (
        <label
          className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text z-30 ${
            inputValue || (Array.isArray(value) && value.length > 0)
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-1/2 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder || label}
        </label>
      )}

      <div
        className={`flex flex-wrap items-center gap-2 border-2 rounded-md p-1 cursor-text focus:outline-none focus:border-highlight ${
          inputError ? "border-red-500" : "border-border dark:border-coal"
        } text-deep dark:text-light relative`}
      >
        {/* Display selected items in the input area */}
        {multiple && Array.isArray(value) && value.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {value.map((item, index) => (
              <span
                key={index}
                className="flex items-center  bg-secondary dark:bg-dim px-2 py-1 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  className="ml-1 text-red-500"
                  onClick={() => handleRemoveSelectedItem(item)}
                  aria-label={`Remove ${item}`}
                  title={`Remove ${item}`}
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* The input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={hidePlaceholder || floatingLabel ? "" : placeholder}
          disabled={disabled}
          className={`flex-grow focus:outline-none ${
            hidePlaceholder || floatingLabel
              ? "placeholder-transparent"
              : "placeholder-soft dark:placeholder-pale"
          } ${inputError ? "text-red-500" : ""} ${sizeClass} ${className}`}
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-primary dark:bg-shade border border-gray-300 rounded-md max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer hover:bg-secondary dark:hover:bg-dim p-2"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
