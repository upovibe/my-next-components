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




"use client";

import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  toDate,
  isValid,
  parseISO,
  startOfHour,
  endOfHour,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  addDays,
  subDays,
  getHours,
  getMinutes,
} from "date-fns";
import SelectButton from "@/components/form/buttons/SelectButton";
import InputSelect from "@/components/form/inputs/InputSelect";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
}

interface MegaCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  selectedDate: Date;
  viewType: "month" | "week" | "day" | "agenda" | "year";
  onViewChange: (view: "month" | "week" | "day" | "agenda" | "year") => void;
  theme?: object;
  locale?: string;
  minTime?: number;
  maxTime?: number;
}

const MegaCalendar: React.FC<MegaCalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
  selectedDate,
  viewType,
  onViewChange,
  theme,
  locale,
  minTime = 0,
  maxTime = 24,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Toggle between 24-hour and 12-hour formats
  const toggleTimeFormat = () => {
    setIs24HourFormat(!is24HourFormat);
  };

  // Helper to format the time slot labels
  const formatHourLabel = (hour: number) => {
    const date = new Date(2020, 0, 1, hour);
    return is24HourFormat ? format(date, "HH:mm") : format(date, "h:mm a");
  };

    // Update the current date to today's date
    const handleTodayClick = () => {
      setCurrentDate(new Date()); // Set currentDate to today's date
    };

  const nextPeriod = () => {
    switch (viewType) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(addYears(currentDate, 1));
        break;
      case "agenda":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const prevPeriod = () => {
    switch (viewType) {
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(subYears(currentDate, 1));
        break;
      case "agenda":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const handleDateClick = (date: Date) => {
    onDateClick(date);
    setSearchValue(""); // Clear the search input
  };

  const renderHeader = () => {
    const startOfWeekDate = startOfWeek(currentDate);
    const endOfWeekDate = endOfWeek(currentDate);
  
    // Format the header based on view type
    const headerTitle = (() => {
      switch (viewType) {
        case "day":
          return format(currentDate, "EEE MMM d"); // Thu Oct 24
        case "week":
          return `${format(startOfWeekDate, "MMM d")} - ${format(endOfWeekDate, "d")}`; // Oct 20 - 26
        case "month":
          return format(currentDate, "MMM yyyy"); // Oct 2024
        case "year":
          return format(currentDate, "yyyy"); // 2024
        case "agenda":
          return `${format(startOfWeekDate, "MMM d")} - ${format(endOfWeekDate, "d")}`; // Oct 20 - 26
        default:
          return ""; // Fallback case
      }
    })();
  
    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevPeriod} className="text-gray-500">
          Previous
        </button>
  
        <h2 className="text-xl font-bold">{headerTitle}</h2>
  
        <button onClick={nextPeriod} className="text-gray-500">
          Next
        </button>
  
        {/* Call the new handleTodayClick function */}
        <button onClick={handleTodayClick} className="ml-2 text-gray-500">
          Today
        </button>
  
        <div className="ml-4">
          <SelectButton
            options={["day", "week", "month", "year", "agenda"]}
            value={viewType}
            onChange={(value) =>
              onViewChange(value as "day" | "week" | "month" | "year" | "agenda")
            }
          />
        </div>
  
        <div className="ml-4">
          <InputSelect
            placeholder="Search Date (YYYY-MM-DD)"
            options={[]} // Add your filter logic back if needed
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              const parsedDate = parseISO(value);
              if (isValid(parsedDate)) {
                handleDateClick(parsedDate);
              }
            }}
          />
        </div>
  
        {/* Button to toggle time format */}
        <button onClick={toggleTimeFormat} className="ml-4 text-gray-500">
          {is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour"}
        </button>
      </div>
    );
  };

  const renderYearView = () => {
    const months = [];
    const currentYear = currentDate.getFullYear();
  
    for (let month = 0; month < 12; month++) {
      const monthStart = startOfMonth(new Date(currentYear, month, 1));
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
  
      let day = startDate;
      const weeks = [];
      const days = [];
  
      // Create day elements for each month
      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          const eventForDay = events.find((event) => isSameDay(event.start, day));
          const eventColor = eventForDay ? eventForDay.color : "";
  
          days.push(
            <div
              key={day.toString()}
              className={`p-1 text-sm border border-gray-200 cursor-pointer 
                          ${!isSameMonth(day, monthStart) ? "bg-gray-100" : ""} 
                          ${isSameDay(day, new Date()) ? "bg-blue-200" : ""}`}
              style={{ backgroundColor: eventColor }}
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
            </div>
          );
          day = addDays(day, 1);
        }
  
        weeks.push(
          <div key={day.toString()} className="grid grid-cols-7 gap-1">
            {days.splice(0)}
          </div>
        );
      }
  
      // Display the month grid with a title
      months.push(
        <div key={month} className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-center font-bold mb-2">{format(monthStart, "MMMM")}</h3>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-xs">
                {day}
              </div>
            ))}
          </div>
          {weeks}
        </div>
      );
    }
  
    return <div className="grid grid-cols-3 gap-4">{months}</div>;
  };
  
  
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            className={`p-4 border border-gray-200 cursor-pointer ${!isSameMonth(day, monthStart) ? "bg-gray-100" : ""
              } ${isSameDay(day, new Date()) ? "bg-blue-200" : ""}`}
            key={day.toString()}
            onClick={() => handleDateClick(toDate(day))}
          >
            <span>{format(day, "d")}</span>
            <div className="mt-2">
              {events
                .filter((event) => isSameDay(event.start, day))
                .map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="text-sm text-gray-600 cursor-pointer hover:text-blue-500"
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

const renderWeekView = () => {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  const today = new Date();
  const currentTime = new Date();

  // Time slot labels for hours of the day
  const timeSlots = [];
  for (let hour = minTime; hour < maxTime; hour++) {
    timeSlots.push(
      <div className="border border-gray-200 h-16 relative cursor-pointer" key={hour}>
        <div className="w-16 text-right pr-2 text-gray-500">
          {formatHourLabel(hour)}
        </div>
      </div>
    );
  }

  const days = [];
  let day = startDate;

  // Loop through each day in the week
  while (day <= endDate) {
    const isToday = day.toDateString() === today.toDateString();
    
    days.push(
      <div key={day.toString()} className={`flex flex-col relative ${isToday ? 'bg-blue-50' : ''}`}>
        <div className="font-medium text-gray-700 text-center">
          {`${format(day, "d")} ${format(day, "EEE")}`}
        </div>
        {timeSlots.map((slot, index) => {
          const slotTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), minTime + index);
          const slotEndTime = endOfHour(slotTime);

          return (
            <div
              key={index}
              className="border border-gray-200 p-2 h-16 relative cursor-pointer"
              onClick={() => handleDateClick(slotTime)}
            >
              {events
                .filter(
                  (event) =>
                    event.start <= slotEndTime && event.end >= slotTime
                )
                .map((event, eventIndex) => {
                  const isFirstSlot = event.start <= slotTime && event.start >= startOfHour(slotTime);
                  const eventStartMinutes = event.start.getMinutes();
                  const eventEndMinutes = event.end.getMinutes();

                  const eventStartHour = event.start.getHours();
                  const eventEndHour = event.end.getHours();

                  // Calculate top offset (start time within the hour)
                  const topOffset = eventStartHour === slotTime.getHours() ? (eventStartMinutes / 60) * 64 : 0;

                  // Calculate height (based on how long the event lasts in this slot)
                  const endOffset = eventEndHour === slotTime.getHours() ? (eventEndMinutes / 60) * 64 : 64;
                  const height = endOffset - topOffset;

                  return (
                    <div
                      key={event.id}
                      className={`absolute inset-x-0 ${isFirstSlot ? "bg-blue-100 text-sm p-1" : "bg-blue-100"}`}
                      style={{
                        height: `${height}px`,      // Adjusted height based on time fraction within the hour
                        top: `${topOffset}px`,       // Adjusted top to place event correctly within the hour
                        zIndex: 1,
                      }}
                      onClick={() => onEventClick(event)}
                    >
                      {isFirstSlot && event.title}
                    </div>
                  );
                })}
            </div>
          );
        })}

        {isToday && (
          <div
            className="absolute w-full h-0.5 bg-green-500"
            style={{
              top: `${(getHours(currentTime) - minTime) * 64 +
                (getMinutes(currentTime) / 60) * 64}px`,
              zIndex: 10,
            }}
          />
        )}
      </div>
    );

    day = addDays(day, 1);
  }

  return (
    <div className="grid grid-cols-8 gap-2">
      <div className="col-span-1">
        <div className="font-bold text-gray-700 text-center">Time</div>
        {timeSlots}
      </div>
      <div className="col-span-7 grid grid-cols-7">
        {days}
      </div>
    </div>
  );
};


const renderDayView = () => {
  const timeSlots = [];

  for (let hour = minTime; hour < maxTime; hour++) {
    timeSlots.push(
      <div className="border border-gray-200 h-16 relative cursor-pointer" key={hour}>
        {/* Hour label with white background */}
        <div className="absolute z-20 w-16 text-right pr-2 text-gray-500 bg-white">
          {formatHourLabel(hour)}
        </div>

        {events
          .filter(
            (event) =>
              event.start <= endOfHour(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour)) &&
              event.end >= startOfHour(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))
          )
          .map((event) => {
            const isFirstSlot = event.start.getHours() === hour;
            const eventStartMinutes = event.start.getMinutes();
            const eventEndMinutes = event.end.getMinutes();
            
            const eventStartHour = event.start.getHours();
            const eventEndHour = event.end.getHours();

            // Calculate the top offset (start time within the hour, i.e., 12:30)
            const topOffset = eventStartHour === hour ? (eventStartMinutes / 60) * 64 : 0;
            
            // Calculate height based on how long the event lasts in this slot (end time within the hour, i.e., 15:49)
            const endOffset = eventEndHour === hour ? (eventEndMinutes / 60) * 64 : 64;
            const height = endOffset - topOffset;

            return (
              <div
                key={event.id}
                className={`absolute inset-x-0 text-center ${isFirstSlot ? "bg-blue-100 text-sm p-1" : "bg-blue-100"}`}
                style={{
                  height: `${height}px`,      // Adjusted height based on time fraction within the hour
                  top: `${topOffset}px`,       // Adjusted top to place event correctly within the hour
                  zIndex: 1,
                }}
                onClick={() => onEventClick(event)}
              >
                {/* Only show the event title on the first slot */}
                {isFirstSlot && event.title}
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 relative">
        {timeSlots}
        {/* Green line for current time */}
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-green-500"
          style={{
            top: `${(getHours(currentTime) - minTime) * 64 +
              (getMinutes(currentTime) / 60) * 64}px`,
          }}
        />
      </div>
    </div>
  );
};

  const renderAgendaView = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      const dayEvents = events.filter((event) => isSameDay(event.start, day));
      days.push(
        <div key={day.toString()} className="p-4 border-b border-gray-200">
          <div className="font-bold">{format(day, "EEEE, MMMM d")}</div>
          <ul className="list-disc list-inside">
            {dayEvents.length > 0 ? (
              dayEvents.map((event) => (
                <li key={event.id} className="text-gray-600">
                  <span className="font-semibold">{event.title}</span> -{" "}
                  {format(event.start, is24HourFormat ? "HH:mm" : "h:mm a")} -{" "}
                  {format(event.end, is24HourFormat ? "HH:mm" : "h:mm a")}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No events</li>
            )}
          </ul>
        </div>
      );
      day = addDays(day, 1);
    }

    return <div>{days}</div>;
  };

  return (
    <div className="p-4">
      {renderHeader()}

      {viewType === "year" && renderYearView()}
      {viewType === "month" && renderMonthView()}
      {viewType === "week" && renderWeekView()}
      {viewType === "day" && renderDayView()}
      {viewType === "agenda" && renderAgendaView()}
    </div>
  );
};

export default MegaCalendar;





import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import InputSelect from "@/components/form/inputs/InputSelect";
import SelectButton from "@/components/form/buttons/SelectButton";
import ButtonAction from "@/components/form/buttons/ActionButton";
import SwitchButton from "@/components/form/buttons/SwitchButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: "month" | "week" | "day" | "agenda" | "year";
  onViewChange: (view: "month" | "week" | "day" | "agenda" | "year") => void;
  onTodayClick: () => void;
  onNavigateToEvent?: (date: Date) => void;
  toggleTimeFormat: () => void;
  is24HourFormat: boolean;
  prevPeriod: () => void;
  nextPeriod: () => void;
  events?: { date: Date; title: string }[];
  locale?: "en" | "fr" | "es";
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewType,
  onViewChange,
  onTodayClick,
  toggleTimeFormat,
  is24HourFormat,
  prevPeriod,
  nextPeriod,
  onNavigateToEvent,
  events = [],
  locale = "en",
}) => {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Generate dropdown options based on the view type
  useEffect(() => {
    const generateOptions = () => {
      let options: string[] = [];
      const localeOptions = { locale: localeMap[locale] };

      const formatOption = (date: Date, eventTitle?: string) => 
        `${format(date, "EEE, MMM d", localeOptions)} ${eventTitle ? ` - ${eventTitle}` : ""}`;
      
      const addDateRangeOptions = (start: Date, end: Date) => {
        let date = start;
        while (date <= end) {
          const event = events.find((e) => e.date.toDateString() === date.toDateString());
          options.push(formatOption(date, event?.title));
          date = addDays(date, 1);
        }
      };

      switch (viewType) {
        case "day":
          options.push(formatOption(currentDate, events.find(e => e.date.toDateString() === currentDate.toDateString())?.title));
          break;
        case "week":
          addDateRangeOptions(startOfWeek(currentDate, localeOptions), endOfWeek(currentDate, localeOptions));
          break;
        case "month":
          addDateRangeOptions(startOfMonth(currentDate), endOfMonth(currentDate));
          break;
        case "year":
          for (let month = 0; month < 12; month++) {
            const date = new Date(currentDate.getFullYear(), month, 1);
            options.push(formatOption(date));
          }
          break;
        default:
          break;
      }

      setSearchOptions(options.slice(0, 5));  // Limit to five options initially
    };

    generateOptions();
  }, [currentDate, viewType, events, locale]);

  const handleSelectChange = (value: string) => {
    setSelectedDate(value);
    const selectedEvent = events.find(event => format(event.date, "EEE, MMM d", { locale: localeMap[locale] }) === value);
    if (selectedEvent && onNavigateToEvent) {
      onNavigateToEvent(selectedEvent.date);
    }
  };

  return (
    <div className="flex items-center justify-between mb-5 min-w-[59rem] bg-primary dark:bg-shade rounded-full py-1 px-3">
      <div className="flex items-center gap-2">
        <SwitchButton
          onClick={toggleTimeFormat}
          isToggled={is24HourFormat}
          textTrue="Switch to 12-hour"
          textFalse="Switch to 24-hour"
          className="flex items-center rounded-full justify-center size-8 font-semibold text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
          showTextOnly
        />
        <ButtonAction
          onClick={onTodayClick}
          hideTextOnLoading
          className="flex items-center rounded-full justify-center font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
        >
          Today
        </ButtonAction>
      </div>

      <div className="flex items-center gap-2 justify-center">
        <button
          type="button"
          aria-label="Previous Date"
          onClick={prevPeriod}
          className="flex items-center rounded-full justify-center w-8 h-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
        >
          <FaChevronLeft />
        </button>
        <h2 className="text-xl text-deep dark:text-light bg-secondary dark:bg-dim p-1 px-3 rounded-full shadow font-bold flex-grow text-center">
          {headerTitle}
        </h2>
        <button
          type="button"
          aria-label="Next Date"
          onClick={nextPeriod}
          className="flex items-center rounded-full justify-center w-8 h-8 font-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear cursor-pointer"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex items-center">
        <InputSelect
          placeholder="Search dates/events..."
          options={searchOptions}
          value={selectedDate}
          onChange={handleSelectChange}
        />
        <SelectButton
          options={["day", "week", "month", "year", "agenda"]}
          value={viewType}
          onChange={(value) => onViewChange(value as "day" | "week" | "month" | "year" | "agenda")}
          className="px-3 py-1 rounded-full font-semibold transition-all duration-200 ease-linear cursor-pointer capitalize"
        />
      </div>
    </div>
  );
};

export default CalendarHeader;


import React, { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import MegaCalendar from "@/components/form/calender/MegaCalender";

const Page = () => {
  // Example event data with multiple events on the same days
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting with Bob",
      start: new Date("2024-10-24T06:00:00"),
      end: new Date("2024-10-24T07:00:00"),
      description: "Discuss project progress",
      color: "red",
    },
    {
      id: 2,
      title: "Lunch with Sarah",
      start: new Date("2024-10-26T12:00:00"),
      end: new Date("2024-10-26T14:50:00"),
      description: "Catch up over lunch",
      color: "green",
    },
    {
      id: 3,
      title: "Conference Call",
      start: new Date("2024-10-26T15:00:00"),
      end: new Date("2024-10-26T16:00:00"),
      description: "Weekly sync with the team",
      color: "brown",
    },
    // Additional events on the same days to trigger "+X more" display
    {
      id: 4,
      title: "Doctor Appointment",
      start: new Date("2024-10-24T08:00:00"),
      end: new Date("2024-10-24T09:00:00"),
      description: "Routine check-up",
      color: "blue",
    },
    {
      id: 5,
      title: "Project Deadline",
      start: new Date("2024-10-24T10:00:00"),
      end: new Date("2024-10-24T11:00:00"),
      description: "Final project submission",
      color: "purple",
    },
    {
      id: 6,
      title: "Team Lunch",
      start: new Date("2024-10-26T10:00:00"),
      end: new Date("2024-10-26T11:00:00"),
      description: "Team bonding session",
      color: "orange",
    },
    
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<
    "month" | "week" | "day" | "agenda" | "year"
  >("day");

  const handleEventClick = (event: any) => {
    alert(`Event clicked: ${event.title}`);
  };

  const handleDateClick = (date: Date) => {
    alert(`Date clicked: ${date.toLocaleDateString()}`);
  };

  const handleViewChange = (
    view: "month" | "week" | "day" | "agenda" | "year"
  ) => {
    setViewType(view);
  };

  return (
    <>
      <MegaCalendar
        events={events}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        viewType={viewType}
        onViewChange={handleViewChange}
        minTime={2}
        maxTime={16}
        startDay={0}
        endDay={6}
        title="TimeTable"
        icon={<FaCalendar />}
      />
    </>
  );
};

export default Page;
