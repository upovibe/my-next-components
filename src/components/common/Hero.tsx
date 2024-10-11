'use client';

import React, { useState } from 'react';
import Sidebar from '../dialogs/Sidebar'; // Adjust the import path as necessary
import Tooltip from './Tooltip';

const Hero = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className="your-button-class">
        Open Sidebar
      </button>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        header={
          <span className="flex items-center gap-2 w-full">
            <img src="path-to-image.jpg" alt="Profile" className="w-6 h-6 rounded-full" />
            <span className="font-bold whitespace-nowrap">Ioni Bowcher</span>
          </span>
        } 
        position="right" // or 'left' to open from the left
        className="additional-custom-class" // Add any custom classes here
      >
        <p>Your sidebar content goes here!</p>
      </Sidebar>
      <div className="flex justify-center items-center h-screen">
            <Tooltip position="center" content={
          <span className="flex items-center gap-2 w-full">
            <img src="path-to-image.jpg" alt="Profile" className="w-6 h-6 rounded-full" />
            <span className="font-bold whitespace-nowrap">Ioni Bowcher</span>
          </span>
        } >
                <button className="p-4 bg-blue-500 text-white rounded">Hover over me</button>
            </Tooltip>
        </div>
    </div>
  );
};
export default Hero;

