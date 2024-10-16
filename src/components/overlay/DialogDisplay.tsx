import React from 'react';
import { FaTimes } from "react-icons/fa";
import classNames from 'classnames';

// Define the prop types for the DialogDisplay component
interface DialogDisplayProps {
  visible: boolean;
  onHide: () => void;
  header: string; 
  children: React.ReactNode; 
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'; 
  closeButton?: boolean; 
}

// DialogDisplay Component
const DialogDisplay: React.FC<DialogDisplayProps> = ({
  visible,
  onHide,
  header,
  children,
  position = 'center',
  closeButton = true,
}) => {
  // Return nu
  if (!visible) return null;

  const getPositionClass = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-0 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'left-0 top-1/2 transform -translate-y-1/2';
      case 'right':
        return 'right-0 top-1/2 transform -translate-y-1/2';
      case 'center':
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };

  const dialogClass = classNames(
    'fixed p-4 z-50 rounded-md shadow-lg',
    getPositionClass(),
    'bg-primary dark:bg-shade border border-border dark:border-coal', 
  );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className={dialogClass}>
        {header && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-deep dark:text-light">{header}</h3>
            {closeButton && (
              <button
                type="button"
                onClick={onHide}
                className="text-soft dark:text-pale hover:text-muted dark:hover:text-faint"
              >
                <FaTimes />
              </button>
            )}
          </div>
        )}
        <div className="text-deep dark:text-light">{children}</div>
      </div>
    </div>
  );
};

export default DialogDisplay;
