// "use client";

// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// type TagInputProps = {
//   placeholder: string;
//   label?: string;
//   floatingLabel?: boolean;
//   hidePlaceholder?: boolean;
//   disabled?: boolean;
//   size?: "sm" | "nm" | "lg";
//   className?: string;
//   value: string[];
//   onChange: (value: string[]) => void;
// };

// const TagInput: React.FC<TagInputProps> = ({
//   placeholder,
//   label,
//   floatingLabel = false,
//   hidePlaceholder = false,
//   disabled = false,
//   size = "nm",
//   className = "",
//   value,
//   onChange,
// }) => {
//   const [inputValue, setInputValue] = useState<string>("");

//   // Class for size-based styling
//   const sizeClass = {
//     sm: "p-1 text-sm",
//     nm: "p-1 text-base", // Keep p-1 for normal size
//     lg: "p-3 text-lg",
//   }[size];

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
//       e.preventDefault(); // Prevent default form submission
//       if (!value.includes(inputValue.trim())) {
//         onChange([...value, inputValue.trim()]);
//         setInputValue(""); // Clear input field
//       }
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     onChange(value.filter((tag) => tag !== tagToRemove));
//   };

//   return (
//     <div className="relative mb-4">
//       {floatingLabel && (
//         <label
//           className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text z-30 ${
//             value.length > 0 || inputValue
//               ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
//               : "top-1/2 transform -translate-y-1/2 text-base"
//           }`}
//         >
//           {placeholder || label}
//         </label>
//       )}

//       <div
//         className={`flex flex-wrap items-center gap-2 border-2 rounded-md cursor-text focus:outline-none focus:border-highlight ${
//           disabled
//             ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
//             : "border-border dark:border-coal"
//         } text-deep dark:text-light relative ${sizeClass} ${className}`}
//       >
//         {/* Display the tags */}
//         {value.map((tag, index) => (
//           <div
//             key={index}
//             className="flex items-center bg-secondary dark:bg-dim px-2 py-1 rounded-full text-sm"
//           >
//             {tag}
//             <button
//               type="button"
//               className="text-red-500 ml-1"
//               onClick={() => handleRemoveTag(tag)}
//               aria-label={`Remove tag ${tag}`}
//               title={`Remove tag ${tag}`}
//             >
//               <FaTimes />
//             </button>
//           </div>
//         ))}

//         {/* Input field for adding new tags */}
//         {!disabled && (
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder={hidePlaceholder || floatingLabel ? "" : placeholder}
//             disabled={disabled}
//             className={`flex-grow focus:outline-none ${
//               hidePlaceholder || floatingLabel
//                 ? "placeholder-transparent"
//                 : "placeholder-soft dark:placeholder-pale"
//             } ${sizeClass} ${className}`}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TagInput;


"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type TagInputProps = {
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
};

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  label,
  floatingLabel = false,
  hidePlaceholder = false,
  disabled = false,
  size = "nm",
  className = "",
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base", // Same padding as AutoCompleteInput
    lg: "p-3 text-lg",
  }[size];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault(); // Prevent default form submission
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
        setInputValue(""); // Clear input field
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative mb-4">
      {floatingLabel && (
        <label
          className={`absolute left-[1rem] transition-all duration-200 text-soft dark:text-pale cursor-text z-30 ${
            value.length > 0 || inputValue
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-1/2 transform -translate-y-1/2 text-base"
          }`}
        >
          {placeholder || label}
        </label>
      )}

      <div
        className={`flex flex-wrap items-center gap-2 border-2 rounded-md p-1 cursor-text focus:outline-none focus:border-highlight ${
          disabled
            ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            : "border-border dark:border-coal"
        } text-deep dark:text-light relative`}
      >
        {/* Display the tags */}
        {value.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-secondary dark:bg-dim px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="text-red-500 ml-1"
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove tag ${tag}`}
              title={`Remove tag ${tag}`}
            >
              <FaTimes />
            </button>
          </span>
        ))}

        {/* Input field for adding new tags */}
        {!disabled && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={hidePlaceholder || floatingLabel ? "" : placeholder}
            disabled={disabled}
            className={`flex-grow focus:outline-none ${
              hidePlaceholder || floatingLabel
                ? "placeholder-transparent"
                : "placeholder-soft dark:placeholder-pale"
            } ${sizeClass} ${className}`}
          />
        )}
      </div>
    </div>
  );
};

export default TagInput;
