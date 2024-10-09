import React, { useState, useEffect } from 'react';

interface ProgressLoaderProps {
  isLoading: boolean;  // Controls when the loader should show
  colors?: string[];   // Array of colors for the gradient
  height?: string;     // Loader height, default to '4px'
  className?: string;  // Additional custom classes for styling
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  isLoading,
  colors = ['#4caf50', '#2196f3', '#ff5722'],  // Default gradient colors
  height = '4px',
  className = '', // Default empty string for className
}) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      setCompleted(false);

      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 30; // Increment progress randomly
          if (newProgress >= 100) {
            clearInterval(interval);
            setProgress(100); // Ensure it reaches exactly 100%
            setTimeout(() => setCompleted(true), 500); // Delay hiding to show the complete loader
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }

    return () => clearInterval(interval); // Clean up on component unmount or loading state change
  }, [isLoading]);

  if (completed) return null;  // Remove loader from DOM once it completes

  return (
    <div
      className={`fixed top-0 left-0 z-50 transition-all ease-out duration-300 rounded-full ${className}`}
      style={{
        width: `${progress}%`,
        height,
        background: `linear-gradient(to right, ${colors.join(', ')})`,
      }}
    />
  );
};

export default ProgressLoader;
