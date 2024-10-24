import React from 'react';
import Lottie from 'lottie-react';
import spinnerAnimation from '@/assets/animations/SpinnerLoader.json'; // Renamed the imported animation to avoid conflict

interface SpinnerLoaderProps {
  show: boolean; 
  className?: string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ show, className = '' }) => {
  if (!show) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/90 flex justify-center items-center z-50 ${className}`}>
      <Lottie animationData={spinnerAnimation} className="size-16" />
    </div>
  );
};

export default SpinnerLoader;