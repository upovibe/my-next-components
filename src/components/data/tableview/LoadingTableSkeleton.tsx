import React from "react";
import SkeletonLoader from "@/components/loader/SkeletonLoader";

interface ColumnProps<T> {
  field: keyof T;
  header: string;
  template?: (rowData: T) => React.ReactNode;
}

interface LoadingTableSkeletonProps {
  columns?: ColumnProps<any>[];
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPageOptions?: number[];
  size?: "sm" | "nm" | "lg";
  className?: string;
}

const LoadingTableSkeleton: React.FC<LoadingTableSkeletonProps> = ({
  columns = [],
  showGridlines = false,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 20],
  size = "nm",
  className = "",
}) => {
  const sizeClass = {
    sm: "p-1 text-sm",
    nm: "p-2 text-base",
    lg: "p-3 text-lg",
  }[size];

  const rowCount = rowsPerPageOptions[0] || 5;

  return (
    <div className="pb-10 ">
      <div className="overflow-x-auto">
        <table
          className={`w-full border-collapse border-border dark:border-coal ${
            showGridlines ? "border-2 border-gray-300" : "border-b border-t"
          }`}
        >
          <thead>
            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={colIndex}
                  className={`border-collapse border-border dark:border-coal bg-secondary dark:bg-dim ${sizeClass} ${
                    showGridlines ? "border-2 border-gray-300" : "border-b"
                  } ${
                    stripedRows ? "bg-secondary dark:bg-dim" : ""
                  } font-medium text-left`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  stripedRows && rowIndex % 2 === 1
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                } hover:bg-highlight/30 dark:hover:dark:bg-ocean/30`}
              >
                {columns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${sizeClass} border-collapse border-border dark:border-coal ${
                      showGridlines ? "border" : "border-b"
                    } text-center`}
                  >
                    <SkeletonLoader className="p-4 rounded-md" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingTableSkeleton;
