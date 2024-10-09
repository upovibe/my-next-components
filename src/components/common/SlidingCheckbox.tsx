"use client";

import React from 'react';

interface SlidingCheckboxProps {
  checked: boolean; // Controls the checked state of the checkbox
  onChange: (checked: boolean) => void; // Function to handle change events
  label: string; // Text label for the checkbox
  className?: string; // Additional custom classes for further styling
}

// SlidingCheckbox component definition
const SlidingCheckbox: React.FC<SlidingCheckboxProps> = ({ checked, onChange, label, className = '' }) => {
  const handleCheckboxChange = () => {
    onChange(!checked); // Toggle checked state
  };

  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="sr-only" // Hide the default checkbox
      />
      <div className="relative">
        <div
          className={`block w-12 h-6 rounded-full transition duration-200 ease-in-out shadow-inner shadow-shadow/50 dark:shadow-shadow/50 ${
            checked ? 'bg-gold/50 dark:bg-accent/50' : 'bg-tertiary dark:bg-shadow'
          }`}
        />
        <div
          className={`absolute top-[4px] left-[4px] w-4 h-4 bg-gold dark:bg-accent rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </div>
      <span className="ml-2 text-soft dark:text-pale">{label}</span>
    </label>
  );
};

export default SlidingCheckbox;
