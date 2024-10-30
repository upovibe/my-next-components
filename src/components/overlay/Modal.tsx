import React, { ReactNode, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  footer,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary dark:bg-dim w-full max-w-lg rounded-lg shadow-lg relative p-6">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

        <div className="mb-4">{children}</div>

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
