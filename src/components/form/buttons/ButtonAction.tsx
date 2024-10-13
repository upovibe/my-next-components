import React from 'react';
import { IconType } from 'react-icons';

interface ButtonActionProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const ButtonAction: React.FC<ButtonActionProps> = ({
  onClick,
  children,
  icon: Icon,
  iconPosition = 'right',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-gold dark:bg-accent inline-block px-5 py-2 rounded text-light uppercase font-semibold transition focus:ring-4 focus:ring-gold/50 dark:focus:ring-accent/50 ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {/* Conditionally render the icon on the left or right */}
        {Icon && iconPosition === 'left' && (
          <Icon className="mr-2 text-lg" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <Icon className="ml-2 text-lg" />
        )}
      </span>
    </button>
  );
};

export default ButtonAction;
