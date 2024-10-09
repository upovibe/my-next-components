import React, { useEffect } from 'react';

type MessageType = 'success' | 'info' | 'warning' | 'error';
type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface MessageProps {
  type: MessageType;
  message: string; // Message text to display
  visible: boolean; // Control visibility
  onClose: () => void; // Function to call when closing
  position?: Position; // Added position prop
}

const Message: React.FC<MessageProps> = ({ type, message, visible, onClose, position = 'top-right' }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white shadow-l shadow-green-500/20'; // Success (green)
      case 'info':
        return 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'; // Info (blue)
      case 'warning':
        return 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20'; // Warning (yellow)
      case 'error':
        return 'bg-red-500 text-white shadow-lg shadow-red-500/20'; // Error (red)
      default:
        return 'bg-gray-500 text-white shadow-lg shadow-gray-500/20'; // Default (gray)
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4'; // Default position
    }
  };

  return (
    <div
      className={`fixed ${getPositionStyles()} transform transition-transform z-50 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
      } ${getBgColor()} px-4 py-2 rounded-lg shadow-lg`}
      style={{
        transition: 'transform 0.5s ease, opacity 0.5s ease',
      }}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button
          type='button'
          className="ml-4 text-light hover:text-white"
          onClick={onClose}
        >
          &#10005; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Message;
