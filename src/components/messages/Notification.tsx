import React, { useEffect } from 'react';

type MessageType = 'success' | 'info' | 'warning' | 'error';
type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface NotificationProps {
  type: MessageType;
  content: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  position?: Position; // Added position prop
}

const Notification: React.FC<NotificationProps> = ({ type, content, visible, onClose, position = 'top-right' }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/60 text-white backdrop-blur-lg'; // Success (green)
      case 'info':
        return 'bg-blue-500/60 text-white backdrop-blur-lg'; // Info (blue)
      case 'warning':
        return 'bg-yellow-500/60 text-white backdrop-blur-lg'; // Warning (yellow)
      case 'error':
        return 'bg-red-500/60 text-white backdrop-blur-lg'; // Error (red)
      default:
        return 'bg-gray-500/60 text-white backdrop-blur-lg'; // Default (gray)
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
      } ${getStyles()} px-6 py-4 rounded-lg shadow-lg`}
      style={{
        transition: 'transform 0.5s ease, opacity 0.5s ease',
      }}
    >
      <div className="flex items-center space-x-3">
        {content}
        <button
          type="button"
          className="ml-auto text-white hover:text-light"
          onClick={onClose}
        >
          &#10005; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Notification;
