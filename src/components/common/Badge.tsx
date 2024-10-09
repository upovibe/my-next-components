import React from 'react';

// Define the possible sizes for the Badge
type BadgeSize = 'extra-small' | 'small' | 'medium' | 'large';

// Define the props for the Badge component
interface BadgeProps {
  text: string; // Text to display in the badge
  color?: string; // Background color of the badge
  size?: BadgeSize; // Size of the badge
  rounded?: boolean; // Whether the badge should have rounded corners
  className?: string; // Additional custom classes
}

// Function to set the size styles based on the size prop
const getSizeStyles = (size: BadgeSize) => {
  switch (size) {
    case 'extra-small':
      return 'text-xs py-1 px-2';
    case 'small':
      return 'text-xs py-1 px-2';
    case 'medium':
      return 'text-sm py-1.5 px-3';
    case 'large':
      return 'text-base py-2 px-4';
    default:
      return 'text-sm py-1.5 px-3'; // Default to medium
  }
};

// Badge component definition
const Badge: React.FC<BadgeProps> = ({
  text,
  color = 'bg-blue-500',
  size = 'medium',
  rounded = false,
  className = '',
}) => {
  const sizeStyles = getSizeStyles(size);
  const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeStyles} ${roundedStyles} ${color} text-white ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
