"use client";

import React from "react";
import Carousel from "../media/Carousel";
import Image from "next/image";

function Hero() {
  const itemTemplates = [
    {
      id: 1,
      content: (
        <div className=" bg-primary dark:bg-shade shadow border border-border dark:border-coal h-48 w-full">
          <Image src="/images/photo1.jpeg" width={100} height={100} alt="Sample Image" className="w-full" />
          <h1 className="text-lg font-bold mt-2">Sample Heading 1</h1>
          <button className="bg-blue-500 text-white py-2 px-4 mt-2">Click Me</button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className=" bg-primary dark:bg-shade shadow border border-border dark:border-coal h-48 w-full">
          <h1 className="text-lg font-bold">Heading 2</h1>
          <p className="mt-2">Some description here.</p>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className=" bg-primary dark:bg-shade shadow border border-border dark:border-coal h-48 w-full">
          <Image src="/images/photo5.jpeg" width={100} height={100} alt="Sample Image" className="w-full" />
          <h1 className="text-lg font-bold mt-2">Sample Heading 2</h1>
          <button className="bg-green-500 text-white py-2 px-4 mt-2">Click Here</button>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className=" bg-primary dark:bg-shade shadow border border-border dark:border-coal h-48 w-full">
          <h1 className="text-lg font-bold">Heading 4</h1>
          <p className="mt-2">Another description here.</p>
        </div>
      ),
    },
    // More itemTemplates...
  ];

  return (
    <div className="container mx-auto border border-border dark:border-coal p-3 rounded-lg">
    <Carousel
      itemTemplates={itemTemplates}
      numVisible={1}
      numScroll={1}
      autoScroll
      circular
      autoScrollInterval={2000}
      showIndicators
      showNavOnHover
      className=" "
      responsiveOptions={[
        { maxWidth: 640, numVisible: 1, numScroll: 1 },
        { maxWidth: 1024, numVisible: 2, numScroll: 1 },
      ]}
    />
  </div>
  );
}

export default Hero;


// import React, { useEffect, useState } from "react";
// import DataView from "@/components/data/DataView"; 
// import ImagePreview from "../media/ImagePreview";
// import { FaEye } from 'react-icons/fa'; 
// import ImageGallery from '../media/ImageGallery';

// // Sample data to display in DataView
// const sampleData = [
//   { id: 1, name: "Item 1", description: "This is item 1" },
//   { id: 2, name: "Item 2", description: "This is item 2" },
//   { id: 3, name: "Item 3", description: "This is item 3" },
//   { id: 4, name: "Item 4", description: "This is item 4" },
//   { id: 5, name: "Item 5", description: "This is item 5" },
//   { id: 6, name: "Item 6", description: "This is item 6" },
//   { id: 7, name: "Item 7", description: "This is item 7" },
// ];

// const images = [
//   {
//     src: '/images/photo1.jpeg',
//     alt: 'Image 1',
//     caption: 'This is image 1',
//   },
//   {
//     src: '/images/photo2.jpeg',
//     alt: 'Image 2',
//     caption: 'This is image 2',
//   },
//   {
//     src: '/images/photo3.jpeg',
//     alt: 'Image 3',
//     caption: 'This is image 3',
//   },
//   {
//     src: '/images/photo4.jpeg',
//     alt: 'Image 3',
//     caption: 'This is image 3',
//   },
//   {
//     src: '/images/photo5.jpeg',
//     alt: 'Image 3',
//     caption: 'This is image 3',
//   },
//   {
//     src: '/images/photo6.jpeg',
//     alt: 'Image 3',
//     caption: 'This is image 3',
//   },
// ];


// // Template for rendering each item in DataView
// const listTemplate = (item: { id: number; name: string; description: string }) => (
//   <div className="p-4 bg-slate-600 rounded-md  border-border dark:border-coal  shadow-lg ">
//     <ImagePreview
//         src="/images/singleClass.png"
//         zoomSrc="/images/singleClass.png"
//         alt="Sample Image"
//         className="w-1/2 mx-auto"
//         indicatorIcon={<FaEye className="text-black text-4xl" />}
//       />
//     <h3 className="text-lg font-bold">{item.name}</h3>
//     <p>{item.description}</p>
//   </div>
// );

// const Hero = () => {
//   const [loading, setLoading] = useState(true); // Manage the loading state

//   useEffect(() => {
//     // Simulate loading time (e.g., fetching data)
//     const timer = setTimeout(() => {
//       setLoading(false); // Set loading to false after 6 seconds
//     }, 6000);

//     // Cleanup timer on unmount
//     return () => clearTimeout(timer);
//   }, []);

//   // Define filter options for the 'name' field
//   const filterOptions = sampleData.map(item => ({
//     label: item.name, 
//     value: item.name
//   }));

//   return (
//     <div className="container mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6">DataView Example with Filter</h2>

//       <DataView
//         value={sampleData}
//         listTemplate={listTemplate}
//         paginator={true} // Enable pagination
//         rows={3} // Rows per page
//         rowsPerPageOptions={[3, 5, 10]} // Rows per page options for the user
//         sortField="name" // Sort by name field
//         sortOrder="asc" // Sort in ascending order
//         layout="grid" // Default layout
//         showSorting
//         showLayoutSwitcher // Show layout switcher between list and grid
//         loading={loading} // Pass the loading state to show skeleton loader
//         filterField="name" // Filter by the name field
//         filterOptions={filterOptions} // Filter options are the names in the dataset
//       />

// <div className="">
//       <ImageGallery
//         images={images}
//         showIndicators
//         indicatorsPosition="bottom"
//         changeItemOnIndicatorHover
//         showItemNavigatorsOnHover
//         showItemNavigators
//         circular
//         autoPlay
//         caption={(image) => <div>{image.caption}</div>}
//         // showThumbnails
//         sizeClass = "md:size-[50rem] size-[20rem]"
//         className="p-5 bg-primary dark:bg-shade shadow rounded-lg border border-border dark:border-coal "
//       />
//     </div>
//     </div>

//   );
// };

// export default Hero;


// "use client";

// import React, { useState } from "react";
// import { TableView, Column } from "@/components/data/TableView";
// import Image from "next/image";  // Import the Image component from Next.js
// import { FaInfoCircle, FaCheck } from "react-icons/fa";

// const Hero = () => {
//   const [products, setProducts] = useState([
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//   ]);
  

//   const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

//   const handleSelectionChange = (selection: any[]) => {
//     setSelectedProducts(selection);
//   };

//   const handleRowUpdate = (updatedRow: any, rowIndex: number) => {
//     const updatedProducts = [...products];
//     updatedProducts[rowIndex] = updatedRow;
//     setProducts(updatedProducts);
//   };

//   const handleView = (item: any) => {
//     alert(`Viewing Product:\nCode: ${item.code}\nName: ${item.name}\nCategory: ${item.category}\nQuantity: ${item.quantity}`);
//   };

//   return (
//     <div className="p-4">
//       <TableView
//         value={products}
//         title="Data Table"
//         icon={<FaCheck />}
//         stripedRows
//         paginator
//         showGridlines
//         rows={5}
//         selectionMode="multiple"
//         onSelectionChange={handleSelectionChange}
//         onRowUpdate={handleRowUpdate}
//         rowsPerPageOptions={[5, 10, 25]}
//         sortMode="single"
//         globalFilterFields={["code", "name", "category", "quantity"]}
//         print
//         onAddRow={() => console.log("Add new row")}
//         onEdit={(item) => console.log("Edit", item)}
//         onDeleteAll={(item) => console.log("Delete all rows")}
//         onDelete={(item) => console.log("Delete", item)}
//         onView={handleView}
//         showActions
//         // useEllipsis
//         className="p-3 shadow bg-secndary dark:bg-dim border-2 border-border dark:border-coal  rounded-2xl"
//       >
//         {/* Column for displaying images */}
//         <Column
//   field="image"
//   header="Image"
//   body={(rowData) => (
//     <div className="relative h-16 w-16"> {/* Parent div needs relative positioning */}
//       <Image
//         src={rowData.image}
//         alt={rowData.name}
//         fill
//         quality={75}
//         placeholder="blur"
//         blurDataURL="/avatar.png" // Use an appropriate blur image
//         className="object-cover" // This will make sure the image fits the container properly
//       />
//     </div>
//   )}
// />


//         <Column field="code" header="Code" sortable filterable editorType="input" />
//         <Column field="name" header="Name" sortable editable editorType="input" />
//         <Column
//           field="category"
//           header="Category"
//           filterable
//           editable
//           editorType="select"
//           options={[
//             { value: "Category A", label: "Category A" },
//             { value: "Category B", label: "Category B" },
//             { value: "Category C", label: "Category C" },
//           ]}
//         />
//         <Column field="quantity" header="Quantity" sortable editable editorType="input" />
//       </TableView>

//       <div className="mt-4">
//         <h2 className="text-lg font-semibold">Selected Products:</h2>
//         <ul className="list-disc pl-5">
//           {selectedProducts.length > 0 ? (
//             selectedProducts.map((product, index) => (
//               <li key={`${product.code}-${index}`}>
//                 {product.name} (Code: {product.code}, Quantity: {product.quantity})
//               </li>
//             ))
//           ) : (
//             <li>No products selected</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import { ReactNode, useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '@/components/common/Logo';

type MenuItem = { icon: JSX.Element; label: string; link?: string };
type SideMenuProps = {
  children: ReactNode;
  items?: (MenuItem | ReactNode)[];
  actions?: ReactNode;
};

const SideMenu = ({ children, items = [], actions }: SideMenuProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isIconOnly, setIsIconOnly] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsIconOnly(!isIconOnly);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsIconOnly(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`sticky top-0 h-screen p-3 space-y-3 transition-all duration-300 bg-primary dark:bg-shade ${
          isSidebarOpen
            ? 'fixed inset-0 z-20'
            : isIconOnly
            ? 'w-fit'
            : 'hidden'
        } lg:${isIconOnly ? 'w-fit' : ' w-[250px]'} lg:block lg:relative lg:h-auto`}
      >
        {/* Sidebar Logo - Visible only in overlay mode (small screens) */}
        {isSidebarOpen && window.innerWidth < 1024 && (
          <div className="mb-6">
            <Logo />
          </div>
        )}

        {/* Toggle between icon-only and full sidebar */}
        <button
          aria-label='toggle-button'
          type="button"
          onClick={() => setIsIconOnly(!isIconOnly)}
          className="p-2 rounded-md hover:bg-secondary hover:dark:bg-dim text-soft dark:text-pale mb-4 hidden lg:block transition-all duration-200 ease-linear"
        >
          {isIconOnly ? <FaBars /> : <FaTimes />}
        </button>

        {/* Sidebar Navigation */}
        <nav className="space-y-4">
          {items.map((item, index) => {
            if (typeof item === 'object' && 'icon' in item) {
              return (
                <a
                  key={index}
                  href={item.link || '#'}
                  className="flex items-center gap-3 p-2 rounded-md text-soft dark:text-pale hover:bg-secondary dark:hover:bg-dim transition-all duration-200 ease-linear"
                >
                  {item.icon}
                  {!isIconOnly && <span>{item.label}</span>}
                </a>
              );
            } else {
              return <div key={index}>{item}</div>;
            }
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 text-deep dark:text-light py-2 px-3 relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-primary dark:bg-shade py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="z-20 hidden lg:block">
              <Logo />
            </div>

            {/* Sidebar Toggle Button (small screens) */}
            <button
              aria-label="toggle-button"
              type="button"
              onClick={toggleMenu}
              className="p-2 bg-deep dark:bg-soft text-white rounded-md z-10 block lg:hidden transition-all duration-200 ease-linear"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Actions */}
            <div className="flex space-x-4 items-center">{actions}</div>
          </div>
        </div>

        {children}
      </div>

      {/* Overlay for small screen when the menu is open */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default SideMenu;
