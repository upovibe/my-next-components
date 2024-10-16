"use client";

import React, { useState } from "react";
import { TableView, Column } from "@/components/data/TableView";
import Image from "next/image";  // Import the Image component from Next.js
import { FaInfoCircle, FaCheck } from "react-icons/fa";

const Hero = () => {
  const [products, setProducts] = useState([
    { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
  ]);
  

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const handleSelectionChange = (selection: any[]) => {
    setSelectedProducts(selection);
  };

  const handleRowUpdate = (updatedRow: any, rowIndex: number) => {
    const updatedProducts = [...products];
    updatedProducts[rowIndex] = updatedRow;
    setProducts(updatedProducts);
  };

  const handleView = (item: any) => {
    alert(`Viewing Product:\nCode: ${item.code}\nName: ${item.name}\nCategory: ${item.category}\nQuantity: ${item.quantity}`);
  };

  return (
    <div className="p-4">
      <TableView
        value={products}
        title="Data Table"
        icon={<FaCheck />}
        stripedRows
        paginator
        showGridlines
        rows={5}
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        onRowUpdate={handleRowUpdate}
        rowsPerPageOptions={[5, 10, 25]}
        sortMode="single"
        globalFilterFields={["code", "name", "category", "quantity"]}
        print
        onAddRow={() => console.log("Add new row")}
        onEdit={(item) => console.log("Edit", item)}
        onDeleteAll={(item) => console.log("Delete all rows")}
        onDelete={(item) => console.log("Delete", item)}
        onView={handleView}
        showActions
        useEllipsis
        className="p-3 shadow bg-secndary dark:bg-dim border-2 border-border dark:border-coal rounded-2xl"
      >
        {/* Column for displaying images */}
        <Column
  field="image"
  header="Image"
  body={(rowData) => (
    <div className="relative h-16 w-16"> {/* Parent div needs relative positioning */}
      <Image
        src={rowData.image}
        alt={rowData.name}
        fill
        quality={75}
        placeholder="blur"
        blurDataURL="/avatar.png" // Use an appropriate blur image
        className="object-cover" // This will make sure the image fits the container properly
      />
    </div>
  )}
/>


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
