import React, { useRef, useEffect } from "react";
import SelectDropdown from "@/components/form/inputs/SelectDropdown";

interface Option<V = string | number> { // Changed from boolean
  value: V;
  label: string;
}

interface ColumnProps<T, V = string | number | boolean> {
  field: keyof T;
  header: string;
  editable?: boolean;
  editorType?: 'input' | 'select';
  options?: Option<V>[];
  multiple?: boolean;
}

interface TableCellEditorProps<T, V = string | number | boolean> {
  col: ColumnProps<T>; 
  item: T;
  rowIndex: number;
  editValue: V | V[];
  editingCell: { row: number; field: keyof T } | null;
  onEditComplete: () => void;
  onValueChange: (value: string | string[]) => void;
  setEditingCell: (cell: { row: number; field: keyof T } | null) => void;
}

const TableCellEditor = function <T>({
  col,
  editValue,
  editingCell,
  rowIndex,
  onEditComplete,
  onValueChange,
  setEditingCell,
}: TableCellEditorProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string | string[]) => {
    onValueChange(value);
  };

  const handleBlur = () => {
    onEditComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onEditComplete();
    } else if (e.key === "Escape") {
      onValueChange("");
      setEditingCell(null);
    }
  };

  useEffect(() => {
    if (editingCell?.row === rowIndex && editingCell.field === col.field) {
      if (col.editorType === "input") inputRef.current?.focus();
    }
  }, [editingCell, rowIndex, col.field, col.editorType]);

  if (col.editable && editingCell?.row === rowIndex && editingCell.field === col.field) {
    if (col.editorType === "select" && col.options) {
      const filteredOptions = col.options.filter(option => 
        typeof option.value === 'string' || typeof option.value === 'number'
      );

      const valueToPass: string | string[] | undefined = Array.isArray(editValue)
        ? (editValue as string[])
        : typeof editValue === 'string'
        ? editValue
        : undefined;

      return (
        <SelectDropdown
          options={filteredOptions}
          value={valueToPass}
          onChange={handleChange}
          onBlur={handleBlur}
          multiple={col.multiple}
        />
      );
    } else if (col.editorType === "input") {
      return (
        <input
          aria-label="Edit Cell"
          ref={inputRef}
          type="text"
          value={editValue as string}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="p-1 border-2 w-80 border-border dark:border-coal bg-primary dark:bg-shade text-deep dark:text-light rounded-md focus:outline-none focus:border-highlight dark:focus:border-ocean max-w-fit"
        />
      );
    }
  }

  return null;
};

export default TableCellEditor;
