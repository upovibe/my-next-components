"use client";

import React, { useState } from "react";

type OtpInputProps = {
  numInputs: number; // Number of OTP input fields
  onComplete?: (otp: string) => void; // Callback function when OTP is completed
  size?: "sm" | "nm" | "lg"; // Size of the input fields
  label?: string; // Optional label for the OTP inputs
  placeholder?: string; // Placeholder text for each input
};

const OtpInput: React.FC<OtpInputProps> = ({ numInputs, onComplete, size = "nm", label, placeholder }) => {
  const [otpValues, setOtpValues] = useState(Array(numInputs).fill(""));

  // Size-based styles
  const sizeClasses = {
    sm: "w-8 h-8 text-sm", // Small size
    nm: "w-12 h-12 text-lg", // Normal size
    lg: "w-16 h-16 text-xl", // Large size
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inputIndex: number) => {
    const value = e.target.value;
    // Only accept numeric values
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[inputIndex] = value;

    setOtpValues(newOtpValues);

    // Auto-focus on the next input if value is entered
    if (value && inputIndex < numInputs - 1) {
      const nextInput = document.getElementById(`otp-${inputIndex + 1}`);
      nextInput?.focus();
    }

    // Call onComplete when all inputs are filled
    if (newOtpValues.every((val) => val !== "") && onComplete) {
      onComplete(newOtpValues.join("")); // Join the OTP values into a single string
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputIndex: number) => {
    // Handle backspace to move focus to the previous input
    if (e.key === "Backspace" && inputIndex > 0 && !otpValues[inputIndex]) {
      const prevInput = document.getElementById(`otp-${inputIndex - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteData)) return; // Ensure the pasted data is numeric

    const pasteValues = pasteData.split("").slice(0, numInputs); // Split the pasted values and limit to numInputs
    const newOtpValues = [...otpValues];

    pasteValues.forEach((val, i) => {
      newOtpValues[i] = val;
    });

    setOtpValues(newOtpValues);

    // Auto-focus to the last input field after paste
    const lastInput = document.getElementById(`otp-${pasteValues.length - 1}`);
    lastInput?.focus();

    // Call onComplete if all inputs are filled after paste
    if (newOtpValues.every((val) => val !== "") && onComplete) {
      onComplete(newOtpValues.join(""));
    }
  };

  return (
    <div className="otp-inputs flex flex-col items-center">
      {label && <label className="mb-2 text-deep dark:text-light">{label}</label>}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: numInputs }, (_, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength={1}
            value={otpValues[i]}
            onChange={(e) => handleInputChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste} // Handle pasting
            className={`border-2 border-gray-400 text-center focus:outline-none focus:border-highlight dark:focus:border-ocean rounded-md ${sizeClasses[size]}`}
            inputMode="numeric"
            pattern="\d*"
            placeholder={placeholder} // Add placeholder
            title="Please enter a digit" // Add title for accessibility
            aria-label={`OTP input ${i + 1}`} // Accessible label for screen readers
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
