import React from 'react';
import Image from 'next/image';

// Define the possible sizes for the Avatar
type AvatarSize = 'extra-small' | 'small' | 'medium' | 'large';

// Define the props for the Avatar component
interface AvatarProps {
  src?: string; // Image URL for the avatar
  alt?: string; // Alt text for the image
  initials?: string; // Initials to display if no image is available
  size?: AvatarSize; // Size of the avatar
  color?: string; // Background color when displaying initials
  shape?: 'circle' | 'square'; // Shape of the avatar
  onClick?: () => void; // Optional onClick event handler
  className?: string; // Additional custom classes
}

// Function to set the size styles based on the size prop
const getSizeStyles = (size: AvatarSize) => {
  switch (size) {
    case 'extra-small':
      return 'w-6 h-6 text-xs'; // Extra small avatar
    case 'small':
      return 'w-8 h-8 text-sm'; // Small avatar
    case 'medium':
      return 'w-12 h-12 text-base'; // Medium avatar
    case 'large':
      return 'w-16 h-16 text-lg'; // Large avatar
    default:
      return 'w-12 h-12 text-base'; // Default to medium
  }
};

// Avatar component definition
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'medium',
  color = 'bg-gray-500',
  shape = 'circle',
  onClick, 
  className = '',
}) => {
  const sizeStyles = getSizeStyles(size);
  const shapeStyles = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  const cursorStyles = onClick ? 'cursor-pointer' : ''; // Add cursor pointer if onClick is provided

  return (
    <div
      className={`inline-flex items-center justify-center ${sizeStyles} ${shapeStyles} ${color} text-white font-bold ${cursorStyles} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || 'Avatar'}
          width={100}
          height={100}
          className={`object-cover ${shapeStyles}`}
        />
      ) : initials ? (
        initials
      ) : (
        <span className="material-icons">person</span>
      )}
    </div>
  );
};

export default Avatar;
