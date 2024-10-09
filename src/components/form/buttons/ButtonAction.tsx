import React from 'react';

interface ButtonActionProps {
  onClick: () => void; // Function to call on button click
  children: React.ReactNode; // Content of the button
  className?: string; // Additional custom classes for further styling
}

// ButtonAction component definition
const ButtonAction: React.FC<ButtonActionProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
    type='button'
      onClick={onClick}
      className={`bg-gold dark:bg-accent inline-block px-5 py-2 rounded text-light uppercase font-semibold transition focus:ring-4 focus:ring-gold/50 dark:focus:ring-accent/50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonAction;
