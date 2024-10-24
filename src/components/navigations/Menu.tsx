"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

interface MenuItem {
  label?: string;
  icon?: JSX.Element;
  link?: string;
}

interface MenuProps {
  trigger: JSX.Element;
  items: (MenuItem | ReactNode)[];
}

const Menu: React.FC<MenuProps> = ({ trigger, items }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    console.log("Item clicked:", item);
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={toggleDropdown}>{trigger}</div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-10 right-0 mt-2 w-fit p-2 bg-primary dark:bg-shade border border-border dark:border-coal rounded-lg shadow-lg z-50 animate-bounceInDown">
          <ul className="py-1">
            {items.map((item, index) => {
              if (typeof item === "object" && "label" in item) {
                return (
                  <li
                    key={index}
                    className="hover:bg-gray-200 hover:dark:bg-dim rounded-md transition-all ease-linear duration-200 flex items-center"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        className="flex items-center py-2 px-3 text-soft dark:text-pale font-semibold w-full"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-label="onClick-event"
                        className="flex items-center py-2 px-3 text-soft dark:text-pale font-semibold w-full"
                        onClick={() => handleItemClick(item)}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        <span>{item.label}</span>
                      </button>
                    )}
                  </li>
                );
              } else if (
                typeof item === "string" ||
                React.isValidElement(item)
              ) {
                return <div key={index}>{item}</div>;
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
