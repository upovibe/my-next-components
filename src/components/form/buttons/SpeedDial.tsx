import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

interface SpeedDialProps {
  direction?: "top-to-bottom" | "bottom-to-top"; // Direction of popup menu
  menuItems: Array<{
    label: string; // Label for each action
    icon: React.ElementType; // Icon component for each action
    action: () => void; // Function to be triggered on click
  }>;
}

const SpeedDial: React.FC<SpeedDialProps> = ({
  direction = "bottom-to-top",
  menuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define the positioning and layout based on the direction prop
  const getPositioningClasses = () => {
    switch (direction) {
      case "top-to-bottom":
        return "top-full flex-col space-y-2"; // Vertically downward
      case "bottom-to-top":
      default:
        return "bottom-full flex-col-reverse space-y-2"; // Vertically upward but reverse order
    }
  };

  // Define translate animation depending on the direction
  const getTranslateAnimation = (index: number) => {
    switch (direction) {
      case "top-to-bottom":
        return isOpen ? `translate-y-${index * 60}px` : "translate-y-0"; // Top-to-bottom movement
      case "bottom-to-top":
      default:
        return isOpen ? `-translate-y-${index * 60}px` : "translate-y-0"; // Bottom-to-top reverse movement
    }
  };

  // Handle action button click and close the menu
  const handleActionClick = (action: () => void) => {
    action(); // Execute the action
    toggleMenu(); // Close the menu
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main floating button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle SpeedDial Menu"
        className={`relative z-10 bg-highlight hover:bg-highlight/90 p-5 rounded-full shadow-lg text-light 
          dark:bg-ocean hover:dark:bg-ocean/90 transition-transform transform 
          focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50
          ${isOpen ? "rotate-45" : "rotate-0"}`}        
      >
        {isOpen ? <FaTimes /> : <FaPlus />}
      </button>

      {/* SpeedDial Actions */}
      <div
        className={`absolute flex ${getPositioningClasses()} transition-all duration-500 ease-in-out m-2 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        {/* Dynamic Action buttons */}
        {menuItems.map(({ icon: Icon, label, action }, index) => (
          <button
            key={index}
            type="button"
            className={`bg-coal p-4 rounded-full shadow-lg text-light hover:bg-dim transition-all duration-500 ease-in-out transform ${getTranslateAnimation(
              index + 1
            )} ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
            title={label}
            aria-label={label}
            onClick={() => handleActionClick(action)} // Close the menu after action
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedDial;
