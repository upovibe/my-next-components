"use client"; // Ensure this is at the top to indicate this is a client component

import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Import the search and close icons

type SearchInputProps = {
  placeholder: string; // Placeholder for the input
  label?: string; // Optional label
  size?: "sm" | "nm" | "lg"; // Size of the input
  showButton?: boolean; // Prop to control whether to show the search button
  onSearch?: (query: string) => void; // Function to handle search action
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  label,
  size = "nm",
  showButton = true,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query); // Call the onSearch prop when Enter is pressed
    }
  };

  const clearInput = () => {
    setQuery(""); // Clear the input when the close icon is clicked
  };

  // Class for size-based styling
  const sizeClass = {
    sm: "p-1 text-sm", // Small size
    nm: "p-2 text-base", // Normal size
    lg: "p-3 text-lg", // Large size
  }[size];

  return (
    <div className="relative">
      {label && (
        <label className="block mb-1 text-deep dark:text-light">{label}</label>
      )}
      {/* Button for small screens */}
      {showButton && (
        <button
          className="flex items-center justify-center p-2 lg:hidden bg-primary dark:bg-shade rounded-md"
          onClick={() => onSearch && onSearch(query)} // Call onSearch prop
        >
          <FaSearch className="text-deep dark:text-light" />
        </button>
      )}
      {/* Input for large screens */}
      <div className={`flex items-center ${showButton ? 'hidden lg:flex' : 'lg:flex'}`}>
        <FaSearch className="absolute left-3 text-deep dark:text-light" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Add event listener for key press
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass}`}
        />
        {/* Close icon displayed only when there's text in the input */}
        {query && (
          <FaTimes
            className="absolute right-3 text-deep dark:text-light cursor-pointer"
            onClick={clearInput} // Clear the input when clicked
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
