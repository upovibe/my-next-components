"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TableView, TableCol } from "@/components/data/TableView";
import photo1 from "@/assets/images/photo1.jpeg";
import { FaTable } from "react-icons/fa";
import Modal from "@/components/overlay/Modal";
import { FaPlus } from "react-icons/fa";

// Sample product data with image URLs
const products = [
  {
    code: "P001",
    name: "Product 1",
    category: "Category A",
    quantity: 20,
    imageUrl: photo1,
  },
  {
    code: "P002",
    name: "Product 2",
    category: "Category B",
    quantity: 15,
    imageUrl: photo1,
  },
  {
    code: "P003",
    name: "Product 3",
    category: "Category C",
    quantity: 30,
    imageUrl: photo1,
  },
  {
    code: "P363",
    name: "Product Y",
    category: "Category Z",
    quantity: 389,
    imageUrl: photo1,
  },
];

// Define category options for the select dropdown
const categoryOptions = [
  { label: "Category A", value: "Category A" },
  { label: "Category B", value: "Category B" },
  { label: "Category C", value: "Category C" },
];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    category: "",
    quantity: 0,
    imageUrl: photo1, // Default image, you can change it as needed
  });

  const handleAddProduct = () => {
    // Logic to handle adding a product goes here
    // You could reset form fields or other state if necessary
    console.log("New Product Added:", newProduct);
    setIsModalOpen(false); // Close modal after adding
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <TableView
        value={products}
        rowsPerPageOptions={[3, 5]}
        size="lg"
        stripedRows
        title="Table"
        icon={<FaTable />}
        isLoading
        loadingDelay={5000}
        className="shadow-lg"
        removableSort
        globalFilterFields={["code", "name", "category", "quantity"]}
        selectionMode="multiple"
        hoverEffect="row"
        showPrintButton
        onInlineUpdate={(updatedRow) => {
          console.log("Database updated with row:", updatedRow);
        }}
        onAddRow={() => setIsModalOpen(true)} // Open modal on add row
      >
        <TableCol
          field="code"
          header="Code"
          sortable
          editable
          editorType="input"
          className="hidden md:table-cell"
        />
        <TableCol field="name" header="Name" editable editorType="input" />
        <TableCol
          field="category"
          header="Category"
          sortable
          editable
          editorType="select"
          options={categoryOptions}
        />
        <TableCol field="quantity" header="Quantity" />
        <TableCol
          className="text-center bg-green-600 flex items-center justify-center w-20"
          field="imageUrl"
          header="Image"
          template={(row) => (
            <Image
              src={row.imageUrl}
              alt={row.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
        />
        <TableCol
          field="actions"
          header="Actions"
          template={(row) => (
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          )}
        />
      </TableView>

      <Modal 
        isOpen={isModalOpen} 
        icon={<FaPlus />}
        title="Add Product" 
        onClose={() => setIsModalOpen(false)}
        position="top"
        footer={
          <div className="flex justify-end space-x-2">
            <button 
            type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded" 
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        }
      >
        {/* Modal content with input fields for new product details */}
        <div>
          <label className="block mb-2">
            Code:
            <input 
              type="text" 
              name="code" 
              value={newProduct.code} 
              onChange={handleInputChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Name:
            <input 
              type="text" 
              name="name" 
              value={newProduct.name} 
              onChange={handleInputChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Category:
            <select 
              name="category" 
              value={newProduct.category} 
              onChange={handleInputChange} 
              className="mt-1 block w-full border rounded p-2"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Quantity:
            <input 
              type="number" 
              name="quantity" 
              value={newProduct.quantity} 
              onChange={handleInputChange} 
              className="mt-1 block w-full border rounded p-2"
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
