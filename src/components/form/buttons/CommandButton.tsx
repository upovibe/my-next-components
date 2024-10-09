import React, { useState, useRef, useEffect } from "react";

// Define the menu options based on MenuModel API-like structure
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandButtonProps {
  defaultAction: () => void;
  menuItems: MenuItem[];
  buttonLabel: string;
}

const CommandButton: React.FC<CommandButtonProps> = ({
  defaultAction,
  menuItems,
  buttonLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Ref for the menu

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close the menu if clicking outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Default action button */}
      <div className="flex shadow overflow-hidden rounded-xl border-2 border-border dark:border-coal">
        <button
          type="button"
          onClick={defaultAction}
          className="bg-primary text-deep font-medium py-2 px-4 rounded-l-lg hover:bg-tertiary dark:bg-shade dark:text-light dark:hover:bg-dim"
        >
          {buttonLabel}
        </button>

        {/* Dropdown toggle button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="bg-primary text-deep font-medium py-2 px-2 rounded-r-lg border-l border-border hover:bg-tertiary dark:bg-shade dark:text-light dark:border-coal dark:hover:bg-dim"
        >
          ▼
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef} // Attach ref to the menu
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-primary border border-border z-10 dark:bg-shade dark:border-coal p-2"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={item.action}
                className="flex items-center w-full px-4 py-2 text-left text-deep hover:bg-tertiary hover:text-highlight dark:text-light dark:hover:bg-dim rounded-lg"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandButton;
