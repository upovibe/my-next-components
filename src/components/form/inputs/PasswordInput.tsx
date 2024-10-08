"use client"; // Ensure this is at the top to indicate this is a client component

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

type PasswordInputProps = {
  placeholder: string; // Placeholder for the input
  label?: string; // Optional label
  size?: "sm" | "nm" | "lg"; // Size of the input
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  label,
  size = "nm",
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm", // Small size
    nm: "p-2 text-base", // Normal size
    lg: "p-3 text-lg", // Large size
  }[size];

  return (
    <div className="relative mb-4">
      {label && <label className="block mb-1 text-deep dark:text-light text-left">{label}</label>}
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass}`}
        />
        <button
          onClick={togglePasswordVisibility}
          className="absolute right-3 text-deep dark:text-light"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
