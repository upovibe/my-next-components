'use client';

import React, { useState } from 'react';
import { TableView, Column } from '@/components/data/TableView'; // Ensure this path is correct

const Hero: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  
  const products = [
    { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
    { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20 },
    { code: 'P003', name: 'Product 3', category: 'Category 1', quantity: 30 },
    { code: 'P004', name: 'Product 4', category: 'Category 3', quantity: 40 },
    { code: 'P005', name: 'Product 5', category: 'Category 4', quantity: 50 },
    { code: 'P006', name: 'Product 6', category: 'Category 5', quantity: 60 },
    { code: 'P007', name: 'Product 7', category: 'Category 6', quantity: 70 },
    { code: 'P008', name: 'Product 8', category: 'Category 7', quantity: 80 },
    { code: 'P009', name: 'Product 9', category: 'Category 8', quantity: 90 },
    { code: 'P010', name: 'Product 10', category: 'Category 9', quantity: 100 },
  ];

  const handleSelectionChange = (selection: any[]) => {
    setSelectedProducts(selection);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Hero Section</h1>
      <div className="bg-primary dark:bg-shade rounded-md shadow border-border mt-4">
        <TableView
          value={products}
          stripedRows
          showGridlines
          paginator
          rows={5}
          rowsPerPageOptions={[3, 6, 10]} 
          sortMode="single"
          defaultSortField="code"
          defaultSortOrder={1} // Optional: specify default sort order
          removableSort={true} // Optional: allow removable sorting
          globalFilterFields={['name', 'category']} // Enable global filtering on these fields
          selectionMode="multiple"  // Enable multiple row selection
          selectionType="row" // Enable row selection (can be "cell" for cell selection)
          onSelectionChange={handleSelectionChange}
        >
          <Column field="code" header="Code" sortable filterable />
          <Column field="name" header="Name" sortable filterable />
          <Column field="category" header="Category" filterable />
          <Column field="quantity" header="Quantity" sortable />
        </TableView>
      </div>

      {/* Displaying selected products */}
      {selectedProducts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Selected Products:</h2>
          <ul className="list-disc list-inside">
            {selectedProducts.map((product) => (
              <li key={product.code}>
                {product.name} (Code: {product.code}) - {product.quantity} units
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hero;
