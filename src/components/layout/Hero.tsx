"use client";

import React, { useEffect, useState } from "react";
import DataView from "@/components/data/DataView"; // Adjust the import path based on your folder structure

// Sample data to display in DataView
const sampleData = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
  { id: 3, name: "Item 3", description: "This is item 3" },
  { id: 4, name: "Item 4", description: "This is item 4" },
  { id: 5, name: "Item 5", description: "This is item 5" },
  { id: 6, name: "Item 6", description: "This is item 6" },
  { id: 7, name: "Item 7", description: "This is item 7" },
];

// Template for rendering each item in DataView
const listTemplate = (item: { id: number; name: string; description: string }) => (
  <div className="p-4 bg-slate-600 rounded-md border-border dark:border-coal shadow-lg ">
    <h3 className="text-lg font-bold">{item.name}</h3>
    <p>{item.description}</p>
  </div>
);

const Hero = () => {
  const [loading, setLoading] = useState(true); // Manage the loading state

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 6 seconds
    }, 6000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // Define filter options for the 'name' field
  const filterOptions = sampleData.map(item => ({
    label: item.name, 
    value: item.name
  }));

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">DataView Example with Filter</h2>

      <DataView
        value={sampleData}
        listTemplate={listTemplate}
        paginator={true} // Enable pagination
        rows={3} // Rows per page
        rowsPerPageOptions={[3, 5, 10]} // Rows per page options for the user
        sortField="name" // Sort by name field
        sortOrder="asc" // Sort in ascending order
        layout="grid" // Default layout
        showSorting
        showLayoutSwitcher // Show layout switcher between list and grid
        loading={loading} // Pass the loading state to show skeleton loader
        filterField="name" // Filter by the name field
        filterOptions={filterOptions} // Filter options are the names in the dataset
      />
    </div>
  );
};

export default Hero;
