import React from 'react';

interface ScrollPanelProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollPanel: React.FC<ScrollPanelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden border border-gray-300 rounded-lg shadow-md 
        scrollbar-thin scrollbar-thumb-transparent scrollbar-track-gray-200 
        ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollPanel;
