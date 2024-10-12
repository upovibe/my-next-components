import React from 'react';
import Lottie from 'lottie-react';
import spinnerAnimation from '@/assets/animation/SpinnerLoader.json'; // Renamed the imported animation to avoid conflict

interface SpinnerLoaderProps {
  show: boolean; // Controls whether the spinner should be shown
  className?: string; // Additional custom classes for styling
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