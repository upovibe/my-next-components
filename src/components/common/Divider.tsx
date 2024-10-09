import React from 'react';

interface LineProps {
  orientation?: 'horizontal' | 'vertical'; // Line orientation
  className?: string;                      // Tailwind classes for styling
}

const Line: React.FC<LineProps> = ({
  orientation = 'horizontal',  // Default orientation
  className = '',              // Tailwind classes for styling
}) => {
  return (
    <div
      className={`${orientation === 'horizontal' ? 'w-full h-1' : 'h-full w-1'} ${className}`}
    />
  );
};

export default Line;
