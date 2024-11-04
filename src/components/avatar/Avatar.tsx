import React from 'react';
import Image from 'next/image';


type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize; 
  color?: string;
  shape?: 'circle' | 'square';
  onClick?: () => void; 
  className?: string;
}

const getSizeStyles = (size: AvatarSize) => {
  switch (size) {
    case 'xs':
      return 'w-6 h-6 text-xs';
    case 'sm':
      return 'w-8 h-8 text-sm';
    case 'md':
      return 'w-12 h-12 text-base';
    case 'lg':
      return 'w-16 h-16 text-lg';
    default:
      return 'w-12 h-12 text-base';
  }
};

// Avatar component definition
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  color = 'bg-gray-500',
  shape = 'circle',
  onClick, 
  className = '',
}) => {
  const sizeStyles = getSizeStyles(size);
  const shapeStyles = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  const cursorStyles = onClick ? 'cursor-pointer' : '';

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
