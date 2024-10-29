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

import React, { useState, useRef, useEffect } from "react";

// Utility function for month days and localized week days
const getMonthDays = (
  year: number,
  month: number,
  firstDayOfWeek: number = 0
) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedStartDay = (firstDayOfMonth - firstDayOfWeek + 7) % 7;
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = adjustedStartDay;
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = prevMonthDays; i > 0; i--) {
    days.push({
      date: new Date(year, month - 1, lastDateOfPrevMonth - i + 1),
      currentMonth: false,
    });
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true });
  }

  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ date: new Date(year, month + 1, i), currentMonth: false });
  }

  return days;
};

interface CalendarInputProps {
  locale?: string;
  firstDayOfWeek?: number;
  minDate?: Date;
  maxDate?: Date;
  selectionMode?: "single" | "range" | "multiple" | "year" | "month";
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: "12" | "24";
  showButtonBar?: boolean;
  placeholder: string;
  label?: string;
  floatingLabel?: boolean;
  hidePlaceholder?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  locale = "en-US",
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  selectionMode = "single",
  showTime,
  timeOnly,
  hourFormat = "24",
  showButtonBar,
  placeholder,
  label,
  floatingLabel,
  hidePlaceholder,
  disabled,
  size = "nm",
  className = "",
}) => {
  const [selectedDates, setSelectedDates] = useState<Date | Date[] | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, ampm: "AM" });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamic generation of day names based on locale
  const localizedDaysOfWeek = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(Date.UTC(2021, 5, i + firstDayOfWeek))
    )
  );

  const monthDays = getMonthDays(currentYear, currentMonth, firstDayOfWeek);

  // Enhanced handleDateClick to support range and multiple selections
  const handleDateClick = (date: Date) => {
    if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;

    if (selectionMode === "single") {
      setSelectedDates(date);
      setShowCalendar(false);
    } else if (selectionMode === "multiple") {
      setSelectedDates((prevDates) => {
        const newDates = Array.isArray(prevDates) ? [...prevDates] : [];
        const index = newDates.findIndex(
          (d) => d.toDateString() === date.toDateString()
        );
        if (index === -1) {
          newDates.push(date);
        } else {
          newDates.splice(index, 1);
        }
        return newDates;
      });
    } else if (selectionMode === "range") {
      setSelectedDates((prevDates) => {
        if (!Array.isArray(prevDates) || prevDates.length !== 2) {
          return [date];
        } else if (prevDates.length === 1) {
          return [prevDates[0], date].sort(
            (a, b) => a.getTime() - b.getTime()
          );
        }
        return [date];
      });
    }
  };

  const handleMonthChange = (newMonth: number) => setCurrentMonth(newMonth);
  const handleYearChange = (newYear: number) => setCurrentYear(newYear);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: parseInt(value) });
  };

  const handleToggleAMPM = () => {
    setTime((prevTime) => ({
      ...prevTime,
      ampm: prevTime.ampm === "AM" ? "PM" : "AM",
    }));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDates(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setShowCalendar(false);
  };

  const handleClear = () => {
    setSelectedDates(null);
    setShowCalendar(false);
  };

  const formatDateTime = () => {
    if (!selectedDates) return "";

    if (selectionMode === "year") {
      return `${(selectedDates as Date).getFullYear()}`;
    }

    if (selectionMode === "month") {
      return `${(selectedDates as Date).getMonth() + 1}/${(
        selectedDates as Date
      ).getFullYear()}`;
    }

    const datePart = Array.isArray(selectedDates)
      ? selectedDates.map((d) => d.toLocaleDateString(locale)).join(", ")
      : selectedDates?.toLocaleDateString(locale);

    if (!showTime) {
      return datePart;
    }

    // Formatting time if showTime is enabled
    const timePart = `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}`;

    if (hourFormat === "12") {
      return `${datePart} ${timePart} ${time.ampm}`;
    }

    return `${datePart} ${timePart}`;
  };

  // Function to format only time for display in the input field
  const formatTime = () => {
    if (!showTime) return "";

    const timePart = `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}`;

    if (hourFormat === "12") {
      return `${timePart} ${time.ampm}`;
    }

    return timePart;
  };

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative" ref={calendarRef}>
      {!floatingLabel && label && (
        <label className="block mb-1 text-deep dark:text-light text-left">
          {label}
        </label>
      )}
      <input
        type="text"
        value={timeOnly ? formatTime() : formatDateTime()}
        placeholder={timeOnly ? "Select Time" : "Select Date"}
        readOnly
        disabled={disabled}
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel
            ? "placeholder-transparent"
            : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      />
      {showCalendar && (
        <div className="absolute mt-1 bg-primary dark:bg-shade border-2 border-border dark:border-coal rounded-md shadow-lg z-10">
          <div className="flex justify-between p-2">
            <button
              onClick={() =>
                setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
              }
              className="text-xl"
            >
              &lt;
            </button>
            <div>
              <select
                value={currentMonth}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {new Intl.DateTimeFormat(locale, { month: "long" }).format(
                      new Date(currentYear, i)
                    )}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={currentYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="w-16 text-center border ml-2"
              />
            </div>
            <button
              onClick={() =>
                setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
              }
              className="text-xl"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {localizedDaysOfWeek.map((day, index) => (
              <div key={index} className="font-bold">
                {day}
              </div>
            ))}
            {monthDays.map(({ date, currentMonth }, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`${
                  currentMonth
                    ? "text-deep dark:text-light"
                    : "text-gray-400 dark:text-gray-600"
                } ${
                  Array.isArray(selectedDates) &&
                  selectedDates.some(
                    (d) => d.toDateString() === date.toDateString()
                  )
                    ? "bg-highlight text-light"
                    : ""
                } p-1 rounded-md hover:bg-hover dark:hover:bg-coal`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
          {showButtonBar && (
            <div className="flex justify-between p-2">
              <button onClick={handleToday} className="text-sm">
                Today
              </button>
              <button onClick={handleClear} className="text-sm">
                Clear
              </button>
            </div>
          )}
          {showTime && (
            <div className="flex items-center p-2">
              <input
                type="number"
                name="hours"
                value={time.hours}
                onChange={handleTimeChange}
                min={0}
                max={hourFormat === "24" ? 23 : 12}
                className="w-12 text-center border mx-1"
              />
              <span>:</span>
              <input
                type="number"
                name="minutes"
                value={time.minutes}
                onChange={handleTimeChange}
                min={0}
                max={59}
                className="w-12 text-center border mx-1"
              />
              {hourFormat === "12" && (
                <button onClick={handleToggleAMPM} className="ml-2">
                  {time.ampm}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarInput;














"use client";

import React, { useState, useRef, useEffect } from "react";

const getMonthDays = (year: number, month: number, firstDayOfWeek: number = 0) => {
  // ... same logic as before ...
};

interface CalendarInputProps {
  // ... existing props ...
  showCalendarByDefault?: boolean; // New prop to control default calendar visibility
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  // ... existing props ...
  showCalendarByDefault = true, // Default to showing calendar by default
}) => {
  const [selectedDates, setSelectedDates] = useState<Date | Date[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(showCalendarByDefault); // Set initial state based on prop
  const [time, setTime] = useState({ hours: 0, minutes: 0, ampm: "AM" });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateClick = (date: Date) => {
    // ... same logic as before ...
  };

  const handleMonthChange = (newMonth: number) => setCurrentMonth(newMonth);
  const handleYearChange = (newYear: number) => setCurrentYear(newYear);
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: parseInt(value) });
  };

  const handleToggleAMPM = () => {
    setTime((prevTime) => ({
      ...prevTime,
      ampm: prevTime.ampm === "AM" ? "PM" : "AM",
    }));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDates(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setShowCalendar(false);
  };

  const handleClear = () => {
    setSelectedDates(null);
    setShowCalendar(false);
  };

  const formatDateTime = () => {
    // ... same logic as before ...
  };

  const formatTime = () => {
    // ... same logic as before ...
  };

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className="relative" ref={calendarRef}>
      {/* Input */}
      <input
        type="text"
        value={timeOnly ? formatTime() : formatDateTime()}
        placeholder={timeOnly ? "Select Time" : "Select Date"}
        readOnly
        disabled={disabled}
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility on click
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel
            ? "placeholder-transparent"
            : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      />

      {/* Calendar UI */}
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-primary dark:bg-shade shadow-lg rounded p-4 z-10">
          {/* Calendar content */}
          {/* ... same logic as before ... */}
        </div>
      )}
    </div>
  );
};

export default CalendarInput;










const MyCalendarComponent = () => {
  const [showCalendar, setShowCalendar] = useState(false); // For toggling the calendar when using input
  const [defaultShow, setDefaultShow] = useState(false);   // Whether calendar is shown by default
  const calendarRef = useRef(null);

  // Function to handle clicks outside the calendar when not in 'default show' mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!calendarRef.current || calendarRef.current.contains(event.target as Node)) {
        return;
      }

      // Only hide the calendar if it’s NOT shown by default
      if (!defaultShow) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultShow]);

  return (
    <div>
      {/* Input field to toggle the calendar when `defaultShow` is false */}
      <input
        type="text"
        value={timeOnly ? formatTime() : formatDateTime()}
        placeholder={timeOnly ? "Select Time" : "Select Date"}
        readOnly
        disabled={disabled}
        onClick={() => {
          if (!defaultShow) {
            setShowCalendar((prev) => !prev);  // Toggle only if not using default show
          }
        }}
        className={`w-full border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean ${
          hidePlaceholder || floatingLabel
            ? "placeholder-transparent"
            : "placeholder-soft dark:placeholder-pale"
        } ${sizeClass} ${className} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      />

      {/* Calendar component */}
      {(defaultShow || showCalendar) && (
        <div ref={calendarRef}>
          {/* Render the calendar here */}
        </div>
      )}
    </div>
  );
};


const handleDateClick = (date: Date) => {
  if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;
  
  if (selectionMode === "single") {
    setSelectedDates(date);
    if (onDateChange) onDateChange(date); // Call the onDateChange prop
    if (!showCalendar) setShowCalendar(false);
  }
  // Handle other selection modes...
};


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
