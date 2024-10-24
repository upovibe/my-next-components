import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

type ToastType = 'success' | 'info' | 'warning' | 'error';
type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface ToastProps {
  type: ToastType;
  Toast: string;
  visible: boolean;
  onClose: () => void;
  position?: Position;
}

const Toast: React.FC<ToastProps> = ({ type, Toast, visible, onClose, position = 'top-right' }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white shadow-l shadow-green-500/20';
      case 'info':
        return 'bg-blue-500 text-white shadow-lg shadow-blue-500/20';
      case 'warning':
        return 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20';
      case 'error':
        return 'bg-red-500 text-white shadow-lg shadow-red-500/20';
      default:
        return 'bg-gray-500 text-white shadow-lg shadow-gray-500/20';
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
        return 'top-4 right-4';
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
        <span>{Toast}</span>
        <button
          type='button'
          className="ml-4 text-light hover:text-white"
          onClick={onClose}
        >
          <FaTimes/>
        </button>
      </div>
    </div>
  );
};

export default Toast;
