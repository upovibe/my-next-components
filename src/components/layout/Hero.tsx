"use client";

import React, { useEffect, useState } from 'react';
import DataView from '@/components/data/DataView'; // Adjust the import path based on your folder structure

// Sample data to display in DataView
const sampleData = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
  { id: 4, name: 'Item 4', description: 'This is item 4' },
  { id: 5, name: 'Item 5', description: 'This is item 5' },
  { id: 6, name: 'Item 6', description: 'This is item 6' },
  { id: 7, name: 'Item 7', description: 'This is item 7' },
];

// Template for rendering each item in DataView
const listTemplate = (item: { id: number; name: string; description: string }) => (
  <div className="p-4 border border-gray-300 rounded-md">
    <h3 className="text-lg font-bold">{item.name}</h3>
    <p>{item.description}</p>
  </div>
);

const Hero = () => {
  const [loading, setLoading] = useState(true); // Manage the loading state

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 6000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">DataView Example</h2>
      
      <DataView
        value={sampleData}
        listTemplate={listTemplate}
        paginator={true}
        rows={3}
        loading={loading} // Pass the loading state
        rowsPerPageOptions={[3, 5, 10]}
        sortField="name"
        sortOrder="asc"
        layout="grid"
        showLayoutSwitcher
      />
    </div>
  );
};

export default Hero;
