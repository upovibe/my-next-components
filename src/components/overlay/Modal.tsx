import React, { ReactNode, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
  icon?: ReactNode;
  position?: "center" | "top" | "bottom" | "left" | "right";
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
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const positionClasses = {
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    top: "md:top-8 top-0 left-1/2 transform -translate-x-1/2",
    bottom: "md:bottom-8 bottom-0 left-1/2 transform -translate-x-1/2",
    left: "md:left-8 left-0 top-1/2 transform -translate-y-1/2",
    right: "md:right-8 right-0 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute bg-primary dark:bg-dim ${className} 
        ${positionClasses[position]} 
        w-full h-full size-full md:size-8/12 lg:w-6/12 xl:w-5/12 
        md:rounded-lg shadow-lg p-6 flex flex-col 
        border-0 md:border border-border dark:border-coal`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-light dark:text-deep bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50 p-1 rounded-full transition-all duration-200 ease-linear"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex items-center border-b border-border dark:border-coal pb-4">
          {icon && <span className="mr-2">{icon}</span>}
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        </div>

        <div className="flex-grow overflow-y-auto ">{children}</div>

        {footer && (
          <div className="border-t border-border dark:border-coal pt-4 w-full">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
