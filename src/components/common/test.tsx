<div className={`relative overflow-x-auto z-30`}>
  <table
    ref={contentRef}
    className={`min-w-full border-collapse border-border dark:border-coal ${
      showGridlines ? "table-fixed border-2" : "border-b border-t"
    }`}
  >
    <thead>
      {/* ... */}
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
          {/* Other cells */}

          {/* Action Buttons Column */}
          {showActions && (
            <td
              className={`p-2 min-w-fit border-collapse border-border dark:border-coal ${
                showGridlines ? "border-2" : "border-b"
              }`}
            >
              <div className="relative cursor-pointer text-right">
                <FaEllipsisV
                  onClick={() => handleDropdownToggle(rowIndex)}
                  className="text-deep dark:text-light"
                />
                {dropdownStates[rowIndex] && (
                  <div className="absolute right-0 z-50 flex flex-col items-start gap-1 bg-primary dark:bg-shade border border-border dark:border-coal rounded shadow p-2 dropdown-menu">
                    {/* Dropdown items */}
                  </div>
                )}
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>
