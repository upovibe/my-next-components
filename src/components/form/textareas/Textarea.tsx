"use client";

import React, { useState, useEffect } from "react";

type TextareaProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  maxLength?: number;
  resizable?: boolean;
  hideScrollbar?: boolean;
  minHeight?: string;
  maxHeight?: string;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
};

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  label,
  floatingLabel = false,
  maxLength,
  resizable = false,
  hideScrollbar = false,
  minHeight,
  maxHeight,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
}) => {
  const [value, setValue] = useState("");

  // Adjust textarea height dynamically based on content
  useEffect(() => {
    const textarea = document.getElementById("custom-textarea") as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  // Size-based classnames
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative mb-4">
      {/* Regular label when floatingLabel is false */}
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">{label}</label>
      )}

      <textarea
        id="custom-textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={hidePlaceholder ? "" : placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          resizable ? "resize-y" : "resize-none"
        } ${hideScrollbar ? "overflow-hidden" : "overflow-auto"} ${sizeClass} ${
          hidePlaceholder || floatingLabel ? "placeholder-transparent" : "placeholder-soft dark:placeholder-pale"
        } ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
        style={{
          minHeight: minHeight || "auto",
          maxHeight: maxHeight || "none",
          overflowY: maxHeight ? "auto" : "hidden",
        }}
      />

      {/* Floating label logic */}
      {floatingLabel && (
        <label
          htmlFor="custom-textarea"
          className={`absolute left-[10px] transition-all duration-200 text-soft dark:text-pale cursor-text ${
            value ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded" : "top-5 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder}
        </label>
      )}

      {/* Show character count and progress bar when maxLength is set */}
      {maxLength && (
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-soft dark:text-pale">
            {value.length}/{maxLength} characters
          </div>
          <div className="relative w-full max-w-20">
            <div className="h-2 bg-gray-200 dark:bg-coal rounded overflow-hidden">
              <div
                className="h-full bg-highlight dark:bg-ocean rounded transition-all duration-300"
                style={{
                  width: `${Math.min((value.length / maxLength) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Textarea;