import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEllipsisV,
  FaEye,
  FaTrash,
  FaPenSquare,
  FaPlusSquare,
  FaPrint,
  FaFilter,
} from "react-icons/fa";
import Paginator from "@/components/data/Paginator";
import Checkbox from "@/components/form/Checkbox";
import ConfirmDialog from "@/components/overlay/ConfirmDialog";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import Divider from "@/components/common/Divider";

interface ColumnProps {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  editorType?: "input" | "select" | "file";
  options?: { label: string; value: any }[];
  editable?: boolean;
}

interface SortMeta {
  field: string;
  order: number;
}

interface TableViewProps<T extends Record<string, any>> {
  value: T[] | null;
  title: string;
  icon: React.ReactNode;
  loading?: boolean;
  errorMessage?: string;
  stripedRows?: boolean;
  showGridlines?: boolean;
  className?: string;
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  sortMode?: "single" | "multiple";
  removableSort?: boolean;
  selectionMode?: "single" | "multiple";
  children: React.ReactNode;
  globalFilterFields?: string[];
  showActions?: boolean;
  useEllipsis?: boolean;
  editable?: boolean;
  print?: boolean;
  customActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
  }[];
  onRowUpdate?: (updatedRow: T, rowIndex: number) => void;
  onSelectionChange?: (selection: T[]) => void;
  onDelete?: (item: T) => void;
  onDeleteAll?: (selectedRows: T[]) => void;
  onAddRow?: () => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
}

export const Column: React.FC<ColumnProps> = () => null;

export const TableView = <T extends Record<string, any>>({
  value,
  title,
  icon,
  loading,
  errorMessage = "No data available",
  stripedRows,
  showGridlines,
  className = "",
  paginator,
  rows = 10,
  rowsPerPageOptions = [5, 10, 25],
  sortMode = "single",
  removableSort,
  selectionMode,
  showActions,
  useEllipsis = false,
  children,
  globalFilterFields,
  customActions,
  print,
  onSelectionChange,
  onRowUpdate,
  onAddRow,
  onDelete,
  onDeleteAll,
  onEdit,
  onView,
}: TableViewProps<T>) => {
  const contentRef = useRef<HTMLTableElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isLoading, setIsLoading] = useState(loading);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [sortMeta, setSortMeta] = useState<SortMeta | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [initialValue, setInitialValue] = useState<any>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const editingRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const [showConfirmAction, setShowConfirmAction] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [pendingAction, setPendingAction] = useState<() => void>(
    () => () => {}
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (rowIndex: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [rowIndex]: !prevStates[rowIndex], // Toggle the dropdown for the clicked row
    }));
  };

  // Handle outside click to close the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElements = document.querySelectorAll(".dropdown-menu");
    let clickedInside = false;

    dropdownElements.forEach((dropdownElement) => {
      if (dropdownElement.contains(event.target as Node)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      setDropdownStates({});
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Extract columns from children
  const columns = React.Children.toArray(children).filter(
    (child: any) => child.type === Column
  );

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <table
          className={`w-full border-collapse border-border dark:border-coal ${
            showGridlines ? "table-fixed border-2" : " border-b border-t"
          }`}
        >
          <thead>
            <tr>
              {columns.map((col: any, colIndex: number) => (
                <th
                  key={colIndex}
                  className={`p-2 border-collapse border-border dark:border-coal ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  {col.props.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  stripedRows && rowIndex % 2 === 1
                    ? "bg-secondary dark:bg-dim"
                    : ""
                }
              >
                {columns.map((col: any, colIndex: number) => (
                  <td
                    key={colIndex}
                    className={`p-2 border-collapse border-border dark:border-coal ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    <div>
                      <SkeletonLoader className="p-5 rounded-2xl" />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!value || value.length === 0) {
    return <div className={`${className}`}>{errorMessage}</div>;
  }

  const handleAddRow = onAddRow
    ? onAddRow
    : () => console.log("No onAddRow handler defined");

  const handleConfirm = () => {
    pendingAction();
    setEditingCell(null);
    setShowConfirmAction(false);
  };

  const confirmAction = (action: () => void) => {
    setPendingAction(() => action);
    setShowConfirmAction(true);
  };

  // Handler for deleting an item (calls external or default delete logic)
  const handleDelete = (item: T) => {
    confirmAction(() => {
      if (onDelete) {
        onDelete(item);
      } else {
        const newValue = value.filter((row) => row !== item);
        onSelectionChange && onSelectionChange(newValue);
      }
    });
  };

  const handleEdit = (item: T) => {
    confirmAction(() => onEdit && onEdit(item));
  };

  const handleView = (item: T) => {
    if (onView) {
      onView(item);
    } else {
      console.log("No onView handler defined for item:", item);
    }
  };

  const handleSort = (field: string) => {
    let order = 1;
    if (sortMode === "single") {
      if (sortMeta && sortMeta.field === field) {
        if (sortMeta.order === 1 && removableSort) {
          setSortMeta(null);
          return;
        }
        order = sortMeta.order * -1;
      }
      setSortMeta({ field, order });
    }
  };

  // Apply global filtering to data based on globalFilterFields
  const applyGlobalFilter = (data: T[]) => {
    if (!globalFilter || !globalFilterFields || globalFilterFields.length === 0)
      return data;

    return data.filter((item) =>
      globalFilterFields.some((field) =>
        String((item as Record<string, any>)[field]) // type cast here
          ?.toLowerCase()
          .includes(globalFilter.toLowerCase())
      )
    );
  };

  // Apply column-specific filters to data
  const applyColumnFilters = (data: T[]) => {
    return data.filter((item) =>
      Object.keys(filterValues).every((key) => {
        const value = filterValues[key];
        if (!value) return true; // If no filter, include all
        return String((item as Record<string, any>)[key]) // type cast here
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  // Filter, sort, and paginate the value
  const sortedValue = applyGlobalFilter(value).sort((a, b) => {
    if (!sortMeta) return 0;
    const { field, order } = sortMeta;

    const aField = (a as Record<string, any>)[field]; // type cast here
    const bField = (b as Record<string, any>)[field]; // type cast here

    if (aField > bField) return order;
    if (aField < bField) return -order;
    return 0;
  });

  const filteredValue = applyColumnFilters(sortedValue);
  const paginatedValue = filteredValue.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Check if all rows are selected
  const isAllSelected =
    paginatedValue.length > 0 && selectedRows.length === paginatedValue.length;

  // Handler for selecting all rows
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    } else {
      setSelectedRows(paginatedValue);
      onSelectionChange && onSelectionChange(paginatedValue);
    }
  };

  // Handler for toggling row selection
  const toggleRowSelection = (item: T) => {
    const itemIdentifier = (item as any).code;
    const newSelectedRows = selectedRows.some(
      (row) => (row as any).code === itemIdentifier
    )
      ? selectedRows.filter((row) => (row as any).code !== itemIdentifier)
      : [...selectedRows, item];

    setSelectedRows(newSelectedRows);
    onSelectionChange && onSelectionChange(newSelectedRows);
  };

  // Render the sort icon based on current sort state
  const renderSortIcon = (col: ColumnProps) => {
    if (sortMeta && sortMeta.field === col.field) {
      const order = sortMeta.order;
      if (order === 1) return <FaSortUp className="ml-1 inline-block" />;
      if (order === -1) return <FaSortDown className="ml-1 inline-block" />;
    }
    return <FaSort className="ml-1 inline-block" />;
  };

  // Handler for filter changes (updates the filter state)
  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  };

  // Double-click handler for entering edit mode
  const handleDoubleClick = (rowIndex: number, field: string, value: any) => {
    setEditingCell({ row: rowIndex, field });
    setEditValue(value);
    setInitialValue(value);
    setHasChanges(false);
  };

  // Handler for blur (when the cell loses focus, show confirmation dialog if there are changes)
  const handleBlur = () => {
    if (!editingCell) return;

    if (hasChanges) {
      confirmAction(saveChanges);
    } else {
      setEditingCell(null);
    }
  };

  // Keydown handler (triggers blur on Enter key)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  // Handler for change events in inputs/selects
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditValue(event.target.value);
    if (event.target.value !== initialValue) {
      setHasChanges(true);
      setShowConfirm(true);
    }
  };

  const saveChanges = () => {
    if (!editingCell) return;
    const { row, field } = editingCell;
    const updatedRow = { ...paginatedValue[row], [field]: editValue };
    onRowUpdate && onRowUpdate(updatedRow, row);
    setEditingCell(null);
    setShowConfirm(false);
  };

  // Render editor based on column type (input, select, file)
  const renderEditor = (col: ColumnProps, item: T, rowIndex: number) => {
    if (
      col.editable &&
      editingCell?.row === rowIndex &&
      editingCell.field === col.field
    ) {
      if (col.editorType === "select" && col.options) {
        return (
          <select
            ref={selectRef}
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Choose an option"
            className="p-1 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean max-w-fit"
          >
            {col.options.map((option) => (
              <option
                className="cursor-pointer w-fit border-border dark:border-coal border-2"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      } else if (col.editorType === "input") {
        return (
          <input
            ref={inputRef} // Use the inputRef here
            type="text"
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="p-1 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean max-w-fit"
          />
        );
      } else if (col.editorType === "file") {
        return (
          <input
            aria-label="file"
            ref={inputRef} // Use the inputRef here
            type="file"
            onChange={(e) => handleFileChange(e, col.field, rowIndex)}
            onBlur={handleBlur}
          />
        );
      }
    }
    return (item as any)[col.field];
  };

  // New function to handle file input change
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    rowIndex: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditValue(e.target?.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for deleting all selected rows
  const handleDeleteAll = (rows: T[]) => {
    confirmAction(() => {
      if (onDeleteAll) {
        onDeleteAll(rows);
      } else {
        const newValue = value.filter((item) => !rows.includes(item));
        onSelectionChange && onSelectionChange([]);
        setSelectedRows([]);
      }
    });
  };

  return (
    <div className={`${className}`}>
      {/* Global Filter Input */}
      <div className="flex items-center justify-between gap-5 mb-5 min-w-full overflow-auto p-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex whitespace-nowrap items-center justify-between gap-2 text-lg md:text-xl font-semibold text-deep dark:text-light">
            {icon && <span>{icon}</span>}
            <h2>{title}</h2>
            <Divider layout="vertical" type="solid" className="mx-2" />
          </div>
          {globalFilterFields ? (
          <div className="relative inline-flex items-center">
            <FaFilter className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Global Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 p-2 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean hidden md:inline-flex"
            />
          </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 ml-auto">
          {/* Delete All Selected Rows Button */}
          {selectionMode === "multiple" && selectedRows.length > 0 && (
            <button
              type="button"
              className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all ease-linear duration-200 "
              onClick={() => handleDeleteAll(selectedRows)}
            >
              <FaTrash className="" />
              <span className="hidden md:inline-flex">Delete All</span>
            </button>
          )}
          {/* Add New Row Button */}
          <button
            type="button"
            className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all ease-linear duration-200 "
            onClick={handleAddRow}
          >
            <FaPlusSquare />
            <span className="hidden md:inline-flex">Add New Row</span>
          </button>

          {/* Print Button (Conditionally render when print is true) */}
          {print && (
            <button
              type="button"
              className="p-2 whitespace-nowrap flex items-center justify-between gap-2 bg-green-500 hover:bg-green-600 text-white rounded transition-all ease-linear duration-200 "
              onClick={reactToPrintFn}
            >
              <FaPrint />
              <span className="hidden md:inline-flex">Print Table</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={`relative overflow-x-auto pb-32`}>
        <table
          ref={contentRef}
          className={`min-w-full table-auto border-collapse border-border dark:border-coal ${
            showGridlines ? "table-fixed border-2" : "border-b border-t"
          }`}
        >
          <thead>
            <tr>
              {selectionMode === "multiple" && (
                <th
                  className={`p-2 min-w-fit border-collapse border-border dark:border-coal ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                  aria-label="Select All"
                >
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                  <span className="sr-only">Select all</span>
                </th>
              )}
              {columns.map((col: any, colIndex: number) => (
                <th
                  key={colIndex}
                  className={`p-2 max-w-fit border-collapse border-border dark:border-coal text-deep dark:text-light ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  <div className="flex tems-center gap-3">
                    <div className="flex items-center max-w-fit">
                      {col.props.header}
                      {col.props.sortable && (
                        <span
                          className="cursor-pointer whitespace-nowrap text-deep dark:text-light"
                          onClick={() => handleSort(col.props.field)}
                        >
                          {renderSortIcon(col.props)}
                        </span>
                      )}
                    </div>
                    {col.props.filterable && (
                      <div className="relative inline-flex items-center">
                        <input
                          aria-label="text"
                          type="text"
                          value={filterValues[col.props.field] || ""}
                          onChange={(e) =>
                            handleFilterChange(col.props.field, e.target.value)
                          }
                          className="pr-10 p-1 border-2 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                        />
                        <FaFilter className="absolute right-3 text-gray-500" />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {/* New "Action" header */}
              {showActions && (
                <th
                  className={`p-2 text-right min-w-fit border-collapse border-border dark:border-coal text-deep dark:text-light ${
                    showGridlines ? "border-2" : "border-b"
                  }`}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedValue.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  stripedRows && rowIndex % 2 === 1
                    ? "bg-secondary dark:bg-dim"
                    : ""
                }
              >
                {selectionMode === "multiple" && (
                  <td
                    className={`p-2 min-w-fit border-collapse border-border dark:border-coal ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    <Checkbox
                      checked={selectedRows.some(
                        (row) => (row as any).code === (item as any).code
                      )}
                      onChange={() => toggleRowSelection(item)}
                    />
                  </td>
                )}
                {columns.map((col: any, colIndex: number) => (
                  <td
                    key={colIndex}
                    className={`p-2 min-w-fit whitespace-nowrap border-collapse border-border dark:border-coal text-deep dark:text-light ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                    onDoubleClick={() =>
                      col.props.editable &&
                      handleDoubleClick(
                        rowIndex,
                        col.props.field,
                        item[col.props.field]
                      )
                    }
                  >
                    {renderEditor(col.props, item, rowIndex)}
                  </td>
                ))}

                {/* Action Buttons Column*/}
                {showActions && (
                  <td
                    className={`p-2 min-w-fit border-collapse border-border dark:border-coal ${
                      showGridlines ? "border-2" : "border-b"
                    }`}
                  >
                    {useEllipsis ? (
                      <div className="relative cursor-pointer max-w-fit ml-auto">
                        <FaEllipsisV
                          onClick={() => handleDropdownToggle(rowIndex)}
                          className=" text-deep dark:text-light"
                        />
                        {dropdownStates[rowIndex] && (
                          <div className="absolute right-0 top-full z-50 flex flex-col items-start  gap-1 bg-primary dark:bg-shade border border-border dark:border-coal rounded shadow p-2 dropdown-menu">
                            <button
                              type="button"
                              onClick={() => handleView(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              <FaEye className="text-sm text-deep dark:text-light group-hover:text-highlight dark:group-hover:text-ocean" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              <FaPenSquare className="text-sm text-deep dark:text-light group-hover:text-gold dark:group-hover:text-accent" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                            >
                              {" "}
                              <FaTrash className="text-sm text-deep dark:text-light group-hover:text-alert dark:group-hover:text-crimson" />
                              Delete
                            </button>
                            {customActions?.map((action, index) => (
                              <button
                                type="button"
                                key={index}
                                onClick={() => action.onClick(item)}
                                className="flex items-center gap-2 w-full p-1 px-2 runded-md whitespace-nowrap hover:bg-tertiary hover:dark:bg-shadow group transition-all ease-linear duration-200 rounded-md text-soft dark:text-pale"
                              >
                                {action.icon && (
                                  <span className="text-deep dark:text-light group-hover:text-black dark:group-hover:text-white">
                                    {action.icon}
                                  </span>
                                )}
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          aria-label="View-Row"
                          onClick={() => handleView(item)}
                          className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                        >
                          <FaEye className="text-deep dark:text-light group-hover:text-highlight dark:group-hover:text-ocean" />
                        </button>
                        <button
                          aria-label="Edit-Row"
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                        >
                          <FaPenSquare className="text-deep dark:text-light group-hover:text-gold dark:group-hover:text-accent" />
                        </button>
                        <button
                          aria-label="Delete-row"
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                        >
                          <FaTrash className="text-deep dark:text-light group-hover:text-alert dark:group-hover:text-crimson" />
                        </button>
                        {customActions?.map((action, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => action.onClick(item)}
                            className="size-8 justify-center bg-secondary hover:bg-tertiary dark:bg-shade dark:hover:bg-shadow rounded-md group transition-all ease-linear duration-200 whitespace-nowrap flex items-center gap-2"
                          >
                            {action.icon && (
                              <span className="text-deep dark:text-light group-hover:text-black dark:group-hover:text-white">
                                {action.icon}
                              </span>
                            )}
                            <span className="hidden">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginator */}
      {paginator && (
        <Paginator
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRecords={filteredValue.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        visible={showConfirmAction}
        message="Are you sure you want to proceed?"
        position="top"
        onAccept={handleConfirm}
        onReject={() => setShowConfirmAction(false)}
        onHide={() => setShowConfirmAction(false)}
      />
    </div>
  );
};
