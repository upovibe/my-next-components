import React, { useState } from "react";

type InputProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  type?: string;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  floatingLabel,
  hidePlaceholder,
  type = "text",
  disabled,
  size = "nm",
  className = "",
  value,
  name,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const inputValue = value !== undefined ? value : internalValue;

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative w-full">
      {/* If a label is provided and floating label is disabled, show a regular label */}
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}

      <input
        type={type}
        value={inputValue}
        name={name}
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
    </div>
  );
};

export default Input;
