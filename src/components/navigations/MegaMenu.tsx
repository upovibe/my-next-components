import React from "react";
import { MenuItem } from "./types"; // Adjust the import according to your project structure
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

interface MegaMenuProps {
  menuItems: MenuItem[];
  orientation?: "horizontal" | "vertical"; // Optional prop to set orientation
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  menuItems,
  orientation = "horizontal",
}) => {
  return (
    <div
      className={`flex border-2 border-border dark:border-coal rounded-md ${
        orientation === "vertical" ? "flex-col w-max py-2" : ""
      }`}
    >
      <ul
        className={`flex ${orientation === "vertical" ? "flex-col" : ""}`}
      >
        {menuItems.map((item, index) => (
          <li key={index} className="group relative w-full px-3">
            <span
              className={`flex whitespace-nowrap overflow-hidden text-ellipsis items-center justify-between px-4 py-2 font-semibold text-soft dark:text-pale hover:text-highlight dark:hover:text-ocean cursor-pointer hover:bg-secondary/50 dark:hover:bg-dim/50 transition-all ease-linear duration-200 ${
                orientation === "vertical" ? "text-left" : "text-center"
              }`}
            >
              {item.label}
              {orientation === "vertical" ? (
                <FaChevronRight className="inline ml-2 text-xs" />
              ) : (
                <FaChevronDown className="inline ml-2 text-xs" />
              )}
            </span>
            {item.submenu && item.submenu.length > 0 && (
              <ul
                className={`flex items-start w-full min-w-full border rounded-md group-hover:block absolute z-50 bg-white dark:bg-black p-1 ${
                  orientation === "vertical"
                    ? "left-full top-0 hidden"
                    : "top-full left-0 hidden"
                }`}
              >
                {item.submenu.map((subitem, subindex) => (
                  <li key={subindex} className="w-full">
                    <a
                      href={subitem.path}
                      className="w-full px-4 py-2 block text-soft dark:text-pale hover:text-highlight dark:hover:text-ocean cursor-pointer hover:bg-secondary/50 dark:hover:bg-dim/50 transition-all ease-linear duration-200"
                    >
                      {subitem.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MegaMenu;
