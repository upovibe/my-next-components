"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordInputProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  size?: "sm" | "nm" | "lg";
  disabled?: boolean;
  className?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  label,
  floatingLabel,
  hidePlaceholder,
  size = "nm",
  disabled,
  className = "",
  value,
  name,
  onChange,
  type = "password", // Default type is password
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const inputValue = value !== undefined ? value : internalValue;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg", 
  }[size];

  return (
    <div className="relative mb-4 w-full">
      {/* Floating label logic */}
      {(!floatingLabel && label) && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : type} // Use the passed type prop
          value={inputValue}
          name={name}
          onChange={handleChange}
          placeholder={hidePlaceholder ? "" : placeholder}
          disabled={disabled}
          className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
            hidePlaceholder || floatingLabel ? "placeholder-transparent" : "placeholder-soft dark:placeholder-pale"
          } ${sizeClass} ${className} ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 text-deep dark:text-light"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Floating label */}
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

export default PasswordInput;
