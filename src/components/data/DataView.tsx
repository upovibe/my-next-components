import React, { useState, useEffect } from "react";
import Paginator from "@/components/data/Paginator";
import SelectButton from "@/components/form/buttons/SelectButton";
import InputSelect from "@/components/form/inputs/InputSelect";
import { FaThLarge, FaList } from "react-icons/fa";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import SelectDropdown from "@/components/form/inputs/SelectDropdown";
import Tooltip from "@/components/common/Tooltip"

interface DataViewProps<T> {
  value: T[];
  listTemplate: (item: T) => React.ReactNode;
  rows?: number;
  paginator?: boolean;
  rowsPerPageOptions?: number[];
  sortField?: keyof T;
  sortOrder?: "asc" | "desc";
  layout?: "list" | "grid";
  filterField?: keyof T;
  filterOptions?: { label: string; value: any }[];
  showLayoutSwitcher?: boolean;
  showSorting?: boolean;
  loading?: boolean;
  className?: string;
}

const DataView = <T extends object>({
  value,
  rows = 10,
  paginator,
  rowsPerPageOptions = [5, 10, 20],
  sortField: initialSortField,
  sortOrder: initialSortOrder = "asc",
  layout: initialLayout = "list",
  filterField,
  filterOptions = [],
  showLayoutSwitcher,
  showSorting,
  className = "",
  listTemplate,
}: DataViewProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);
  const [layout, setLayout] = useState<"list" | "grid">(initialLayout);
  const [selectedFilter, setSelectedFilter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter the data based on the selected filter option
  const filteredData = value.filter((item) => {
    if (!filterField || selectedFilter === null) return true;
    const fieldValue = item[filterField];
    return fieldValue === selectedFilter;
  });

  // Pagination logic
  const totalRecords = filteredData.length;
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = filteredData.slice(start, end);

  // Sorting logic
  const sortedData = sortField
    ? [...paginatedData].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : paginatedData;

  // Layout logic
  const renderData = sortedData.map((item, index) => (
    <div
      key={index}
      className={`item-${layout} ${
        layout === "grid" ? "border border-border dark:border-coal rounded-md m-2" : "py-2 md:py-4 md:border-b border-border dark:border-coal"
      }`}
    >
      {listTemplate(item)}
    </div>
  ));

  // Sorting options
  const sortOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  // Layout options for SelectButton with react-icons
  const layoutOptions = [
    { label: <FaList />, value: "list" },
    { label: <FaThLarge />, value: "grid" },
  ];

  // Extracting filter values for InputSelect
  const filterValues = filterOptions.map((option) => option.label);

  return (
    <div className={`data-view-component p-7 bg-prmary dark:bg-shade border border-border dark:border-coal rounded-xl ${layout} ${className}`}>
      {/* Sorting, Filter, and Layout selection */}
      <div className="controls flex md:gap-3 justify-between items-center border-b border-t bg-primary dark:bg-shade border-border dark:border-coal border-1 p-3 mb-10">
        <div className="flex items-center gap-3 justify-between w-full md:w-fit">
          {/* Sorting Dropdown */}
          {showSorting && (
            <div className="sort-dropdown">
              <SelectDropdown
                options={sortOptions}
                floatingLabel
                placeholder="Sort Order"
                value={sortOrder}
                onChange={(value) => setSortOrder(value as "asc" | "desc")}
                className="w-32"
              />
            </div>
          )}
          {/* Filter Dropdown */}
          {filterOptions.length > 0 && (
            <div className="filter-dropdown">
              <InputSelect
                placeholder="Select filter..."
                floatingLabel
                options={filterValues}
                value={selectedFilter || ""}
                onChange={(value) => {
                  const selectedOption = filterOptions.find(
                    (option) => option.label === value
                  );
                  setSelectedFilter(
                    selectedOption ? selectedOption.value : null
                  );
                }}
              />
            </div>
          )}
        </div>
        <div className="w-fit">
          {/* Conditionally render Layout selection using SelectButton */}
          {showLayoutSwitcher && (
            <Tooltip content="Select layout">
            <div className="layout-selection border border-border dark:border-coal rounded-lg hidden md:inline-flex">
              <SelectButton
                options={layoutOptions}
                value={layout}
                onChange={(value) => setLayout(value)}
                className="size-8 flex items-center justify-center"
              />
            </div>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Data rendering */}
      <div
        className={`data-view-content grid grid-cols-1 mb-16 ${
          layout === "grid"
            ? " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : ""
        }`}
      >
        {loading ? ( 
          <SkeletonLoader
            className={`grid grid-cols-1 shadow-md ${layout === "grid" ? "h-48 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-3" : "h-24 rounded-md my-3"}`}
            count={layout === "grid" ? 9 : 5}
          />
        ) : (
          renderData
        )}
      </div>

      {/* Paginator */}
      {paginator && !loading && (
        <Paginator
          rowsPerPage={rowsPerPage}
          totalRecords={totalRecords}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </div>
  );
};

export default DataView;
