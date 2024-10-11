'use client';

import React from 'react';
import DocUpload from '../form/upload/DocsUpload';

const handleFileUpload = (files: File[]) => {
  console.log("Files uploaded:", files.map((file) => file.name));
  // Handle file upload logic here
};

const Hero = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload Doucument</h1>
      <DocUpload showSubmit onFileUpload={handleFileUpload} maxFiles={3} />

    </div>
  );
};

export default Hero;
