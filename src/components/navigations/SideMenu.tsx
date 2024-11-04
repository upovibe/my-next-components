"use client";

import { ReactNode, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Tooltip from "@/components/basics/Tooltip";
import Logo from "@/components/common/Logo";

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`sticky top-0 h-screen p-3 space-y-3 transition-all duration-300 bg-primary dark:bg-shade ${
          isSidebarOpen ? "fixed inset-0 z-20" : isIconOnly ? "w-fit" : "hidden"
        } lg:${
          isIconOnly ? "w-fit" : " w-[250px]"
        } lg:block lg:relative lg:h-auto`}
      >
        {/* Sidebar Logo - Visible only in overlay mode (small screens) */}
        {isSidebarOpen && window.innerWidth < 1024 && (
          <div className="mb-6">
            <Logo />
          </div>
        )}

        {/* Toggle between icon-only and full sidebar */}
        <button
          aria-label="toggle-button"
          type="button"
          onClick={() => setIsIconOnly(!isIconOnly)}
          className="p-2 rounded-md hover:bg-secondary hover:dark:bg-dim text-soft dark:text-pale mb-4 hidden lg:block transition-all duration-200 ease-linear"
        >
          {isIconOnly ? <FaBars /> : <FaTimes />}
        </button>

        {/* Sidebar Navigation */}
        <nav className="space-y-2">
          {items.map((item, index) => {
            if (typeof item === "object" && "icon" in item) {
              return (
                <a
                  key={index}
                  href={item.link || "#"}
                  className="flex items-center gap-3 p-2 rounded-md text-soft dark:text-pale hover:bg-secondary dark:hover:bg-dim transition-all duration-200 ease-linear"
                >
                  <Tooltip content={item.label} position="right">
                    {item.icon}
                  </Tooltip>
                  {!isIconOnly && <span>{item.label}</span>}
                </a>
              );
            } else {
              return (
                <div key={index} className={isIconOnly ? "hidden" : ""}>
                  {item}
                </div>
              );
            }
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 text-deep dark:text-light relative overflow-auto h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 py-4 px-3 md:p-3 bg-white/30 dark:bg-dark/30 backdrop-blur-lg backdrop-saturate-150 border-b border-border dark:border-coal">
          <div className="flex items-center justify-between">
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
            <div>{actions}</div>
          </div>
        </div>
        <div>{children}</div>
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
