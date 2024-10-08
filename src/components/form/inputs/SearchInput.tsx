"use client"; // Ensure this is at the top to indicate this is a client component

import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Import the search and close icons

type SearchInputProps = {
  placeholder: string; // Placeholder for the input
  label?: string; // Optional label
  size?: "sm" | "nm" | "lg"; // Size of the input
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  label,
  size = "nm",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
    <div className="relative mb-4">
      {label && (
        <label className="block mb-1 text-deep dark:text-light">{label}</label>
      )}
      <div className="flex items-center">
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
