"use client";

import React from "react";
import Image from "next/image";
import { TableView, TableCol } from "@/components/data/TableView";
import photo1 from "@/assets/images/photo1.jpeg";
import { FaTable } from "react-icons/fa";

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
    name: "Product y",
    category: "Category z",
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
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <TableView
        value={products}
        rowsPerPageOptions={[3, 5]}
        size="lg"
        //   showGridlines
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
              className="rounded-full size-10"
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
     
    </div>
  );
};

export default Page;
