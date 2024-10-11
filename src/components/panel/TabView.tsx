import React, { useState, ReactNode } from "react";
import { IconType } from "react-icons"; // Assuming you're using react-icons

// TabPanel Component
const TabPanel = ({
  header,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
}: {
  header: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  children: ReactNode;
}) => {
  return <>{children}</>;
};

// TabView Component
const TabView = ({
  children,
  defaultActiveTab = 0,
  orientation = "horizontal",
}: {
  children: ReactNode;
  defaultActiveTab?: number;
  orientation?: "horizontal" | "vertical";
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={`w-full ${orientation === "vertical" ? "md:flex" : ""}`}>
      {/* Tabs */}
      <div
        className={`${
          orientation === "horizontal"
            ? "flex w-full border-b border-muted"
            : "flex md:flex-col w-full md:w-1/4 md:gap-3 border-r items-start border-muted md:pr-10 m-0 mb-5 md:mr-10"
        }`}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          const { header, leftIcon: LeftIcon, rightIcon: RightIcon } = child.props;
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex items-center gap-2 soft ${
                orientation === "horizontal"
                  ? "w-full px-4 py-2 text-sm font-medium border-b-2 border-transparent transition-colors duration-200"
                  : "w-full px-4 py-2 text-sm font-medium border-b-2 border-transparent transition-colors duration-200 text-center md:text-left"
              } transition-colors duration-200 ${
                activeTab === index
                  ? "text-deep dark:text-light bg-secondary dark:bg-dim border-b-2 border-highlight"
                  : "text-soft dark:text-pale hover:bg-secondary hover:dark:bg-dim"
              }`}
            >
              {LeftIcon && <LeftIcon />}
              {header}
              {RightIcon && <RightIcon />}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="w-full py-4">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return activeTab === index ? (
            <div key={index} className="w-full transition-opacity duration-200">
              {child}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export { TabPanel, TabView };
