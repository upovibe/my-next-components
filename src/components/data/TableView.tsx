import React, { ReactNode, useState, useEffect } from "react";
import {
  FaSort,
  FaSortAmountUp,
  FaSortAmountDown,
  FaFilter,
} from "react-icons/fa";
import Paginator from "@/components/data/Paginator";
import LoadingTableSkeleton from "@/components/data/tableview/LoadingTableSkeleton";
import Checkbox from "@/components/form/Checkbox";
import TableToolbar from "@/components/data/tableview/TableToolbar";
import TableCellEditor from "@/components/data/tableview/TableCellEditor";

interface ColumnProps<T, V = string | number | boolean> {
  field: keyof T;
  header: string;
  template?: (rowData: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  selectionMode?: "single" | "multiple";
  editable?: boolean;
  editorType?: "input" | "select";
  options?: { label: string; value: V }[];
  className?: string;
  children?: ReactNode;
}

const TableCol = <T,>({ className, children }: ColumnProps<T>) => {
  return <div className={className}>{children}</div>;
};

interface TableViewProps<T> {
  icon?: React.ReactNode;
  title: string;
  value: T[];
  size?: "sm" | "nm" | "lg";
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPageOptions?: number[];
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  loadingDelay?: number;
  removableSort?: boolean;
  globalFilterFields?: (keyof T)[];
  selectionMode?: "single" | "multiple";
  hoverEffect?: "row" | "cell";
  showPrintButton?: boolean;
  onRowSelect?: (row: T) => void;
  onRowUnselect?: (row: T) => void;
  onCellSelect?: (row: T, field: keyof T) => void;
  onCellUnselect?: (row: T, field: keyof T) => void;
  onDeleteAll?: () => void;
  onAddRow?: () => void;
  onPrint?: () => void;
}

const TableView = function <T>({
  icon,
  title,
  value,
  size = "nm",
  showGridlines = false,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 20],
  children,
  className = "",
  isLoading = false,
  loadingDelay = 3000,
  removableSort = false,
  globalFilterFields = [],
  selectionMode,
  hoverEffect = "row",
  showPrintButton = false,
  onRowSelect,
  onRowUnselect,
  onCellSelect,
  onCellUnselect,
  onDeleteAll,
  onAddRow,
  onPrint,
}: TableViewProps<T>) {
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(isLoading);
  const [sortedData, setSortedData] = useState(value);
  const [currentSortField, setCurrentSortField] = useState<keyof T | null>(
    null
  );
  const [currentSortOrder, setCurrentSortOrder] = useState<1 | -1 | 0>(0);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filterValues, setFilterValues] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set<T>());
  const [selectedCells, setSelectedCells] = useState<Map<T, Set<keyof T>>>(
    new Map()
  );
  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: keyof T;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(
        () => setShowLoadingSkeleton(false),
        loadingDelay
      );
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDelay]);

  const columns = React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement(child) && child.type === TableCol) {
        return child.props as ColumnProps<T>;
      }
      return null;
    })
    .filter((col): col is ColumnProps<T> => col !== null);

  const totalRecords = sortedData.length;
  const paginatedData = sortedData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  useEffect(() => {
    let filteredData = [...value];

    if (globalFilter && globalFilterFields.length > 0) {
      filteredData = filteredData.filter((item) =>
        globalFilterFields.some((field) =>
          String(item[field]).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    Object.keys(filterValues).forEach((field) => {
      const filterValue = filterValues[field as keyof T];
      if (filterValue) {
        filteredData = filteredData.filter((item) =>
          String(item[field as keyof T])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    });

    let sorted = filteredData;
    if (currentSortField) {
      sorted = [...filteredData].sort((a, b) => {
        if (currentSortOrder === 1) {
          return String(a[currentSortField]).localeCompare(
            String(b[currentSortField])
          );
        } else if (currentSortOrder === -1) {
          return String(b[currentSortField]).localeCompare(
            String(a[currentSortField])
          );
        }
        return 0;
      });
    }

    setSortedData(sorted);
  }, [
    value,
    globalFilter,
    filterValues,
    currentSortField,
    currentSortOrder,
    globalFilterFields,
  ]);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= Math.ceil(totalRecords / rowsPerPage)) return;
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const handleSort = (field: keyof T) => {
    let newOrder: 1 | -1 | 0;

    if (currentSortField === field) {
      if (currentSortOrder === 1) {
        newOrder = -1;
      } else if (currentSortOrder === -1) {
        newOrder = removableSort ? 0 : 1;
      } else {
        newOrder = 1;
      }
    } else {
      newOrder = 1;
    }

    setCurrentSortField(field);
    setCurrentSortOrder(newOrder);
  };

  const handleFilterChange = (field: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleRowSelect = (row: T) => {
    setSelectedRows((prev) => {
      const updated = new Set<T>(prev);
      if (selectionMode === "multiple") {
        if (updated.has(row)) {
          updated.delete(row);
        } else {
          updated.add(row);
        }
      } else {
        updated.clear();
        updated.add(row);
      }
      onRowSelect?.(row);
      return updated;
    });
  };

  const handleCellSelect = (row: T, field: keyof T, e: React.MouseEvent) => {
    if (selectionMode) {
      const isSelected = selectedCells.get(row)?.has(field);
      const isMetaKey = e.metaKey || e.ctrlKey;

      if (selectionMode === "multiple" && isMetaKey) {
        const updatedCells = selectedCells.get(row) || new Set<keyof T>();
        if (isSelected) {
          updatedCells.delete(field);
          onCellUnselect?.(row, field);
        } else {
          updatedCells.add(field);
          onCellSelect?.(row, field);
        }

        setSelectedCells((prev) => {
          const newMap = new Map(prev);
          if (updatedCells.size > 0) {
            newMap.set(row, updatedCells);
          } else {
            newMap.delete(row);
          }
          return newMap;
        });
      } else if (selectionMode === "single") {
        setSelectedCells(
          new Map<T, Set<keyof T>>([[row, new Set<keyof T>([field])]])
        );
        onCellSelect?.(row, field);
      }
    }
  };

  const toggleSelectAll = () => {
    const allSelected = paginatedData.every((row) => selectedRows.has(row));
    const newSelectedRows = new Set<T>(allSelected ? [] : paginatedData);
    setSelectedRows(newSelectedRows);
    paginatedData.forEach((row) =>
      allSelected ? onRowUnselect?.(row) : onRowSelect?.(row)
    );
  };

  const applyEditValue = (
    rowIndex: number,
    field: keyof T,
    newValue: string
  ) => {
    setSortedData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [field]: newValue };
      return updatedData;
    });
  };

  const renderEditor = (col: ColumnProps<T>, item: T, rowIndex: number) => {
    if (editingCell?.row === rowIndex && editingCell.field === col.field) {
      return (
        <TableCellEditor
          col={col}
          item={item}
          rowIndex={rowIndex}
          editValue={editValue}
          editingCell={editingCell}
          onEditComplete={() => {
            applyEditValue(rowIndex, col.field, editValue);
            setEditingCell(null);
          }}
          onValueChange={(value) => setEditValue(value)}
          setEditingCell={setEditingCell}
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`${className} bg-primary dark:bg-shade p-3 rounded-xl border border-border dark:border-coal`}
    >
      <TableToolbar
        icon={icon}
        title={title}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        globalFilterFields={globalFilterFields.length > 0}
        selectionMode={selectionMode}
        selectedRowsCount={selectedRows.size}
        onDeleteAll={onDeleteAll}
        onAddRow={onAddRow}
        onPrint={onPrint}
        showPrintButton={showPrintButton}
      />

      {showLoadingSkeleton ? (
        <LoadingTableSkeleton
          columns={columns}
          showGridlines={showGridlines}
          stripedRows={stripedRows}
          size={size}
          rowsPerPageOptions={rowsPerPageOptions}
          className={className}
        />
      ) : (
        <div className="pb-10 ">
          <div className="overflow-x-auto">
            <table
              className={`min-w-full table-auto border-collapse border-border dark:border-coal ${
                showGridlines ? "border" : "border-b border-t"
              }`}
            >
              <thead>
                <tr className="bg-secondary dark:bg-dim">
                  {selectionMode && (
                    <th
                      className={`${sizeClass} ${
                        showGridlines ? "border" : "border-b"
                      } ${
                        stripedRows ? "bg-secondary dark:bg-dim" : ""
                      } border-collapse border-border dark:border-coal`}
                    >
                      <Checkbox
                        checked={selectedRows.size === paginatedData.length}
                        indeterminate={
                          selectedRows.size > 0 &&
                          selectedRows.size < paginatedData.length
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th
                      key={String(col.field)}
                      onClick={() => col.sortable && handleSort(col.field)}
                      className={` whitespace-nowrap border-collapse border-border dark:border-coal ${sizeClass} font-medium text-left ${
                        showGridlines ? "border" : "border-b"
                      } ${stripedRows ? "bg-secondary dark:bg-dim" : ""} ${
                        col.sortable ? "cursor-pointer" : ""
                      } ${col.className || ""}`}
                    >
                      {col.header}
                      {col.sortable &&
                        currentSortField === col.field &&
                        currentSortOrder === 1 && (
                          <FaSortAmountUp className="inline ml-2" />
                        )}
                      {col.sortable &&
                        currentSortField === col.field &&
                        currentSortOrder === -1 && (
                          <FaSortAmountDown className="inline ml-2" />
                        )}
                      {col.sortable &&
                        currentSortField === col.field &&
                        currentSortOrder === 0 && (
                          <FaSort className="inline ml-2" />
                        )}
                      {col.sortable && currentSortField !== col.field && (
                        <FaSort className="inline ml-2" />
                      )}
                      {col.filterable && (
                        <div className="relative inline-flex items-center">
                          <input
                            aria-label="text"
                            type="text"
                            value={filterValues[col.field as keyof T] || ""}
                            onChange={(e) =>
                              handleFilterChange(
                                col.field as keyof T,
                                e.target.value
                              )
                            }
                            className="pr-5 p-1 border-2 max-w-52 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md cursor-text focus:outline-none focus:border-highlight dark:focus:border-ocean"
                          />
                          <FaFilter className="absolute right-3 text-gray-500" />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => handleRowSelect(row)}
                    className={` whitespace-nowrap border-collapse border-border dark:border-coal ${
                      stripedRows && rowIndex % 2 === 1
                        ? "bg-secondary dark:bg-dim"
                        : ""
                    } ${showGridlines ? "border" : "border-b"} ${
                      selectedRows.has(row)
                        ? "bg-highlight/40 dark:bg-ocean/40"
                        : ""
                    } ${
                      hoverEffect === "row"
                        ? "cursor-pointer hover:bg-highlight/30 dark:hover:dark:bg-ocean/30"
                        : "default"
                    }`}
                  >
                    {selectionMode && (
                      <td
                        className={`${sizeClass} ${
                          showGridlines ? "border" : "border-b"
                        } whitespace-nowrap border-collapse border-border dark:border-coal`}
                      >
                        <Checkbox checked={selectedRows.has(row)} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={String(col.field)}
                        className={`${sizeClass} whitespace-nowrap border-collapse border-border dark:border-coal ${
                          showGridlines ? "border" : "border-b"
                        } ${
                          hoverEffect === "cell"
                            ? "cursor-pointer hover:bg-highlight/30 dark:hover:dark:bg-ocean/30"
                            : "default"
                        } ${col.className || ""}`}
                        onClick={(e) => handleCellSelect(row, col.field, e)}
                        onDoubleClick={() => {
                          if (col.editable) {
                            setEditingCell({ row: rowIndex, field: col.field });
                            setEditValue(row[col.field]?.toString() || "");
                          }
                        }}
                      >
                        {editingCell?.row === rowIndex &&
                        editingCell.field === col.field
                          ? renderEditor(col, row, rowIndex)
                          : col.template
                          ? col.template(row)
                          : String(row[col.field as keyof T])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Paginator
        rowsPerPage={rowsPerPage}
        totalRecords={totalRecords}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  );
};

export { TableView, TableCol };
