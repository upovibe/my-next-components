"use client";

import React from 'react';

interface SlidingCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const SlidingCheckbox: React.FC<SlidingCheckboxProps> = ({ checked, onChange, label }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <div className="relative">
        <div
          className={`block w-12 h-6 rounded-full transition duration-200 ease-in-out shadow-inner shadow-shadow/50 dark:shadow-shadow/50 ${
            checked ? 'bg-gold/50 dark:bg-accent/50' : 'bg-tertiary dark:bg-shadow'
          }`}
        />
        <div
          className={`absolute top-[4px] left-[4px] size-4 bg-gold dark:bg-accent rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </div>
      <span className="ml-2 text-soft dark:text-pale">{label}</span>
    </label>
  );
};

export default SlidingCheckbox;
