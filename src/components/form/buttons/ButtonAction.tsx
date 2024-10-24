import React, { useState } from 'react';
import { IconType } from 'react-icons';
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animations/Loading.json";

interface ButtonActionProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  className?: string;
  isLoading?: boolean; 
  hideTextOnLoading?: boolean;
  loadingPosition?: 'left' | 'right';
}

const ButtonAction: React.FC<ButtonActionProps> = ({
  onClick,
  children,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  isLoading,
  hideTextOnLoading,
  loadingPosition = 'right'
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-gold dark:bg-accent inline-block px-5 py-2 rounded text-light uppercase font-semibold transition-all duration-300 ease-linear focus:ring-4 focus:ring-gold/50 dark:focus:ring-accent/50 ${className}`}
      disabled={isLoading} // Disable button during loading
    >
      <span className="flex items-center justify-center gap-2">
        {/* Conditionally render the icon on the left or right */}
        {!isLoading && Icon && iconPosition === 'left' && (
          <Icon className="mr-2 text-lg" />
        )}

        {/* Conditionally render loading animation on the left */}
        {isLoading && loadingPosition === 'left' && (
          <Lottie
            className="size-full max-h-6 max-w-6"
            animationData={uploadingAnimation}
            loop
          />
        )}

        {/* Conditionally show or hide the button text based on loading state */}
        {!hideTextOnLoading || !isLoading ? (
          <span>{children}</span>
        ) : null}

        {/* Conditionally render loading animation on the right */}
        {isLoading && loadingPosition === 'right' && (
          <Lottie
            className="size-full max-h-6 max-w-6"
            animationData={uploadingAnimation}
            loop
          />
        )}

        {!isLoading && Icon && iconPosition === 'right' && (
          <Icon className="ml-2 text-lg" />
        )}
      </span>
    </button>
  );
};

export default ButtonAction;
