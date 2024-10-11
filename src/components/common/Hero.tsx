'use client';

import React from 'react';
import ImageUpload from '../form/upload/ImageUpload';  // Import your ImageUpload component

const handleImageUpload = (files: File[]) => {
  console.log("Images uploaded:", files.map((file) => file.name));
  // Handle image upload logic here
};

const Hero = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload Image</h1>
      <ImageUpload showSubmit onFileUpload={handleImageUpload} maxFiles={3} />

    </div>
  );
};

export default Hero;
