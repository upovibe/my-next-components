import React from 'react';
import { IconType } from 'react-icons/fa';

interface SwitchButtonProps {
  onClick: () => void;
  isToggled: boolean;
  iconTrue?: IconType;
  iconFalse?: IconType;
  textTrue?: string;
  textFalse?: string;
  showIconOnly?: boolean;
  showTextOnly?: boolean;
  iconPosition?: 'left' | 'right';
  iconClass?: string; // This prop is already optional due to the use of ?
  className?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  onClick,
  isToggled,
  iconTrue: IconTrue,
  iconFalse: IconFalse,
  iconPosition = 'left',
  textTrue,
  textFalse,
  showIconOnly,
  showTextOnly,
  iconClass = '',
  className = '',
}) => {
  const renderContent = () => {
    const animationClass = isToggled ? 'animate-iconEnter' : 'animate-iconExit';

    if (showIconOnly) {
      return isToggled ? (
        <IconTrue className={`${iconClass} ${animationClass}`} />
      ) : (
        <IconFalse className={`${iconClass} ${animationClass}`} />
      );
    }

    if (showTextOnly) {
      return isToggled ? textTrue : textFalse;
    }

    return (
      <span className="flex items-center justify-center gap-2">
        {iconPosition === 'left' && isToggled && IconTrue && (
          <IconTrue className={`mr-1 ${iconClass} ${animationClass}`} />
        )}
        {iconPosition === 'left' && !isToggled && IconFalse && (
          <IconFalse className={`mr-1 ${iconClass} ${animationClass}`} />
        )}

        <span>{isToggled ? textTrue : textFalse}</span>

        {iconPosition === 'right' && isToggled && IconTrue && (
          <IconTrue className={`ml-1 ${iconClass} ${animationClass}`} />
        )}
        {iconPosition === 'right' && !isToggled && IconFalse && (
          <IconFalse className={`ml-1 ${iconClass} ${animationClass}`} />
        )}
      </span>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block px-3 py-2 rounded transition-all duration-200 ease-linear w-full ${className}`}
    >
      {renderContent()}
    </button>
  );
};

export default SwitchButton;
