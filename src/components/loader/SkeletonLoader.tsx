import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse m-1 ${className}`}
        >
          <div
            className=" rounded-lg absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-500 animate-shiny"
            style={{
              backgroundSize: '200%',
              animation: 'shiny 3s infinite linear',
            }}
          />
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
