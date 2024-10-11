import React, { useState, useEffect, useRef } from "react";

// AccordionTabProps defines the props for each tab in the accordion
interface AccordionTabProps {
  header: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// AccordionProps defines the props for the accordion component itself
interface AccordionProps {
  multiple?: boolean;
  activeIndex?: number | number[];
  onTabChange?: (activeIndex: number | number[]) => void;
  className?: string;
  children: React.ReactNode;
}

// AccordionTab component represents each individual tab
const AccordionTab: React.FC<AccordionTabProps> = ({
  header,
  children,
  disabled = false,
  className = "",
}) => {
  return (
    <div
      className={`accordion-tab ${className} ${
        disabled ? "opacity-50 cursor-no-drop" : ""
      }`}
    >
      {header}
      {!disabled && children}
    </div>
  );
};

// Accordion component handles the display and state management of the tabs
const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  activeIndex: controlledActiveIndex,
  onTabChange,
  className = "",
}) => {
  // Hooks are called at the top level of the function component, which is correct
  const isControlled = controlledActiveIndex !== undefined;
  const [activeIndex, setActiveIndex] = useState<number | number[]>(multiple ? [] : -1);
  
  // Effect hook to sync with controlledActiveIndex
  useEffect(() => {
    if (isControlled && controlledActiveIndex !== undefined) {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex, isControlled]);

  // Handle tab click event
  const handleTabClick = (index: number) => {
    if (isControlled && onTabChange) {
      if (multiple) {
        const currentActiveIndex = Array.isArray(controlledActiveIndex)
          ? controlledActiveIndex
          : [];
        const newIndex = currentActiveIndex.includes(index)
          ? currentActiveIndex.filter((i) => i !== index)
          : [...currentActiveIndex, index];
        onTabChange(newIndex);
      } else {
        onTabChange(index === controlledActiveIndex ? -1 : index);
      }
    } else {
      if (multiple) {
        setActiveIndex((prevIndex) =>
          Array.isArray(prevIndex)
            ? prevIndex.includes(index)
              ? prevIndex.filter((i) => i !== index)
              : [...prevIndex, index]
            : [index]
        );
      } else {
        setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
      }
    }
  };

  // Render accordion tabs
  const renderTabs = () =>
    React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === AccordionTab) {
        const isActive = isControlled
          ? multiple
            ? Array.isArray(controlledActiveIndex) &&
              controlledActiveIndex.includes(index)
            : controlledActiveIndex === index
          : multiple
          ? Array.isArray(activeIndex) && activeIndex.includes(index)
          : activeIndex === index;

        // For dynamically controlling height using refs
        const contentRef = useRef<HTMLDivElement>(null);
        const [maxHeight, setMaxHeight] = useState<string>("0px");

        useEffect(() => {
          if (isActive && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
          } else {
            setMaxHeight("0px");
          }
        }, [isActive]);

        return (
          <div className={`accordion-tab ${isActive ? "active" : ""} transition-all duration-300 ease-in-out`}>
            <div
              className="accordion-header cursor-pointer bg-primary dark:bg-shade p-4 border-b border-border dark:border-coal transition-all duration-300 hover:bg-secondary dark:hover:bg-dim"
              onClick={() => !child.props.disabled && handleTabClick(index)}
            >
              {child.props.header}
            </div>
            {/* Apply dynamic max-height for smooth sliding transition */}
            <div
              ref={contentRef}
              style={{ maxHeight }} // Dynamically adjust max-height
              className={`accordion-content overflow-hidden transition-[max-height] duration-500 ease-in-out bg-tertiary dark:bg-shadow border-b border-border dark:border-coal`}
            >
              <div className="p-4">{child.props.children}</div>
            </div>
          </div>
        );
      }
      return null;
    });

  return <div className={`accordion ${className}`}>{renderTabs()}</div>;
};

export { Accordion, AccordionTab };
