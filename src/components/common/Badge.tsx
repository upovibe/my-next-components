import React from 'react';

// Define the possible sizes for the Badge
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

// Define the props for the Badge component
interface BadgeProps {
  text: string;
  size?: BadgeSize;
  className?: string;
}

const getSizeStyles = (size: BadgeSize) => {
  switch (size) {
    case 'xs':
      return 'text-xs py-[2px] px-[6px]';
    case 'sm':
      return 'text-xs py-1 px-2';
    case 'md':
      return 'text-sm py-1.5 px-3';
    case 'lg':
      return 'text-base py-2 px-4';
    default:
      return 'text-sm py-1.5 px-3';
  }
};

// Badge component definition
const Badge: React.FC<BadgeProps> = ({
  text,
  size = 'xs',
  className = '',
}) => {
  const sizeStyles = getSizeStyles(size);

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeStyles} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
