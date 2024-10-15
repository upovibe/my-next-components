const renderEditor = (col: ColumnProps, item: T, rowIndex: number) => {
  // Check if the column is editable and if it matches the current editing cell
  if (col.editable && editingCell?.row === rowIndex && editingCell.field === col.field) {
    if (col.editorType === "select" && col.options) {
      return (
        <select
          ref={editingRef} // Use the editingRef here
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Choose an option" // Provide an accessible name
        >
          {col.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else if (col.editorType === "input") {
      return (
        <input
          ref={editingRef} // Use the editingRef here
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      );
    } else if (col.editorType === "file") {
      return (
        <input
          aria-label="file"
          ref={editingRef} // Use the editingRef here
          type="file"
          onChange={(e) => handleFileChange(e, col.field, rowIndex)}
          onBlur={handleBlur}
        />
      );
    }
  }
  return (item as any)[col.field]; // Default to displaying the field value if not editing
};
