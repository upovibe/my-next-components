import React from 'react';

interface SkeletonLoaderProps {
  width?: string;        // Width of the skeleton loader
  height?: string;       // Height of the skeleton loader
  borderRadius?: string; // Border radius of the skeleton loader
  className?: string;    // Additional custom classes
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = 'w-full',          // Default width
  height = 'h-full',         // Default height
  borderRadius = 'rounded',  // Default border radius
  className = '',            // Default empty string for className
}) => {
  return (
    <div className={`relative overflow-hidden ${width} ${height} ${borderRadius} bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-500 animate-shiny"
        style={{
          backgroundSize: '200%',
          animation: 'shiny 3s infinite linear',
        }}
      />
    </div>
  );
};

export default SkeletonLoader;
