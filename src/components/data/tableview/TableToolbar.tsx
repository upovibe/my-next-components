import React from "react";
import { FaFilter, FaTrash, FaPlusSquare, FaPrint } from "react-icons/fa";
import Tooltip from "@/components/common/Tooltip";
import Divider from "@/components/common/Divider";

interface TableToolbarProps {
  icon?: React.ReactNode;
  title: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  globalFilterFields: boolean;
  selectionMode?: "single" | "multiple";
  selectedRowsCount: number;
  onDeleteSelected?: () => void;
  onAddRow?: () => void;
  onPrint?: () => void;
  showPrintButton: boolean;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  icon,
  title,
  globalFilter,
  setGlobalFilter,
  globalFilterFields,
  selectionMode,
  selectedRowsCount,
  onDeleteSelected,
  onAddRow,
  onPrint,
  showPrintButton,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 mb-5 min-w-full overflow-auto p-2 bg-tertiary dark:bg-shadow rounded-xl shadow-md backdrop-blur-lg bg-opacity-50 border border-border dark:border-coal">
      <div className="flex items-center justify-between">
        <div className="flex whitespace-nowrap items-center text-lg md:text-xl font-semibold text-deep dark:text-light">
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {(icon || title) && (
            <Divider layout="vertical" type="solid" className="h-5 mx-2" />
          )}
        </div>
        {globalFilterFields && (
          <div className="relative hidden md:inline-flex items-center">
            <FaFilter className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Global Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 p-2 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-full cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 ml-auto">
        {(selectionMode === "multiple" && selectedRowsCount > 0) ||
        (selectionMode === "single" && selectedRowsCount === 1) ? (
          <button
            type="button"
            onClick={() => onDeleteSelected?.()}
            className="p-2 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
          >
            <Tooltip
              content="Delete Selected"
              position="left"
              className="block lg:hidden"
            >
              <FaTrash />
            </Tooltip>
            <span className="hidden lg:inline-flex">Delete Selected</span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onAddRow?.()}
          className="p-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all"
        >
          <Tooltip
            content="Add New"
            position="left"
            className="block lg:hidden"
          >
            <FaPlusSquare />
          </Tooltip>
          <span className="hidden lg:inline-flex">Add New Row</span>
        </button>
        {showPrintButton && (
          <button
            type="button"
            onClick={() => onPrint?.()}
            className="p-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-all"
          >
            <Tooltip
              content="Print Table"
              position="left"
              className="block lg:hidden"
            >
              <FaPrint />
            </Tooltip>
            <span className="hidden lg:inline-flex">Print Table</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TableToolbar;
