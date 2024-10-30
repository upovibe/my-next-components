import React from 'react';

interface SwitchButtonProps {
  onClick: () => void;
  isToggled: boolean;
  iconTrue?: React.ReactNode;
  iconFalse?: React.ReactNode;
  textTrue?: string;
  textFalse?: string;
  showIconOnly?: boolean;
  showTextOnly?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  onClick,
  isToggled,
  iconTrue,
  iconFalse,
  iconPosition = 'left',
  textTrue,
  textFalse,
  showIconOnly,
  showTextOnly,
  className = '',
}) => {
  const renderContent = () => {
    const animationClass = isToggled ? 'animate-iconEnter' : 'animate-iconExit';

    if (showIconOnly) {
      return isToggled ? (
        <span className={`flex justify-center items-center mx-auto ${animationClass}`}>
          {iconTrue}
        </span>
      ) : (
        <span className={`flex justify-center items-center mx-auto ${animationClass}`}>
          {iconFalse}
        </span>
      );
    }

    if (showTextOnly) {
      return isToggled ? textTrue : textFalse;
    }

    return (
      <span className="flex items-center justify-center gap-2">
        {iconPosition === 'left' && isToggled && iconTrue && (
          <span className={`mr-1 ${animationClass}`}>
            {iconTrue}
          </span>
        )}
        {iconPosition === 'left' && !isToggled && iconFalse && (
          <span className={`mr-1 ${animationClass}`}>
            {iconFalse}
          </span>
        )}

        <span>{isToggled ? textTrue : textFalse}</span>

        {iconPosition === 'right' && isToggled && iconTrue && (
          <span className={`ml-1 ${animationClass}`}>
            {iconTrue}
          </span>
        )}
        {iconPosition === 'right' && !isToggled && iconFalse && (
          <span className={`ml-1 ${animationClass}`}>
            {iconFalse}
          </span>
        )}
      </span>
    );
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-pressed={isToggled}
      className={`inline-block px-3 py-1 rounded transition-all duration-200 ease-linear ${
        showIconOnly ? 'flex justify-center items-center' : 'whitespace-nowrap'
      } ${className}`}
    >
      {renderContent()}
    </button>
  );
};

export default SwitchButton;
