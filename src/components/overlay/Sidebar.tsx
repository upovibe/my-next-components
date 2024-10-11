import React from 'react';
import { FaTimes } from 'react-icons/fa';

// Sidebar Props
interface SidebarProps {
  isOpen: boolean; // Control visibility
  onClose: () => void; // Function to call when closing
  header: React.ReactNode;
  position?: 'left' | 'right'; // Position of the sidebar
  className?: string; // Custom class for additional styling
  children: React.ReactNode; // Content to display in the sidebar
}

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  header, 
  position = 'right', 
  className = '', 
  children 
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} w-screen md:w-[480px] h-full shadow-lg z-50 transform transition-transform duration-300 bg-primary dark:bg-shade ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'} ${className}`}
      >
        <div className="p-4 px-6 flex justify-between items-center border-b-2 border-border dark:border-coal">
          {header}
          <button
          type='button'
            onClick={onClose}
            className="p-2 rounded-md text-deep dark:text-light hover:bg-secondary hover:dark:bg-dim transition-colors duration-300"
          >
            <FaTimes className="font-light" />
          </button>
        </div>
        <div className="text-deep dark:text-light">{children}</div>
      </div>
    </>
  );
};

export default Sidebar;