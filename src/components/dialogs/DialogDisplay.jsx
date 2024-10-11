// DialogDisplay.jsx
import React from 'react';
import { FaTimes } from "react-icons/fa";
import classNames from 'classnames'; // For conditional class names

// DialogDisplay Component
const DialogDisplay = ({
  visible,
  onHide,
  header,
  children,
  position = 'center',
  style,
  closeButton = true,
}) => {
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
    'fixed bg-white rounded-md shadow-lg p-4 z-50',
    getPositionClass(),
    style // Apply additional styles
  );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick} // Close when clicking outside
    >
      <div className={dialogClass}>
        {header && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{header}</h3>
            {closeButton && (
              <button type="button" onClick={onHide} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

// Default export
export default DialogDisplay;
