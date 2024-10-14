import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginatorProps {
  rowsPerPage: number;
  totalRecords: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  rowsPerPageOptions: number[];
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

export default Paginator;
