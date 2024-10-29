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













import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEllipsisV,
  FaEye,
  FaTrash,
  FaPenSquare,
  FaPlusSquare,
  FaPrint,
  FaFilter,
  FaFileAlt,
  FaFilePdf,
} from "react-icons/fa";
import Paginator from "@/components/data/Paginator";
import Checkbox from "@/components/form/Checkbox";
import ConfirmDialog from "@/components/overlay/ConfirmDialog";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import Divider from "@/components/common/Divider";
import Tooltip from "@/components/common/Tooltip";
import Image from "next/image";
import { isImage, isFile } from "@/utils/fileHelpers";
import DialogDisplay from "@/components/overlay/DialogDisplay";

interface ColumnProps {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  editorType?: "input" | "select";
  options?: { label: string; value: any }[];
  editable?: boolean;
}

interface SortMeta {
  field: string;
  order: number;
}

interface TableViewProps<T extends Record<string, any>> {
  value: T[] | null;
  title: string;
  icon: React.ReactNode;
  loading?: boolean;
  errorMessage?: string;
  stripedRows?: boolean;
  showGridlines?: boolean;
  className?: string;
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  sortMode?: "single" | "multiple";
  removableSort?: boolean;
  selectionMode?: "single" | "multiple";
  children: React.ReactNode;
  globalFilterFields?: string[];
  showActions?: boolean;
  useEllipsis?: boolean;
  editable?: boolean;
  print?: boolean;
  customActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
  }[];
  onRowUpdate?: (updatedRow: T, rowIndex: number) => void;
  onSelectionChange?: (selection: T[]) => void;
  onDelete?: (item: T) => void;
  onDeleteAll?: (selectedRows: T[]) => void;
  onAddRow?: () => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
}

export const Column: React.FC<ColumnProps> = () => null;

export const TableView = <T extends Record<string, any>>({
  value,
  title,
  icon,
  loading,
  errorMessage = "No data available",
  stripedRows,
  showGridlines,
  className = "",
  paginator,
  rows = 10,
  rowsPerPageOptions = [5, 10, 25],
  sortMode = "single",
  removableSort,
  selectionMode,
  showActions,
  useEllipsis = false,
  children,
  globalFilterFields,
  customActions,
  print,
  onSelectionChange,
  onRowUpdate,
  onAddRow,
  onDelete,
  onDeleteAll,
  onEdit,
  onView,
}: TableViewProps<T>) => {
  const contentRef = useRef<HTMLTableElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isLoading, setIsLoading] = useState(loading);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [sortMeta, setSortMeta] = useState<SortMeta | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [initialValue, setInitialValue] = useState<any>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const editingRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const [showConfirmAction, setShowConfirmAction] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [pendingAction, setPendingAction] = useState<() => void>(
    () => () => {}
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState<React.ReactNode>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (rowIndex: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [rowIndex]: !prevStates[rowIndex], // Toggle the dropdown for the clicked row
    }));
  };

  // Handle outside click to close the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElements = document.querySelectorAll(".dropdown-menu");
    let clickedInside = false;

    dropdownElements.forEach((dropdownElement) => {
      if (dropdownElement.contains(event.target as Node)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      setDropdownStates({});
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Extract columns from children
  const columns = React.Children.toArray(children).filter(
    (child: any) => child.type === Column
  );

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <table
          className={`w-full border-collapse border-border dark:border-coal ${
            showGridlines ? "table-fixed border-2" : " border-b border-t"
          }`}
        >
          <thead>
            <tr>
              {columns.map((col: any, colIndex: number) => (
                <th
                  key={colIndex}
                  className={`p-2 border-collapse border-border dark:border-coal ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  {col.props.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  stripedRows && rowIndex % 2 === 1
                    ? "bg-secondary dark:bg-dim"
                    : ""
                }
              >
                {columns.map((col: any, colIndex: number) => (
                  <td
                    key={colIndex}
                    className={`p-2 border-collapse border-border dark:border-coal ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    <div>
                      <SkeletonLoader className="p-5 rounded-2xl" />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!value || value.length === 0) {
    return <div className={`${className}`}>{errorMessage}</div>;
  }

  const handleAddRow = onAddRow
    ? onAddRow
    : () => console.log("No onAddRow handler defined");

  const handleConfirm = () => {
    pendingAction();
    setEditingCell(null);
    setShowConfirmAction(false);
  };

  const confirmAction = (action: () => void) => {
    setPendingAction(() => action);
    setShowConfirmAction(true);
  };

  // Handler for deleting an item (calls external or default delete logic)
  const handleDelete = (item: T) => {
    confirmAction(() => {
      if (onDelete) {
        onDelete(item);
      } else {
        const newValue = value.filter((row) => row !== item);
        onSelectionChange && onSelectionChange(newValue);
      }
    });
  };

  const handleEdit = (item: T) => {
    confirmAction(() => onEdit && onEdit(item));
  };

  const handleView = (item: T) => {
    if (onView) {
      onView(item);
    } else {
      console.log("No onView handler defined for item:", item);
    }
  };

  const handleSort = (field: string) => {
    let order = 1;
    if (sortMode === "single") {
      if (sortMeta && sortMeta.field === field) {
        if (sortMeta.order === 1 && removableSort) {
          setSortMeta(null);
          return;
        }
        order = sortMeta.order * -1;
      }
      setSortMeta({ field, order });
    }
  };

  // Apply global filtering to data based on globalFilterFields
  const applyGlobalFilter = (data: T[]) => {
    if (!globalFilter || !globalFilterFields || globalFilterFields.length === 0)
      return data;

    return data.filter((item) =>
      globalFilterFields.some((field) =>
        String((item as Record<string, any>)[field]) // type cast here
          ?.toLowerCase()
          .includes(globalFilter.toLowerCase())
      )
    );
  };

  // Apply column-specific filters to data
  const applyColumnFilters = (data: T[]) => {
    return data.filter((item) =>
      Object.keys(filterValues).every((key) => {
        const value = filterValues[key];
        if (!value) return true; // If no filter, include all
        return String((item as Record<string, any>)[key]) // type cast here
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  // Filter, sort, and paginate the value
  const sortedValue = applyGlobalFilter(value).sort((a, b) => {
    if (!sortMeta) return 0;
    const { field, order } = sortMeta;

    const aField = (a as Record<string, any>)[field]; // type cast here
    const bField = (b as Record<string, any>)[field]; // type cast here

    if (aField > bField) return order;
    if (aField < bField) return -order;
    return 0;
  });

  const filteredValue = applyColumnFilters(sortedValue);
  const paginatedValue = filteredValue.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Check if all rows are selected
  const isAllSelected =
    paginatedValue.length > 0 && selectedRows.length === paginatedValue.length;

  // Handler for selecting all rows
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    } else {
      setSelectedRows(paginatedValue);
      onSelectionChange && onSelectionChange(paginatedValue);
    }
  };

  // Handler for toggling row selection
  const toggleRowSelection = (item: T) => {
    const itemIdentifier = (item as any).code;
    const newSelectedRows = selectedRows.some(
      (row) => (row as any).code === itemIdentifier
    )
      ? selectedRows.filter((row) => (row as any).code !== itemIdentifier)
      : [...selectedRows, item];

    setSelectedRows(newSelectedRows);
    onSelectionChange && onSelectionChange(newSelectedRows);
  };

  // Render the sort icon based on current sort state
  const renderSortIcon = (col: ColumnProps) => {
    if (sortMeta && sortMeta.field === col.field) {
      const order = sortMeta.order;
      if (order === 1) return <FaSortUp className="ml-1 inline-block" />;
      if (order === -1) return <FaSortDown className="ml-1 inline-block" />;
    }
    return <FaSort className="ml-1 inline-block" />;
  };

  // Handler for filter changes (updates the filter state)
  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  };

  // Double-click handler for entering edit mode
  const handleDoubleClick = (rowIndex: number, field: string, value: any) => {
    setEditingCell({ row: rowIndex, field });
    setEditValue(value);
    setInitialValue(value);
    setHasChanges(false);
  };

  // Handler for blur (when the cell loses focus, show confirmation dialog if there are changes)
  const handleBlur = () => {
    if (!editingCell) return;

    if (hasChanges) {
      confirmAction(saveChanges);
    } else {
      setEditingCell(null);
    }
  };

  // Keydown handler (triggers blur on Enter key)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  // Handler for change events in inputs/selects
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditValue(event.target.value);
    if (event.target.value !== initialValue) {
      setHasChanges(true);
      setShowConfirm(true);
    }
  };

  const saveChanges = () => {
    if (!editingCell) return;
    const { row, field } = editingCell;
    const updatedRow = { ...paginatedValue[row], [field]: editValue };
    onRowUpdate && onRowUpdate(updatedRow, row);
    setEditingCell(null);
    setShowConfirm(false);
  };

  const renderEditor = (col: ColumnProps, item: T, rowIndex: number) => {
    if (
      col.editable &&
      editingCell?.row === rowIndex &&
      editingCell.field === col.field
    ) {
      if (col.editorType === "select" && col.options) {
        return (
          <select
            ref={selectRef}
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Choose an option"
            className="w-80 p-1 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean max-w-fit"
          >
            {col.options.map((option) => (
              <option
                className="cursor-pointer w-80 border-border dark:border-coal border-2"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      } else if (col.editorType === "input") {
        return (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="p-1 border-2 w-80 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean max-w-fit"
          />
        );
      }
    }
  };

  // Function to open the dialog with file preview
  const handlePreviewFile = (item: T, field: string) => {
    const fileValue = (item as any)[field];
    setCurrentFile(fileValue);

    if (isImage(fileValue)) {
      setPreviewContent(
        <div className="text-center">
          <Image
            src={fileValue}
            alt="Preview"
            width={200}
            height={200}
            className="object-contain rounded-lg cursor-pointer"
          />
        </div>
      );
    } else if (isFile(fileValue)) {
      if (/\.pdf$/i.test(fileValue)) {
        setPreviewContent(
          <div className="text-center">
            <a href={fileValue} target="_blank" rel="noopener noreferrer">
              <FaFilePdf className="text-red-500 text-6xl" />
              <p className="mt-2 text-lg">View PDF</p>
            </a>
          </div>
        );
      } else {
        setPreviewContent(
          <div className="text-center">
            <a href={fileValue} target="_blank" rel="noopener noreferrer">
              <FaFileAlt className="text-gray-500 text-6xl" />
              <p className="mt-2 text-lg">Download File</p>
            </a>
          </div>
        );
      }
    }
    setDialogVisible(true);
  };

  return (
    <div className={`${className}`}>
      {/* Global Filter Input */}
      <div className="flex items-center justify-between gap-5 mb-5 min-w-full overflow-auto p-2 bg-tertiary dark:bg-shadow rounded-xl shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex whitespace-nowrap items-center justify-between gap-2 text-lg md:text-xl font-semibold text-deep dark:text-light">
            {icon && <span>{icon}</span>}
            <h2>{title}</h2>
            <Divider layout="vertical" type="solid" className="mx-2" />
          </div>
          {globalFilterFields ? (
            <div className="relative  hidden md:inline-flex items-center">
              <FaFilter className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Global Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 p-2 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-lg cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
              />
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 ml-auto">
          {/* Delete All Selected Rows Button */}
          {selectionMode === "multiple" && selectedRows.length > 0 && (
            <button
              type="button"
              className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all ease-linear duration-200"
              onClick={() => handleDeleteAll(selectedRows)}
            >
              <Tooltip
                content="Delete all"
                position="left"
                className="block md:hidden"
              >
                <FaTrash className="" />
              </Tooltip>
              <span className="hidden lg:inline-flex">Delete All</span>
            </button>
          )}

          {/* Add New Row Button */}
          <button
            type="button"
            className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all ease-linear duration-200 "
            onClick={handleAddRow}
          >
            <Tooltip content="Add" position="left" className="block md:hidden">
              <FaPlusSquare />
            </Tooltip>
            <span className="hidden lg:inline-flex">Add New Row</span>
          </button>

          {/* Print Button (Conditionally render when print is true) */}
          {print && (
            <button
              type="button"
              className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-all ease-linear duration-200 "
              onClick={reactToPrintFn}
            >
              <Tooltip
                content="Print"
                position="left"
                className="block md:hidden"
              >
                <FaPrint />
              </Tooltip>
              <span className="hidden lg:inline-flex">Print Table</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={`relative overflow-x-auto pb-32`}>
        <table
          ref={contentRef}
          className={`min-w-full table-auto border-collapse border-border dark:border-coal ${
            showGridlines ? "table-fixed border-2" : "border-b border-t"
          }`}
        >
          <thead>
            <tr>
              {selectionMode === "multiple" && (
                <th
                  className={`p-2 w-10 border-collapse border-border dark:border-coal ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                  aria-label="Select All"
                >
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                  <span className="sr-only">Select all</span>
                </th>
              )}
              {columns.map((col: any, colIndex: number) => (
                <th
                  key={colIndex}
                  className={`p-2 min-w-fit max-w-fit border-collapse border-border dark:border-coal text-deep dark:text-light ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center">
                      {col.props.header}
                      {col.props.sortable && (
                        <span
                          className="cursor-pointer whitespace-nowrap text-deep dark:text-light"
                          onClick={() => handleSort(col.props.field)}
                        >
                          {renderSortIcon(col.props)}
                        </span>
                      )}
                    </div>
                    {col.props.filterable && (
                      <div className="relative inline-flex items-center">
                        <input
                          aria-label="text"
                          type="text"
                          value={filterValues[col.props.field] || ""}
                          onChange={(e) =>
                            handleFilterChange(col.props.field, e.target.value)
                          }
                          className="pr-5 p-1 border-2 max-w-52 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                        />
                        <FaFilter className="absolute right-3 text-gray-500" />
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {/* New "Action" header */}
              {showActions && (
                <th
                  className={`p-2 text-right min-w-[100px] max-w-[100px] w-[100px] border-collapse border-border dark:border-coal text-deep dark:text-light ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedValue.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  stripedRows && rowIndex % 2 === 1
                    ? "bg-secondary dark:bg-dim"
                    : ""
                }
              >
                {selectionMode === "multiple" && (
                  <td
                    className={`p-2 w-10 border-collapse border-border dark:border-coal ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    <Checkbox
                      checked={selectedRows.some(
                        (row) => (row as any).code === (item as any).code
                      )}
                      onChange={() => toggleRowSelection(item)}
                    />
                  </td>
                )}
                {columns.map((col: any, colIndex: number) => (
                  <td
                    key={colIndex}
                    className={`p-2 w-80 whitespace-nowrap border-collapse border-border dark:border-coal text-deep dark:text-light ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                    onDoubleClick={() =>
                      col.props.editable &&
                      handleDoubleClick(
                        rowIndex,
                        col.props.field,
                        item[col.props.field]
                      )
                    }
                  >
                    {renderEditor(col.props, item, rowIndex)}
                  </td>
                ))}

                {/* Action Buttons Column*/}
                {showActions && (
                  <td
                    className={`p-2 border-collapse border-border dark:border-coal w-fit ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    {useEllipsis ? (
                      <div className="relative cursor-pointer max-w-fit ml-auto">
                        <FaEllipsisV
                          onClick={() => handleDropdownToggle(rowIndex)}
                          className=" text-deep dark:text-light"
                        />
                        {dropdownStates[rowIndex] && (
                          <div className="absolute right-0 top-full z-50 flex flex-col items-start  gap-1 bg-primary dark:bg-shade border border-border dark:border-coal rounded-xl shadow p-2 dropdown-menu">
                            <button
                              type="button"
                              onClick={() => handleView(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              <FaEye className="text-sm text-deep dark:text-light group-hover:text-highlight dark:group-hover:text-ocean" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              <FaPenSquare className="text-sm text-deep dark:text-light group-hover:text-gold dark:group-hover:text-accent" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              <FaTrash className="text-sm text-deep dark:text-light group-hover:text-alert dark:group-hover:text-crimson" />
                              Delete
                            </button>
                            {customActions?.map((action, index) => (
                              <button
                                type="button"
                                key={index}
                                onClick={() => action.onClick(item)}
                                className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                              >
                                {action.icon && (
                                  <span className="text-deep dark:text-light group-hover:text-black dark:group-hover:text-white">
                                    {action.icon}
                                  </span>
                                )}
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <Tooltip content="View" position="top" mouseTrack>
                          <button
                            type="button"
                            aria-label="View-Row"
                            onClick={() => handleView(item)}
                            className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                          >
                            <FaEye className="text-deep dark:text-light group-hover:text-highlight dark:group-hover:text-ocean" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Edit" position="top" mouseTrack>
                          <button
                            aria-label="Edit-Row"
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                          >
                            <FaPenSquare className="text-deep dark:text-light group-hover:text-gold dark:group-hover:text-accent" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Delete" position="top" mouseTrack>
                          <button
                            aria-label="Delete-row"
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                          >
                            <FaTrash className="text-deep dark:text-light group-hover:text-alert dark:group-hover:text-crimson" />
                          </button>
                        </Tooltip>
                        {customActions?.map((action, index) => (
                          <Tooltip
                            key={index}
                            content="Custom Action"
                            position="top"
                            mouseTrack
                          >
                            <button
                              type="button"
                              onClick={() => action.onClick(item)}
                              className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                            >
                              {action.icon && (
                                <span className="text-deep dark:text-light group-hover:text-black dark:group-hover:text-white">
                                  {action.icon}
                                </span>
                              )}
                              <span className="hidden">{action.label}</span>
                            </button>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginator */}
      {paginator && (
        <Paginator
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRecords={filteredValue.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}

      <DialogDisplay
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header="File Preview"
      >
        {previewContent}
      </DialogDisplay>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        visible={showConfirmAction}
        message="Are you sure you want to proceed?"
        position="top"
        onAccept={handleConfirm}
        onReject={() => setShowConfirmAction(false)}
        onHide={() => setShowConfirmAction(false)}
      />
    </div>
  );
};


// "use client";

// import React, { useState } from "react";
// import { TableView, Column } from "@/components/data/TableView";
// import Image from "next/image";
// import { FaInfoCircle, FaCheck } from "react-icons/fa";

// const Page = () => {
//     const [products, setProducts] = useState([
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//       { code: "P001", name: "Announcement", category: "Category A", quantity: 10, image: "/images/student.png" },
//     ]);
  
//     const [selectedProducts, setSelectedProducts] = useState([]);

//     const handleSelectionChange = (selection) => {
//         setSelectedProducts(selection);
//     };

//     const handleRowUpdate = (updatedRow, rowIndex) => {
//         const updatedProducts = [...products];
//         updatedProducts[rowIndex] = updatedRow;
//         setProducts(updatedProducts);
//     };

//     const handleView = (item) => {
//         alert(`Viewing Product:\nCode: ${item.code}\nName: ${item.name}\nCategory: ${item.category}\nQuantity: ${item.quantity}`);
//     };

//     return (
//         <div className="p-4">
//             <TableView
//                 value={products}
//                 title="Data Table"
//                 icon={<FaCheck />}
//                 stripedRows
//                 paginator
//                 showGridlines
//                 rows={5}
//                 selectionMode="multiple"
//                 onSelectionChange={handleSelectionChange}
//                 onRowUpdate={handleRowUpdate}
//                 rowsPerPageOptions={[5, 10, 25]}
//                 sortMode="single"
//                 globalFilterFields={["code", "name", "category", "quantity"]}
//                 print
//                 onAddRow={() => console.log("Add new row")}
//                 onEdit={(item) => console.log("Edit", item)}
//                 onDeleteAll={() => console.log("Delete all rows")}
//                 onDelete={(item) => console.log("Delete", item)}
//                 onView={handleView}
//                 showActions
//                 className="p-3 shadow bg-secondary dark:bg-dim border-2 border-border dark:border-coal rounded-2xl"
//             >
//                 {/* Column for displaying images */}
//                 <Column
//                     field="image"
//                     header="Image"
//                     body={(rowData) => (
//                         <div className="relative h-16 w-16">
//                             <Image
//                                 src={rowData.image}
//                                 alt={rowData.name}
//                                 fill
//                                 quality={75}
//                                 placeholder="blur"
//                                 blurDataURL="/avatar.png"
//                                 className="object-cover"
//                             />
//                         </div>
//                     )}
//                 />

                // <Column field="code" header="Code" sortable filterable editorType="input" />
                // <Column field="name" header="Name" sortable editable editorType="input" />
//                 <Column
//                     field="category"
//                     header="Category"
//                     filterable
//                     editable
//                     editorType="select"
//                     options={[
//                         { value: "Category A", label: "Category A" },
//                         { value: "Category B", label: "Category B" },
//                         { value: "Category C", label: "Category C" },
//                     ]}
//                 />
//                 <Column field="quantity" header="Quantity" sortable editable editorType="input" />
//             </TableView>

//             <div className="mt-4">
//                 <h2 className="text-lg font-semibold">Selected Products:</h2>
//                 <ul className="list-disc pl-5">
//                     {selectedProducts.length > 0 ? (
//                         selectedProducts.map((product, index) => (
//                             <li key={`${product.code}-${index}`}>
//                                 {product.name} (Code: {product.code}, Quantity: {product.quantity})
//                             </li>
//                         ))
//                     ) : (
//                         <li>No products selected</li>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Page;


import React, { ReactNode, useState, useEffect } from "react";
import TableToolbar from "@/components/data/TableToolbar";  // Import the new component

interface ColumnProps<T> {
  field: keyof T;
  header: string;
  template?: (rowData: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  selectionMode?: "single" | "multiple";
}

const TableCol = (): null => null;

interface TableViewProps<T> {
  icon?: React.ReactNode;
  title: string;
  value: T[];
  size?: "sm" | "nm" | "lg";
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPageOptions?: number[];
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  loadingDelay?: number;
  removableSort?: boolean;
  globalFilterFields?: (keyof T)[];
  globalFilter?: string;  // Added for global filter
  setGlobalFilter?: (value: string) => void;  // Added for global filter setter
  selectionMode?: "single" | "multiple";
  selectionPageOnly?: boolean;
  selectedRowsCount?: number;  // Added to track selected rows count
  onRowSelect?: (row: T) => void;
  onRowUnselect?: (row: T) => void;
  onCellSelect?: (row: T, field: keyof T) => void;
  onCellUnselect?: (row: T, field: keyof T) => void;
  hoverEffect?: "row" | "cell";
  onDeleteAll?: () => void;  // Added for delete action
  onAddRow?: () => void;  // Added for add action
  onPrint?: () => void;  // Added for print action
  showPrintButton?: boolean;  // Added for print button toggle
}

const TableView = function <T>({
  icon,
  title,
  value,
  size = "nm",
  showGridlines = false,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 20],
  className = "",
  isLoading = false,
  loadingDelay = 3000,
  removableSort = false,
  globalFilterFields = [],
  globalFilter = "",
  setGlobalFilter,
  selectionMode,
  selectionPageOnly = false,
  selectedRowsCount = 0,  // Default value added
  onRowSelect,
  onRowUnselect,
  onCellSelect,
  onCellUnselect,
  hoverEffect = "row",
  onDeleteAll,
  onAddRow,
  onPrint,
  showPrintButton = false,  // Default value added
}: TableViewProps<T>) {
  // Component logic

  return (
    <div className={className}>
      <TableToolbar
        icon={icon}
        title={title}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter!}
        globalFilterFields={globalFilterFields.length > 0}
        selectionMode={selectionMode}
        selectedRowsCount={selectedRowsCount}
        onDeleteAll={onDeleteAll!}
        onAddRow={onAddRow!}
        onPrint={onPrint!}
        showPrintButton={showPrintButton}
      />

      {/* Render table content or loading state */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Render the actual table rows and cells */}
        </>
      )}
    </div>
  );
};

export { TableView, TableCol };






import React, { useState, useEffect, ReactNode } from "react";
import { FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";
import Paginator from "@/components/data/Paginator";
import LoadingTableSkeleton from "@/components/data/tableview/LoadingTableSkeleton";
import Checkbox from "@/components/form/Checkbox";
import TableToolbar from "@/components/data/tableview/TableToolbar";
import TableCellEditor from "@/components/data/tableview/TableCellEditor";

interface ColumnProps<T, V = string | number | boolean> {
  field: keyof T;
  header: string;
  template?: (rowData: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  selectionMode?: "single" | "multiple";
  editable?: boolean;
  editorType?: "input" | "select";
  options?: { label: string; value: V }[];
}

const TableCol = (): null => null;

interface TableViewProps<T> {
  icon?: React.ReactNode;
  title: string;
  value: T[];
  size?: "sm" | "nm" | "lg";
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPageOptions?: number[];
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  loadingDelay?: number;
  removableSort?: boolean;
  globalFilterFields?: (keyof T)[];
  selectionMode?: "single" | "multiple";
  hoverEffect?: "row" | "cell";
  showPrintButton?: boolean;
  columnOptions?: boolean;
  onRowSelect?: (row: T) => void;
  onRowUnselect?: (row: T) => void;
  onCellSelect?: (row: T, field: keyof T) => void;
  onCellUnselect?: (row: T, field: keyof T) => void;
  onDeleteAll?: () => void;
  onAddRow?: () => void;
  onPrint?: () => void;
}

const TableView = function <T>({
  icon,
  title,
  value,
  size = "nm",
  showGridlines = false,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 20],
  children,
  className = "",
  isLoading = false,
  loadingDelay = 3000,
  removableSort = false,
  globalFilterFields = [],
  selectionMode,
  hoverEffect = "row",
  showPrintButton = false,
  columnOptions = false,
  onRowSelect,
  onRowUnselect,
  onCellSelect,
  onCellUnselect,
  onDeleteAll,
  onAddRow,
  onPrint,
}: TableViewProps<T>) {
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(isLoading);
  const [sortedData, setSortedData] = useState(value);
  const [currentSortField, setCurrentSortField] = useState<keyof T | null>(null);
  const [currentSortOrder, setCurrentSortOrder] = useState<1 | -1 | 0>(0);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filterValues, setFilterValues] = useState<Partial<Record<keyof T, string>>>({});
  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set<T>());
  const [selectedCells, setSelectedCells] = useState<Map<T, Set<keyof T>>>(new Map());
  const [editingCell, setEditingCell] = useState<{row: number; field: keyof T; } | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoadingSkeleton(false), loadingDelay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDelay]);

  const columns: ColumnProps<T>[] = React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement(child) && child.type === TableCol) {
        return child.props as ColumnProps<T>;
      }
      return null;
    })
    .filter((col): col is ColumnProps<T> => col !== null);

    const [visibleColumns, setVisibleColumns] = useState<ColumnProps<T>[]>(columns);

  useEffect(() => {
    const updatedColumns = React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement(child) && child.type === TableCol) {
          return child.props as ColumnProps<T>;
        }
        return null;
      })
      .filter((col): col is ColumnProps<T> => col !== null);

    setVisibleColumns(updatedColumns);
  }, [children]);

  const availableColumns = columns;

  const handleColumnSelectionChange = (selectedFields: (keyof T)[]) => {
    if (selectedFields) {
      const selectedColumns = selectedFields.map((field) => String(field));
      setVisibleColumns(
        columns.filter((col) => selectedColumns.includes(String(col.field)))
      );
    } else {
      setVisibleColumns(columns);
    }
  };

  const totalRecords = sortedData.length;
  const paginatedData = sortedData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  useEffect(() => {
    let filteredData = [...value];

    if (globalFilter && globalFilterFields.length > 0) {
      filteredData = filteredData.filter((item) =>
        globalFilterFields.some((field) =>
          String(item[field]).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    Object.keys(filterValues).forEach((field) => {
      const filterValue = filterValues[field as keyof T];
      if (filterValue) {
        filteredData = filteredData.filter((item) =>
          String(item[field as keyof T])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    });

    let sorted = filteredData;
    if (currentSortField) {
      sorted = [...filteredData].sort((a, b) => {
        if (currentSortOrder === 1) {
          return String(a[currentSortField]).localeCompare(
            String(b[currentSortField])
          );
        } else if (currentSortOrder === -1) {
          return String(b[currentSortField]).localeCompare(
            String(a[currentSortField])
          );
        }
        return 0;
      });
    }

    setSortedData(sorted);
  }, [
    value,
    globalFilter,
    filterValues,
    currentSortField,
    currentSortOrder,
    globalFilterFields,
  ]);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= Math.ceil(totalRecords / rowsPerPage)) return;
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const handleSort = (field: keyof T) => {
    if (currentSortField === field) {
      const newSortOrder = currentSortOrder === 1 ? -1 : currentSortOrder === -1 ? 0 : 1;
      setCurrentSortOrder(newSortOrder);
      if (newSortOrder === 0 && removableSort) {
        setCurrentSortField(null);
      }
    } else {
      setCurrentSortField(field);
      setCurrentSortOrder(1);
    }
  };

  const handleFilterChange = (field: keyof T, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRowSelect = (row: T) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(row)) {
        newSelectedRows.delete(row);
        onRowUnselect?.(row);
      } else {
        newSelectedRows.add(row);
        onRowSelect?.(row);
      }
      return newSelectedRows;
    });
  };

  const handleCellSelect = (row: T, field: keyof T, event: React.MouseEvent) => {
    if (selectionMode === "single") {
      const isSelected = selectedCells.has(row) && selectedCells.get(row)?.has(field);
      setSelectedCells(new Map([[row, new Set(isSelected ? [] : [field])]]));

      if (isSelected) {
        onCellUnselect?.(row, field);
      } else {
        onCellSelect?.(row, field);
      }
    } else if (selectionMode === "multiple") {
      const isSelected = selectedCells.has(row) && selectedCells.get(row)?.has(field);
      if (event.shiftKey) {
        setSelectedCells((prevSelectedCells) => {
          const newMap = new Map(prevSelectedCells);
          const updatedCells = new Set(newMap.get(row) ?? []);
          if (isSelected) {
            updatedCells.delete(field);
          } else {
            updatedCells.add(field);
          }
          if (updatedCells.size > 0) {
            newMap.set(row, updatedCells);
          } else {
            newMap.delete(row);
          }
          return newMap;
        });
      } else {
        const updatedCells = new Set<keyof T>(isSelected ? [] : [field]);
        setSelectedCells(new Map([[row, updatedCells]]));

        if (isSelected) {
          onCellUnselect?.(row, field);
        } else {
          onCellSelect?.(row, field);
        }
      }
    }
  };

  const handleEditCell = (row: number, field: keyof T) => {
    const rowData = paginatedData[row];
    const cellValue = rowData[field];
    setEditingCell({ row, field });
    setEditValue(cellValue as string);
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleSaveEdit = (row: number, field: keyof T) => {
    const updatedData = [...sortedData];
    const rowIndex = currentPage * rowsPerPage + row;
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [field]: editValue,
    };
    setSortedData(updatedData);
    setEditingCell(null);
    setEditValue("");
  };

  const applyEditValue = (rowIndex: number, field: keyof T, value: string) => {
    const updatedData = [...sortedData];
    const row = currentPage * rowsPerPage + rowIndex;
    updatedData[row] = {
      ...updatedData[row],
      [field]: value,
    };
    setSortedData(updatedData);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <TableToolbar
        icon={icon}
        title={title}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        availableColumns={availableColumns.map((col) => ({
          field: col.field,
          header: col.header,
        }))}
        selectedColumns={visibleColumns.map((col) => col.field)}
        onColumnSelectionChange={handleColumnSelectionChange}
        showPrintButton={showPrintButton}
        onPrint={onPrint}
      />
      <div className="overflow-x-auto flex-grow">
        <table
          className={`min-w-full border-collapse ${
            showGridlines ? "table-fixed" : ""
          }`}
        >
          <thead>
            <tr>
              {selectionMode === "multiple" && (
                <th className="px-4 py-2">
                  <Checkbox
                    checked={selectedRows.size === value.length}
                    indeterminate={
                      selectedRows.size > 0 &&
                      selectedRows.size < value.length
                    }
                    onChange={(e) => {
                      const allSelected = e.target.checked;
                      setSelectedRows(
                        allSelected ? new Set(value) : new Set<T>()
                      );
                    }}
                  />
                </th>
              )}
              {visibleColumns.map((col) => (
                <th
                  key={String(col.field)}
                  className={`px-4 py-2 border-b ${sizeClass} ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => col.sortable && handleSort(col.field)}
                >
                  <div className="flex items-center">
                    {col.header}
                    {col.sortable && (
                      <span className="ml-2">
                        {currentSortField === col.field ? (
                          currentSortOrder === 1 ? (
                            <FaSortUp />
                          ) : currentSortOrder === -1 ? (
                            <FaSortDown />
                          ) : (
                            <FaSort />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    )}
                    {col.filterable && (
                      <div className="ml-2">
                        <FaFilter />
                        <input
                          type="text"
                          value={filterValues[col.field] || ""}
                          onChange={(e) =>
                            handleFilterChange(col.field, e.target.value)
                          }
                          className="ml-2 px-2 py-1 text-sm border rounded"
                          placeholder={`Filter ${col.header}`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showLoadingSkeleton && <LoadingTableSkeleton />}
            {!showLoadingSkeleton &&
              paginatedData.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    stripedRows && rowIndex % 2 === 0 ? "bg-gray-100" : ""
                  } ${hoverEffect === "row" ? "hover:bg-gray-200" : ""}`}
                >
                  {selectionMode === "multiple" && (
                    <td className="px-4 py-2 border-b">
                      <Checkbox
                        checked={selectedRows.has(rowData)}
                        onChange={() => handleRowSelect(rowData)}
                      />
                    </td>
                  )}
                  {visibleColumns.map((col) => (
                    <td
                      key={String(col.field)}
                      className={`px-4 py-2 border-b ${sizeClass} ${
                        hoverEffect === "cell" ? "hover:bg-gray-200" : ""
                      }`}
                      onClick={(e) =>
                        handleCellSelect(rowData, col.field, e)
                      }
                    >
                      {editingCell &&
                      editingCell.row === rowIndex &&
                      editingCell.field === col.field &&
                      col.editable ? (
                        renderEditor(col, rowData, rowIndex)
                      ) : col.template ? (
                        col.template(rowData)
                      ) : (
                        <span
                          onDoubleClick={() =>
                            col.editable && handleEditCell(rowIndex, col.field)
                          }
                        >
                          {rowData[col.field]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginator
        totalRecords={totalRecords}
        rowsPerPageOptions={rowsPerPageOptions}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

TableView.Col = TableCol;
export default TableView;







import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

type Option = {
  label: string;
  value: string | number;
};

type SelectDropdownProps = {
  options: Option[];
  label?: string;
  placeholder?: string;
  floatingLabel?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  size?: "sm" | "nm" | "lg";
  className?: string;
  value?: string[] | string;
  onChange?: (selected: string[] | string) => void;
  onBlur?: () => void; 
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  label,
  placeholder = "Select...",
  floatingLabel,
  multiple,
  disabled,
  size = "nm",
  className = "",
  value,
  onChange,
  onBlur,
}) => {
  const [internalValue, setInternalValue] = useState<string[] | string>(
    multiple ? (Array.isArray(value) ? value : []) : typeof value === "string" ? value : ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      if (onBlur) onBlur();
    }
  }, [onBlur]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const updatedValue = Array.isArray(internalValue)
        ? internalValue.includes(optionValue)
          ? internalValue.filter((v) => v !== optionValue)
          : [...internalValue, optionValue]
        : optionValue;
      setInternalValue(updatedValue);
      if (onChange) onChange(updatedValue);
    } else {
      setInternalValue(optionValue);
      if (onChange) onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const isSelected = (optionValue: string) =>
    multiple
      ? Array.isArray(internalValue) && internalValue.includes(optionValue)
      : internalValue === optionValue;

  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {floatingLabel && (
        <label
          className={`absolute left-2 transition-all duration-200 text-soft dark:text-pale cursor-text ${
            internalValue
              ? "-top-2 text-xs bg-primary dark:bg-shade px-2 rounded"
              : "top-2 text-base"
          }`}
        >
          {label}
        </label>
      )}

      <div
        onClick={handleToggleDropdown}
        className={`w-full border-2 relative border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-pointer focus:outline-none focus:border-highlight dark:focus:border-ocean ${sizeClass} ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
      >
        <span className={`block truncate ${internalValue ? "" : "text-soft dark:text-pale"}`}>
          {multiple
            ? Array.isArray(internalValue) && internalValue.length > 0
              ? internalValue
                  .map((v) => options.find((o) => o.value === v)?.label)
                  .join(", ")
              : placeholder
            : options.find((o) => o.value === internalValue)?.label || placeholder}
        </span>
        <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200`}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`fixed z-50 w-full max-h-60 overflow-y-auto mt-2 bg-primary dark:bg-shade border border-border dark:border-coal rounded-md shadow-lg`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value as string)}
              className={`cursor-pointer p-2 flex justify-between items-center hover:bg-highlight/50 dark:hover:bg-ocean/50 ${
                isSelected(option.value as string)
                  ? "bg-highlight dark:bg-ocean text-white"
                  : "text-deep dark:text-light"
              }`}
            >
              <span>{option.label}</span>
              {isSelected(option.value as string) && <FaCheck />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;



