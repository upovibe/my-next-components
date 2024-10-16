import React, { useState, useEffect } from 'react';
import Paginator from '@/components/data/Paginator';
import SelectButton from '@/components/form/buttons/SelectButton';
import { FaThLarge, FaList } from 'react-icons/fa';
import SkeletonLoader from '@/components/loader/SkeletonLoader'; // Import the SkeletonLoader component

interface DataViewProps<T> {
  value: T[];
  listTemplate: (item: T) => React.ReactNode;
  rows?: number;
  paginator?: boolean;
  rowsPerPageOptions?: number[];
  sortField?: keyof T;
  sortOrder?: 'asc' | 'desc';
  layout?: 'list' | 'grid';
  searchField?: keyof T;
  showLayoutSwitcher?: boolean;
  loading?: boolean;
  className?: string; // Add className as a string prop
}

const DataView = <T extends object>({
  value,
  rows = 10,
  paginator,
  rowsPerPageOptions = [5, 10, 20],
  sortField: initialSortField,
  sortOrder: initialSortOrder = 'asc',
  layout: initialLayout = 'list',
  searchField,
  showLayoutSwitcher,
  className = '', // Default to an empty string if no className is provided
  listTemplate,
}: DataViewProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [layout, setLayout] = useState<'list' | 'grid'>(initialLayout);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Simulate loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter the data based on the search term if searchField is provided
  const filteredData = value.filter(item => {
    if (!searchField || !searchTerm) return true;
    const fieldValue = item[searchField] as unknown as string;
    return fieldValue?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const totalRecords = filteredData.length;
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = filteredData.slice(start, end);

  // Sorting logic
  const sortedData = sortField
    ? [...paginatedData].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    : paginatedData;

  // Layout logic
  const renderData = sortedData.map((item, index) => (
    <div key={index} className={`item-${layout} ${layout === 'grid' ? 'p-2' : 'py-5 border-b border-border dark:border-coal'}`}>
      {listTemplate(item)}
    </div>
  ));

  // Sorting options
  const sortOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  // Layout options for SelectButton with react-icons
  const layoutOptions = [
    { label: <FaList />, value: 'list' },
    { label: <FaThLarge />, value: 'grid' },
  ];

  return (
    <div className={`data-view-component ${layout} ${className}`}> {/* Apply className prop here */}
      {/* Sorting, Search, and Layout selection */}
      <div className="controls mb-4 flex gap-4 items-center">
        {/* Search Input */}
        <div className="search-input w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-dropdown">
          <label htmlFor="sortField" className="mr-2">Sort By:</label>
          <select
            id="sortField"
            className="border rounded px-2 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            {sortOptions.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conditionally render Layout selection using SelectButton */}
        {showLayoutSwitcher && (
          <div className="layout-selection">
            <SelectButton
              options={layoutOptions}
              value={layout}
              onChange={(value) => setLayout(value)}
            />
          </div>
        )}
      </div>

      {/* Data rendering */}
      <div className={`data-view-content grid grid-cols-1 ${layout === 'grid' ? 'md:grid-cols-3' : ''}`}>
        {loading ? (
          <SkeletonLoader 
            className={`p-10 ${layout === 'grid' ? 'h-48' : 'h-12'} w-full`} 
            count={layout === 'grid' ? 9 : 5} 
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
