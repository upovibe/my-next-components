import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  icon?: IconType;
  command?: () => void;
  children?: SubItem[];
  className?: string;
}

interface NavMenuProps {
  logo?: React.ReactNode;
  items: NavItem[];
  actionElement?: JSX.Element;
  input?: JSX.Element;
  itemsToRight?: boolean;
  displayType?: "dropdown" | "sidebar";
  showIcons?: boolean;
  className?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({
  logo,
  items,
  actionElement,
  input,
  itemsToRight,
  displayType = "dropdown",
  showIcons,
  className = "",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Close submenu on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="p-2" ref={menuRef}>
      <div className={`${className}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer mr-2">
            {logo ? (
              <div className="text-2xl font-bold">{logo}</div>
            ) : (
              <Link href="/">Brand</Link>
            )}
          </div>

          {/* Items either after the logo or to the right */}
          <div
            className={`${
              itemsToRight
                ? "hidden lg:flex gap-3 ml-auto"
                : "hidden lg:flex gap-2 mr-auto"
            }`}
          >
            {items.map((item, index) => (
              <div key={index} className="relative">
                {item.children ? (
                  <button
                    type="button"
                    onClick={() => toggleSubMenu(index)}
                    className="p-2 lg:py-1 rounded-md flex items-center space-x-2 font-semibold text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear"
                  >
                    {showIcons && item.icon && (
                      <item.icon className="text-lg lg:text-base" />
                    )}
                    <span className="inline-flex">{item.label}</span>
                    {openSubMenuIndex === index ? (
                      <FaChevronDown className="text-xs" />
                    ) : (
                      <FaChevronRight className="text-xs" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={item.command}
                    className="p-2 lg:py-1 rounded-md flex items-center space-x-2 font-semibold text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear"
                  >
                    {showIcons && item.icon && (
                      <item.icon className="text-lg lg:text-base" />
                    )}
                    <span className="inline-block">{item.label}</span>
                  </Link>
                )}

                {/* Sub-items (children) */}
                {item.children && (
                  <div
                    className={`absolute left-0 bg-primary dark:bg-shade text-white py-2 rounded-md mt-2 transition-all duration-300 ease-in-out w-max overflow-hidden border-border dark:border-coal border shadow ${
                      openSubMenuIndex === index
                        ? "max-h-screen opacity-100 visible"
                        : "max-h-0 opacity-0 invisible"
                    }`}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className=" flex items-center space-x-2 text-sm px-4 py-2 text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear whitespace-normal"
                      >
                        <span className="inline-block">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Optional Action Element + Input */}
          <div className="hidden lg:flex items-center ml-2">
            {input && <div>{input}</div>}
            {actionElement && <div>{actionElement}</div>}
          </div>

          {/* Burger Menu */}
          <div
            className="burger-menu flex lg:hidden cursor-pointer flex-col space-y-1 ml-3 z-50"
            onClick={handleMenuToggle}
          >
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Overlay for dropdown and sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleMenuToggle}
        ></div>
      )}

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          displayType === "sidebar"
            ? `fixed top-0 left-0 h-full w-full bg-primary dark:bg-shade transition-transform duration-300 ease-in-out z-50 ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `absolute top-16 left-0 w-full bg-primary dark:bg-shade transition-all duration-300 ease-in-out z-50 ${
                menuOpen
                  ? "max-h-screen opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              }`
        }`}
      >
        {/* Close icon inside sidebar */}
        {displayType === "sidebar" && (
          <div
            className="absolute top-6 right-4 cursor-pointer z-50 text-deep dark:text-light flex flex-col space-y-1"
            onClick={handleMenuToggle}
          >
            {/* Close button */}
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-[2px] bg-deep dark:bg-light transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        )}

        {/* Input inside sidebar in mobile */}
        <div
          className={`p-3 ${displayType === "sidebar" ? "w-3/4" : "w-full"}`}
        >
          {input}
        </div>

        <div className={`px-2 pt-4 pb-3 space-y-1 border-t border-gray-600`}>
          {items.map((item, index) => (
            <div key={index} className="relative">
              {item.children ? (
                <button
                  type="button"
                  onClick={() => toggleSubMenu(index)}
                  className="w-full text-left px-3 py-2 rounded-md flex items-center                 space-x-2 font-semibold text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear"
                >
                  {showIcons && item.icon && (
                    <item.icon className="text-lg lg:text-base" />
                  )}
                  <span className="inline-flex">{item.label}</span>
                  {openSubMenuIndex === index ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={item.command}
                  className="block px-3 py-2 rounded-md font-semibold text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear"
                >
                  {showIcons && item.icon && (
                    <item.icon className="text-lg lg:text-base" />
                  )}
                  <span className="inline-block">{item.label}</span>
                </Link>
              )}

              {/* Sub-items (children) */}
              {item.children && (
                <div
                  className={`ml-4 transition-all duration-300 ease-in-out overflow-hidden ${
                    openSubMenuIndex === index
                      ? "max-h-screen opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  }`}
                >
                  {item.children.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="block text-sm px-4 py-2 text-deep dark:text-light hover:text-highlight dark:hover:text-ocean transition-all duration-200 ease-linear"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Element inside mobile menu */}
        <div className="p-3">{actionElement}</div>
      </div>
    </nav>
  );
};

export default NavMenu;
