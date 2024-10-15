"use client";

import React, { useState } from "react";
import { TableView, Column } from "@/components/data/TableView";
import Skeleton from "react-loading-skeleton";
import SkeletonLoader from "../loader/SkeletonLoader";

const Hero = () => {
  const [products, setProducts] = useState([
    { code: "P001", name: "Product 1", category: "Category A", quantity: 10 },
    { code: "P002", name: "Product 2", category: "Category B", quantity: 20 },
    { code: "P003", name: "Product 3", category: "Category A", quantity: 30 },
    { code: "P004", name: "Product 4", category: "Category C", quantity: 40 },
    // Add more products as needed
  ]);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const customActions = [
    {
      label: "Custom Action 1",
      onClick: (item) => console.log("Custom Action 1 clicked", item),
    },
    {
      label: "Custom Action 2",
      onClick: (item) => console.log("Custom Action 2 clicked", item),
    },
  ];

  // Handle selection change for checkboxes
  const handleSelectionChange = (selection: any[]) => {
    setSelectedProducts(selection);
  };

  // Handle row update after editing
  const handleRowUpdate = (updatedRow: any, rowIndex: number) => {
    // Create a new array with the updated row data
    const updatedProducts = [...products];
    updatedProducts[rowIndex] = updatedRow;
    setProducts(updatedProducts);
  };

  // Alert function for viewing a product
  const handleView = (item: any) => {
    alert(`Viewing Product:\nCode: ${item.code}\nName: ${item.name}\nCategory: ${item.category}\nQuantity: ${item.quantity}`);
  };

  return (
    <div className="p-4">
      <TableView
        value={products}
        stripedRows
        paginator
        showGridlines
        showActions={true}
        rows={5} // Set the default number of rows per page
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        onRowUpdate={handleRowUpdate} // Pass the update handler to TableView
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        sortMode="single"
        globalFilterFields={["code", "name", "category"]}
        loading
        print
        useEllipsis
        onAddRow={() => console.log("Add new row")}
        onEdit={(item) => console.log("Edit", item)}
        onDeleteAll={(item) => console.log("Delete all rows")}
        onDelete={(item) => console.log("Delete", item)}
        onView={handleView} // Pass the alert function as the onView handler
        customActions={customActions} // Pass the custom actions
      >
        <Column field="code" header="Code" sortable filterable editorType="input" />
        <Column field="name" header="Name" sortable editable editorType="input" />
        <Column
          field="category"
          header="Category"
          filterable
          editable
          editorType="select"
          options={[
            { value: "Category A", label: "Category A" },
            { value: "Category B", label: "Category B" },
            { value: "Category C", label: "Category C" },
          ]}
        />
        <Column field="quantity" header="Quantity" sortable editable editorType="input" />
      </TableView>

     

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Selected Products:</h2>
        <ul className="list-disc pl-5">
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product, index) => (
              <li key={`${product.code}-${index}`}>
                {product.name} (Code: {product.code}, Quantity: {product.quantity})
              </li>
            ))
          ) : (
            <li>No products selected</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Hero;