import React from 'react';
import { FaChevronLeft, FaChevronRight, FaFastBackward, FaFastForward } from 'react-icons/fa';

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

  const handleFirstPage = () => {
    if (currentPage > 0) {
      onPageChange(0);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(totalPages - 1);
    }
  };

  // Calculate the range of pages to display
  const pageNumbers = [];
  const maxVisiblePages = 5; // Maximum number of page numbers to display
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i + 1); // Use one-based index for display
  }

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
      <div className="flex items-center justify-center gap-2">
        <button
          aria-label="first-page-button"
          type="button"
          onClick={handleFirstPage}
          className="flex items-center rounded-full justify-center size-8 hover:bg-tertiary dark:hover:bg-shadow font-light text-soft dark:text-pale transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === 0}
        >
          <FaFastBackward />
        </button>
        <button
          aria-label="previous-button"
          type="button"
          onClick={handlePrevPage}
          className="flex items-center rounded-full justify-center size-8 rounded-fullfont-light text-soft dark:text-pale hover:bg-tertiary dark:hover:bg-shadow  transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === 0}
        >
          <FaChevronLeft />
        </button>
        
        {/* Page number buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {startPage > 0 && (
            <>
              <button
              type='button'
              aria-label='1'
                onClick={() => onPageChange(0)} // Jump to the first page
                className={`flex items-center justify-center size-8 rounded  hover:bg-tertiary dark:hover:bg-shadow  transition-all duration-200 ease-linear ${currentPage === 0 ? 'bg-highlight text-light ' : 'text-soft dark:text-pale'}`}
              >
                1
              </button>
              {startPage > 1 && <span className="flex items-center text-soft dark:text-pale">...</span>} {/* Ellipsis */}
            </>
          )}
          {pageNumbers.map((number) => (
            <button
            type='button'
            aria-label='number'
              key={number}
              onClick={() => onPageChange(number - 1)} // Change to zero-based index
              className={`flex items-center justify-center size-8 rounded hover:bg-tertiary dark:hover:bg-shadow  transition-all duration-200 ease-linear ${currentPage === number - 1 ? 'bg-highlight text-white' : 'text-soft dark:text-pale'}`}
            >
              {number}
            </button>
          ))}
          {endPage < totalPages - 1 && (
            <>
              {endPage < totalPages - 2 && <span className="flex items-center text-soft dark:text-pale">...</span>} {/* Ellipsis */}
              <button
              aria-label='total-page'
              type='button'
                onClick={() => onPageChange(totalPages - 1)} // Jump to the last page
                className={`flex items-center justify-center size-8 rounded hover:bg-tertiary dark:hover:bg-shadow transition-all duration-200 ease-linear ${currentPage === totalPages - 1 ? 'bg-highlight text-white' : 'text-soft dark:text-pale'}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          aria-label="next-button"
          type="button"
          onClick={handleNextPage}
          className="flex items-center justify-center size-8 rounded-full hover:bg-tertiary dark:hover:bg-shadow font-light text-soft dark:text-pale transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === totalPages - 1}
        >
          <FaChevronRight />
        </button>
        <button
          aria-label="last-page-button"
          type="button"
          onClick={handleLastPage}
          className="flex items-center justify-center size-8 rounded-full hover:bg-tertiary dark:hover:bg-shadow font-light text-soft dark:text-pale transition-all duration-200 ease-linear cursor-pointer"
          disabled={currentPage === totalPages - 1}
        >
          <FaFastForward />
        </button>
      </div>

      {/* Display total pages */}
      <span className="text-soft dark:text-pale">
        Page {currentPage + 1} of {totalPages}
      </span>
    </div>
  );
};

export default Paginator;
