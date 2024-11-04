import React from 'react';
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animations/Loading.json";

interface ActionButtonProps {
  onClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  isLoading?: boolean; 
  hideTextOnLoading?: boolean;
  loadingPosition?: 'left' | 'right';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  isLoading = false,
  hideTextOnLoading,
  loadingPosition = 'right'
}) => {
  const iconOnly = !children;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`inline-block px-5 py-1 rounded text-light font-semibold transition-all duration-300 ease-linear ${className} ${
        iconOnly ? 'flex justify-center items-center' : ''
      }`}
      disabled={isLoading}
    >
      <span
        className={`flex ${iconOnly ? 'justify-center items-center w-full h-full' : 'items-center gap-2'}`}
      >
        {/* Render the icon conditionally on the left */}
        {!isLoading && icon && iconPosition === 'left' && !iconOnly && (
          <span className="text-lg">{icon}</span>
        )}

        {/* Loading animation on the left */}
        {isLoading && loadingPosition === 'left' && (
          <Lottie
            className="size-full max-h-6 max-w-6"
            animationData={uploadingAnimation}
            loop
          />
        )}

        {/* Show or hide children based on loading and text visibility */}
        {(!hideTextOnLoading || !isLoading) && children ? (
          <span>{children}</span>
        ) : null}

        {/* Loading animation on the right */}
        {isLoading && loadingPosition === 'right' && (
          <Lottie
            className="size-full max-h-6 max-w-6"
            animationData={uploadingAnimation}
            loop
          />
        )}

        {/* Render the icon conditionally on the right */}
        {!isLoading && icon && iconPosition === 'right' && !iconOnly && (
          <span className="text-lg">{icon}</span>
        )}

        {/* Center the icon when it’s icon-only mode */}
        {!isLoading && icon && iconOnly && (
          <span className="text-lg">{icon}</span>
        )}
      </span>
    </button>
  );
};

export default ActionButton;
