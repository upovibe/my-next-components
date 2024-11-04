"use client";

import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import specific icons from react-icons/fa

type ToggleButtonProps = {
  onLabel: string; // Label for the "on" state
  offLabel: string; // Label for the "off" state
  onIcon?: JSX.Element; // Icon to show when in "on" state
  offIcon?: JSX.Element; // Icon to show when in "off" state
  initialState?: boolean; // Option to set the initial state (on or off)
  disabled?: boolean; // Option to disable the button
  className?: string; // Additional classes for styling
  size?: "sm" | "nm" | "lg"; // Size of the button (small, normal, large)
  iconPosition?: "left" | "right"; // Position of the icon (left or right)
  onToggle?: (state: boolean) => void; // Callback function when toggled
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onLabel,
  offLabel,
  onIcon,
  offIcon,
  initialState = false,
  disabled = false,
  className = "",
  size = "nm",
  iconPosition = "left",
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState); // Call the callback with the new state
  };

  // Class for size-based styling
  const sizeClass = {
    sm: "px-2 py-1 text-sm",   // Small size
    nm: "px-4 py-2 text-base", // Normal size
    lg: "px-6 py-3 text-lg",   // Large size
  }[size];

  return (
    <button
        type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`flex items-center justify-center rounded-lg border-2 border-border dark:border-coal focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-ocean ${
        isOn ? "bg-highlight text-primary" : "bg-alert text-primary"
      } ${disabled ? "bg-secondary dark:bg-dim cursor-not-allowed" : ""} ${sizeClass} ${className}`}
    >
      {/* Icon on the left or right */}
      {iconPosition === "left" && (isOn ? onIcon : offIcon) && (
        <span className="mr-2">{isOn ? onIcon : offIcon}</span>
      )}
      <span>{isOn ? onLabel : offLabel}</span>
      {iconPosition === "right" && (isOn ? onIcon : offIcon) && (
        <span className="ml-2">{isOn ? onIcon : offIcon}</span>
      )}
    </button>
  );
};

export default ToggleButton;
