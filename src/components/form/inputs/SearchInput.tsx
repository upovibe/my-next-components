"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";

type SearchInputProps = {
  placeholder: string;
  label?: string;
  size?: "sm" | "nm" | "lg";
  showButton?: boolean;
  onSearch?: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  label,
  size = "nm",
  showButton,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onSearch) {
        setLoading(true);
        onSearch(query);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
  };

  const clearInput = () => {
    setQuery("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative">
      {label && (
        <label className="block mb-1 text-deep dark:text-light">{label}</label>
      )}

      {showButton ? (
        // Show button if `showButton` is true
        <>
          <button
          type="button"
          aria-label="Search"
            className="flex items-center justify-center p-2 bg-secondary dark:bg-dim border border-border dark:border-coal rounded-md"
            onClick={openModal}
          >
            <FaSearch className="text-soft dark:text-pale text-sm" />
          </button>

          {/* Modal with input field */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-start justify-center z-50 bg-black/50 p-2">
              <div
                ref={modalRef}
                className="bg-white dark:bg-dark p-4 mt-16 rounded-lg relative w-full max-w-md mx-auto border border-border dark:border-coal animate-slideInDown"
              >
                <div className={`flex items-center relative`}>
                  <FaSearch className="absolute left-3 text-soft dark:text-pale" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-10 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass}`}
                  />
                  {/* Show Lottie animation when loading, otherwise clear input button */}
                  {loading ? (
                    <Lottie
                      className="size-full max-h-20 max-w-20 absolute right-3"
                      animationData={loadingAnimation}
                      loop
                    />
                  ) : query ? (
                    <FaTimes
                      className="absolute right-3 text-deep dark:text-light cursor-pointer"
                      onClick={clearInput}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // Show input field if `showButton` is false
        <div className={`flex items-center`}>
          <FaSearch className="absolute left-3 text-soft dark:text-pale" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full pl-10 pr-10 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass}`}
          />
          {/* Show Lottie animation when loading, otherwise clear input button */}
          {loading ? (
            <Lottie
              className="size-full max-h-20 max-w-20 absolute right-3" // Apply your styles here
              animationData={loadingAnimation}
              loop
            />
          ) : query ? (
            <FaTimes
              className="absolute right-3 text-deep dark:text-light cursor-pointer"
              onClick={clearInput}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
