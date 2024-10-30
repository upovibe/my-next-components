import React, { ReactNode, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
  icon?: ReactNode;
  position?: "center" | "top" | "bottom" | "left" | "right"; // Position prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  footer,
  onClose,
  className = "",
  icon,
  position = "center",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Start animation when isOpen changes to true
  useEffect(() => {
    if (isOpen) setIsAnimating(true);
    else {
      // Delay the modal closure for smooth fade-out
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Position styles based on the position prop
  const positionClasses = {
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    top: "md:top-8 top-0 left-1/2 transform -translate-x-1/2",
    bottom: "md:bottom-8 bottom-0 left-1/2 transform -translate-x-1/2",
    left: "md:left-8 left-0 top-1/2 transform -translate-y-1/2",
    right: "md:right-8 right-0 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute bg-primary dark:bg-dim ${className} 
          ${positionClasses[position]} 
          w-full h-full size-full md:size-8/12 lg:w-6/12 xl:w-5/12 
          md:rounded-lg shadow-lg p-6 flex flex-col 
          border-0 md:border border-border dark:border-coal 
          transform transition-all duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex items-center mb-4">
          {icon && <span className="mr-2">{icon}</span>}
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        </div>

        <div className="flex-grow overflow-y-auto mb-4">{children}</div>

        {footer && (
          <div className="border-t border-border dark:border-coal pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
