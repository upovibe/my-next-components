import React from 'react';

interface ButtonActionProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gold dark:bg-accentgold inline-block px-5 py-2 rounded text-light uppercase font-semibold transition focus:ring-4 focus:ring-gold/50 dark:focus:ring-accentgold/50"
    >
      {children}
    </button>
  );
};

export default ButtonAction;
