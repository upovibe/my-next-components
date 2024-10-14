import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '', 
}) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}>
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
