"use client";

import React, { useState } from "react";

type RangeInputProps = {
  label?: string; // Optional label for the slider
  min: number; // Minimum value of the range
  max: number; // Maximum value of the range
  step?: number; // Step value for the slider
  value?: number; // Current value of the slider
  disabled?: boolean; // Option to disable the slider
  onChange: (value: number) => void; // Callback function for value change
  className?: string; // Additional classes for styling
  color?: string; // Color of the slider
};

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  min,
  max,
  step = 1,
  value = min,
  disabled = false,
  onChange,
  className = "",
  color = "highlight", // Default color
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue); // Trigger the callback with the new value
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 text-deep dark:text-light">{label}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        className={`cursor-pointer appearance-none h-2 rounded-lg bg-secondary dark:bg-dim ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        style={{
          background: `linear-gradient(to right, ${color} ${((currentValue - min) / (max - min)) * 100}%, #e0e0e0 ${((currentValue - min) / (max - min)) * 100}%)`,
        }}
      />
      <span className="mt-2 text-deep dark:text-light">{currentValue}</span>
    </div>
  );
};

export default RangeInput;
