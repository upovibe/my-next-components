import React, { useState } from 'react';
import { FaStar, FaBan } from 'react-icons/fa';  // Example star icon

interface RatingProps {
  value: number;                          // Current rating value
  onChange?: (value: number) => void;     // Function to handle rating changes
  stars?: number;                         // Number of stars to display
  cancel?: boolean;                       // Show/hide cancel icon
  readonly?: boolean;                     // Read-only mode
  disabled?: boolean;                     // Disabled mode
  onIcon?: React.ReactNode;               // Custom active (filled) icon/emoji
  offIcon?: React.ReactNode;              // Custom inactive (empty) icon/emoji
  cancelIcon?: React.ReactNode;           // Custom cancel icon/emoji
  activeColor?: string;                   // Color for filled stars
  inactiveColor?: string;                 // Color for unfilled stars
}

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  stars = 5,                             // Default number of stars
  cancel = true,                         // Show cancel icon by default
  readonly = false,                      // Not read-only by default
  disabled = false,                      // Not disabled by default
  onIcon = <FaStar />,                   // Default active (filled) icon
  offIcon = <FaStar />,                  // Default inactive (empty) icon
  cancelIcon = <FaBan/>,           // Default cancel icon
  activeColor = 'text-yellow-400',       // Default active color (gold)
  inactiveColor = 'text-gray-400',       // Default inactive color (gray)
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // Handle click on a star
  const handleClick = (val: number) => {
    if (!disabled && !readonly && onChange) {
      onChange(val);
    }
  };

  // Handle cancel click
  const handleCancel = () => {
    if (!disabled && !readonly && onChange) {
      onChange(0);
    }
  };

  // Handle mouse entering a star (for hover effect)
  const handleMouseEnter = (val: number) => {
    if (!disabled && !readonly) {
      setHoveredValue(val);
    }
  };

  // Handle mouse leaving the stars (remove hover effect)
  const handleMouseLeave = () => {
    if (!disabled && !readonly) {
      setHoveredValue(null);
    }
  };

  // Render each star
  const renderStar = (index: number) => {
    const isFilled = hoveredValue !== null ? index <= hoveredValue : index <= value;

    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className={`transition-colors duration-300 ease-in-out 
                    ${isFilled ? activeColor : inactiveColor} 
                    ${readonly || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                    text-2xl`}
      >
        {isFilled ? onIcon : offIcon}
      </span>
    );
  };

  return (
    <div className='flex items-center'>
      {/* Render the cancel icon first if `cancel` is enabled */}
      {cancel && !readonly && !disabled && (
        <span
          className='mr-2 text-md cursor-pointer transition-opacity duration-300 hover:opacity-80'
          onClick={handleCancel}
        >
          {cancelIcon}
        </span>
      )}

      {/* Render the stars based on the number specified in the `stars` prop */}
      {Array.from({ length: stars }, (_, index) => renderStar(index + 1))}
    </div>
  );
};

export default Rating;
