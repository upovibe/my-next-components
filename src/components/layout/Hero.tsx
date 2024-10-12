'use client';

import React from 'react';
import FileUpload from '../form/upload/FileUpload'; // Import your FileUpload component

// Handler for file upload
const handleFileUpload = (files: File[]) => {
  console.log("Files uploaded:", files.map((file) => file.name));
  // Handle file upload logic here (e.g., send to server, etc.)
};

const Hero: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload Images</h1>
      <FileUpload
        onFileUpload={handleFileUpload} // Callback to handle uploaded files
        maxFiles={3}                    // Maximum number of image files allowed
        fileType="image"                // Specify the file type for image uploads
        showSubmit={true}               // Show submit button
        showClear={true}                // Show clear button to remove all files
        showUpload={true}               // Show upload button to open file dialog
      />

      <h1 className="text-xl font-bold mt-8 mb-4">Upload Videos</h1>
      <FileUpload
        onFileUpload={handleFileUpload} // Callback to handle uploaded files
        maxFiles={2}                    // Maximum number of video files allowed
        fileType="video"                // Specify the file type for video uploads
        showSubmit={true}               // Show submit button
        showClear={true}                // Show clear button to remove all files
        showUpload={true}               // Show upload button to open file dialog
      />

      <h1 className="text-xl font-bold mt-8 mb-4">Upload Documents</h1>
      <FileUpload
        onFileUpload={handleFileUpload} // Callback to handle uploaded files
        maxFiles={5}                    // Maximum number of document files allowed
        fileType="doc"                  // Specify the file type for document uploads
        showSubmit={true}               // Show submit button
        showClear={true}                // Show clear button to remove all files
        showUpload={true}               // Show upload button to open file dialog
      />

      <h1 className="text-xl font-bold mt-8 mb-4">Upload Any File Type</h1>
      <FileUpload
        onFileUpload={handleFileUpload}  // Callback to handle uploaded files
        maxFiles={10}                    // Maximum number of files allowed
        fileType="all"                   // Allow all file types (image, video, doc)
        showSubmit={true}                // Show submit button
        showClear={true}                 // Show clear button to remove all files
        showUpload={true}                // Show upload button to open file dialog
      />
    </div>
  );
};

export default Hero;
