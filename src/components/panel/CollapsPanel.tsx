import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface CollapsiPanelProps {
  children: React.ReactNode;
  header: React.ReactNode; // Header can be fully controlled by parent
  isToggleable?: boolean;  // Whether the panel is toggleable
  isOpen?: boolean;        // Controlled prop for panel state
  onToggle?: () => void;   // Event handler for toggle
  actions?: React.ReactNode; // Custom action icons or buttons
  className?: string;      // Additional class name for customization
}

const CollapsiPanel: React.FC<CollapsiPanelProps> = ({
  children,
  header,
  isToggleable = false,
  isOpen: controlledOpen,
  onToggle,
  actions,
  className = '', // Default to empty string if no className is provided
}) => {
  const [isOpen, setIsOpen] = useState(controlledOpen || false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
  const isControlled = controlledOpen !== undefined;

  useEffect(() => {
    if (isControlled) {
      setIsOpen(controlledOpen!);
    }
  }, [controlledOpen]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`collapsi-panel border border-border bg-primary dark:bg-shade  dark:border-coal rounded-md transition-all ${className}`}>
      {/* Header section controlled by the parent */}
      <div className="flex justify-between items-center bg-primary dark:bg-shade p-4 transition-all hover:bg-secondary rounded-md">
        <div className="flex items-center space-x-4">{header}</div>

        <div className="flex items-center space-x-4">
          {/* Optional actions passed from parent */}
          {/* Optional actions passed from parent with cursor-pointer */}
          {actions && (
            <div className="cursor-pointer flex space-x-2 text-soft dark:text-pale">
              {actions}
            </div>
          )}

          {isToggleable && (
            <div className='cursor-pointer flex space-x-2 text-soft dark:text-pale' onClick={handleToggle}>
              {isOpen ? (
                <FaPlus className="text-deep dark:text-light transition-transform duration-300" />
              ) : (
                <FaMinus className="text-deep dark:text-light transition-transform duration-300" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content section with smooth height transition */}
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out bg-tertiary dark:bg-shadow"
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default CollapsiPanel;
