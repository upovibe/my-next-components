import React, { useState, useEffect } from "react";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

interface ColumnProps {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  filterElement?: React.ReactNode;
}

interface PaginatorProps {
  rowsPerPage: number;
  totalRecords: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  rowsPerPageOptions: number[];
}

interface SortMeta {
  field: string;
  order: number;
}

interface TableViewProps {
  value: any[];
  stripedRows?: boolean;
  showGridlines?: boolean;
  className?: string;
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  sortMode?: "single" | "multiple";
  defaultSortField?: string;
  defaultSortOrder?: number;
  removableSort?: boolean;
  globalFilterFields?: string[];
  selectionMode?: "single" | "multiple";
  selectionType?: "row" | "cell";
  onSelectionChange?: (selection: any[]) => void;
  children: React.ReactNode;
}

const Paginator: React.FC<PaginatorProps> = ({
  rowsPerPage,
  totalRecords,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}) => {
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 md:flex-row md:justify-between p-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor="rowsPerPage"
          className="text-soft dark:text-pale font-semibold"
        >
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => {
            onRowsPerPageChange(Number(e.target.value));
            onPageChange(0); // Reset to first page
          }}
          className="p-1 px-2 rounded-md border-2 text-soft dark:text-pale border-border dark:border-coal focus:outline-none focus:border-highlight cursor-pointer"
        >
          {rowsPerPageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          aria-label="previouse-button"
          type="button"
          onClick={handlePrevPage}
          className="flex items-center justify-center size-8 rounded-full hover:bg-tertiary dark:hover:bg-shadow font-light text-soft dark:text-pale transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === 0}
        >
          <FaChevronLeft />
        </button>
        <span className="text-soft dark:text-pale">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          aria-label="next-button"
          type="button"
          onClick={handleNextPage}
          className="flex items-center justify-center size-8 rounded-full hover:bg-tertiary dark:hover:bg-shadow font-light text-soft dark:text-pale transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === totalPages - 1}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export const Column: React.FC<ColumnProps> = () => null;

export const TableView: React.FC<TableViewProps> = ({
  value,
  stripedRows,
  showGridlines,
  className = "",
  paginator,
  rows = 5,
  rowsPerPageOptions = [5, 10, 25, 50],
  sortMode = "single",
  defaultSortField = "",
  defaultSortOrder = 1,
  removableSort,
  globalFilterFields = [],
  selectionMode = "single",
  selectionType = "row",
  onSelectionChange,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [sortMeta, setSortMeta] = useState<SortMeta | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [selection, setSelection] = useState<any[]>([]);

  // Extract column information from children
  const columns = React.Children.toArray(children).filter(
    (child: any) => child.type === Column
  );

  // Handle column sorting
  const handleSort = (field: string) => {
    let order = 1;
    if (sortMode === "single") {
      if (sortMeta?.field === field) {
        order = sortMeta.order * -1;
      }
      setSortMeta({ field, order });
    } else {
      // "multiple" sortMode logic (you can extend this)
    }
  };

  // Handle row/cell selection
  const handleSelection = (item: any, field?: string) => {
    let updatedSelection = [...selection];

    if (selectionMode === "single") {
      if (selectionType === "row") {
        updatedSelection = [item];
      } else if (selectionType === "cell" && field) {
        updatedSelection = [[item, field]];
      }
    } else if (selectionMode === "multiple") {
      if (selectionType === "row") {
        if (updatedSelection.includes(item)) {
          updatedSelection = updatedSelection.filter((sel) => sel !== item);
        } else {
          updatedSelection.push(item);
        }
      } else if (selectionType === "cell" && field) {
        const cellSelected = updatedSelection.some(
          (sel) => sel[0] === item && sel[1] === field
        );
        if (cellSelected) {
          updatedSelection = updatedSelection.filter(
            (sel) => sel[0] !== item || sel[1] !== field
          );
        } else {
          updatedSelection.push([item, field]);
        }
      }
    }
    setSelection(updatedSelection);
    onSelectionChange?.(updatedSelection);
  };

  // Filter the data based on column filters and global filter
  const filteredValue = value.filter((item) => {
    // Column filters
    for (let field in filters) {
      if (!item[field].toString().toLowerCase().includes(filters[field].toLowerCase())) {
        return false;
      }
    }

    // Global filter
    if (globalFilter) {
      return globalFilterFields.some((field) =>
        item[field].toString().toLowerCase().includes(globalFilter.toLowerCase())
      );
    }

    return true;
  });

  // Sort the filtered data based on the sortMeta
  const sortedValue = [...filteredValue].sort((a, b) => {
    if (!sortMeta || !sortMeta.field) return 0;
    const field = sortMeta.field;
    const order = sortMeta.order;

    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * order;
    } else {
      return (aValue > bValue ? 1 : -1) * order;
    }
  });

  // Paginate the sorted and filtered data
  const paginatedValue = sortedValue.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Render sort icon
  const renderSortIcon = (col: ColumnProps) => {
    if (sortMeta && sortMeta.field === col.field) {
      const order = sortMeta.order;
      if (order === 1) return <FaSortUp className="ml-1 inline-block" />;
      if (order === -1) return <FaSortDown className="ml-1 inline-block" />;
    }
    return <FaSort className="ml-1 inline-block" />;
  };

  // Handle column filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
};

return (
  <div className={`${className}`}>
    {/* Global Filter */}
    {globalFilterFields.length > 0 && (
      <div className="p-2">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search..."
          className="p-2 border rounded-md w-full"
        />
      </div>
    )}

    <div className="overflow-x-auto md:overflow-x-hidden">
      <table
        className={`min-w-full border-collapse ${
          showGridlines ? "border border-border dark:border-coal" : ""
        } table-fixed`}
      >
        {/* Table Head */}
        <thead className="bg-secondary dark:bg-dim">
          <tr>
            {columns.map((col: any, index) => (
              <th
                key={index}
                className={`text-left p-2 whitespace-nowrap border-b border-border dark:border-coal text-deep dark:text-light w-32 ${
                  showGridlines
                    ? "border-l border-border dark:border-coal"
                    : ""
                } ${col.props.sortable ? "cursor-pointer" : ""}`}
                onClick={() =>
                  col.props.sortable && handleSort(col.props.field)
                }
              >
                {col.props.header}
                {col.props.sortable && renderSortIcon(col.props)}

                {/* Column Filter */}
                {col.props.filterable && (
                  <div>
                    {col.props.filterElement ? (
                      col.props.filterElement
                    ) : (
                      <input
                        type="text"
                        value={filters[col.props.field] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.props.field, e.target.value)
                        }
                        placeholder={`Filter ${col.props.header}`}
                        className="p-1 mt-1 w-full text-sm border rounded-md"
                      />
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {paginatedValue.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                stripedRows && rowIndex % 2 === 1
                  ? "bg-tertiary dark:bg-shadow"
                  : "bg-primary dark:bg-shade"
              } ${
                selectionMode === "single" && selection.includes(item)
                  ? "bg-selected"
                  : ""
              }`}
              onClick={() =>
                selectionType === "row" && handleSelection(item)
              }
            >
              {columns.map((col: any, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-2 whitespace-nowrap border-b border-border dark:border-coal text-soft dark:text-pale w-32 ${
                    showGridlines
                      ? "border-l border-border dark:border-coal"
                      : ""
                  } ${
                    selectionType === "cell" &&
                    selection.some(
                      (sel) => sel[0] === item && sel[1] === col.props.field
                    )
                      ? "bg-selected"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (selectionType === "cell") {
                      e.stopPropagation(); // Prevent row selection when selecting a cell
                      handleSelection(item, col.props.field);
                    }
                  }}
                >
                  {item[col.props.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Paginator */}
    {paginator && (
      <Paginator
        rowsPerPage={rowsPerPage}
        totalRecords={filteredValue.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    )}
  </div>
);
};
