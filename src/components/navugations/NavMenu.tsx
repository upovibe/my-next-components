import { useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaChevronDown, FaChevronRight, FaTimes } from "react-icons/fa"; // Import close icon

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  icon?: IconType;
  command?: () => void;
  children?: SubItem[]; // Optional sub-items
}

interface NavMenuProps {
  logo?: JSX.Element;
  items: NavItem[];
  actionElement?: JSX.Element;
  input?: JSX.Element;
  container?: boolean;
  widthClass?: string;
  itemsOnLeft?: boolean;
  displayType?: "dropdown" | "sidebar";
  showIcons?: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({
  logo,
  items,
  actionElement,
  input,
  container = true,
  widthClass = "max-w-7xl",
  itemsOnLeft = true,
  displayType = "dropdown",
  showIcons = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prevState) =>
      prevState.includes(index)
        ? prevState.filter((i) => i !== index)
        : [...prevState, index]
    );
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className={`${container ? "mx-auto" : ""} ${widthClass}`}>
        <div className="flex items-center justify-between p-2 h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer mr-10">
            {logo ? (
              <div className="text-2xl font-bold">{logo}</div>
            ) : (
              <Link href="/">Brand</Link>
            )}
          </div>

          {/* Items either after the logo or to the right */}
          <div
            className={`${
              itemsOnLeft
                ? "hidden md:flex gap-2 mr-auto"
                : "hidden md:flex gap-3 ml-auto"
            }`}
          >
            {items.map((item, index) => (
              <div key={index} className="relative">
                {item.children ? (
                  <button
                    onClick={() => toggleSubMenu(index)}
                    className="hover:bg-gray-700 p-2 lg:py-1 rounded-md flex items-center space-x-2"
                  >
                    {showIcons && item.icon && (
                      <item.icon className="text-lg lg:text-base" />
                    )}
                    <span className="inline-flex">{item.label}</span>
                    {openSubMenus.includes(index) ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={item.command}
                    className="hover:bg-gray-700 p-2 lg:py-1 rounded-md flex items-center space-x-2"
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
                    className={`absolute left-0 bg-gray-700 text-white py-2 rounded-md mt-2 transition-all duration-300 ease-in-out ${
                      openSubMenus.includes(index)
                        ? "max-h-screen opacity-100 visible"
                        : "max-h-0 opacity-0 invisible"
                    }`}
                    style={{ overflow: "hidden" }}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block px-4 py-2 hover:bg-gray-600"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Optional Action Element + Input - Always on the right */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {input && <div>{input}</div>}
            {actionElement && <div>{actionElement}</div>}
          </div>

          {/* Burger Menu */}
          <div
            className="burger-menu flex md:hidden cursor-pointer flex-col space-y-1 ml-3 z-50"
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

      {/* Overlay only for dropdown */}
      {menuOpen && displayType === "dropdown" && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleMenuToggle}
        ></div>
      )}

      {/* Mobile menu with full-screen width for sidebar */}
      <div
        className={`md:hidden ${
          displayType === "sidebar"
            ? `fixed top-0 left-0 h-full w-full bg-gray-800 transition-transform duration-300 ease-in-out z-50 ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `absolute top-16 left-0 w-full bg-gray-800 transition-all duration-300 ease-in-out z-50 ${
                menuOpen
                  ? "max-h-screen opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              }`
        }`}
      >
        {/* Close icon inside sidebar */}
        {displayType === "sidebar" && (
          <div
            className="absolute top-4 right-4 cursor-pointer z-50 text-white"
            onClick={handleMenuToggle}
          >
            <FaTimes className="text-2xl" />
          </div>
        )}

        {/* Input inside sidebar in mobile */}
        <div
          className={`p-3 ${displayType === "sidebar" ? "w-3/4" : "w-full"}`}
        >
          {input}
        </div>

        <div
          className={`px-2 pt-4 pb-3 space-y-1 border-t border-gray-600 ${
            displayType === "sidebar" ? "" : ""
          }`}
        >
          {items.map((item, index) => (
            <div key={index} className="relative">
              {item.children ? (
                <button
                  onClick={() => toggleSubMenu(index)}
                  className="w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  {showIcons && item.icon && <item.icon className="text-lg" />}
                  <span>{item.label}</span>
                  {openSubMenus.includes(index) ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={item.command}
                  className="hover:bg-gray-700 px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  {showIcons && item.icon && <item.icon className="text-lg" />}
                  <span>{item.label}</span>
                </Link>
              )}

              {/* Sub-items (children) in mobile with animation */}
              {item.children && openSubMenus.includes(index) && (
                <div className="ml-6 mt-2 transition-all duration-300 ease-in-out">
                  {item.children.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="block px-3 py-2 hover:bg-gray-600 rounded-md"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {actionElement && <div className="mt-2">{actionElement}</div>}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
