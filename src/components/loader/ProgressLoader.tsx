import React, { useState, useEffect } from 'react';

interface ProgressLoaderProps {
  isLoading: boolean;
  colors?: string[];
  height?: string;
  className?: string;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  isLoading,
  colors = ['#4caf50', '#2196f3', '#ff5722'],
  height = '4px',
  className = '',
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
          const newProgress = prev + Math.random() * 30;
          if (newProgress >= 100) {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setCompleted(true), 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (completed) return null;

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
