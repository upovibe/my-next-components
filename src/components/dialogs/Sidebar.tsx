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
        className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} w-screen md:w-[480px] h-full shadow-lg z-50 transform transition-transform duration-300 bg-slate-50 dark:bg-slate-900 ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'} ${className}`}
      >
        <div className="p-4 px-6 flex justify-between items-center border-b-2 dark:border-opacity-5 border-opacity-5 border-slate-900 dark:border-slate-50">
          {header}
          <button
          type='button'
            onClick={onClose}
            className="p-2 rounded-md text-slate-800 font-light dark:text-slate-50 hover:bg-slate-300 hover:text-slate-900 transition-colors duration-300"
          >
            <FaTimes className="font-light" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Sidebar;
