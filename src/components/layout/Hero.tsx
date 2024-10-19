"use client";

import React, { useState } from 'react';
import SwitchButton from '../form/buttons/SwitchButton';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Hero = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    // Toggle the like state
    setIsLiked(!isLiked);
  };

  return (
    <div className="hero-container">
      <h1>Hero Section</h1>

      {/* SwitchButton Example */}
      <SwitchButton
        onClick={handleLikeToggle}        // Toggle function
        isToggled={isLiked}               // Current state
        iconTrue={FaThumbsUp}             // Icon for liked state
        iconFalse={FaThumbsDown}          // Icon for unliked state
        textTrue="Liked"                  // Text for liked state
        textFalse="Like"                  // Text for unliked state
        showIconOnly             // Set to true if you want to show only icons
        iconClass='text-2xl'
        className="bg-blue-500 text-white py-2 px-4 rounded"
      />
    </div>
  );
};

export default Hero;
