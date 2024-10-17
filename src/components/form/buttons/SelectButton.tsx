import React from 'react';

// Update the Option interface to allow for ReactNode as label
interface Option {
  label: React.ReactNode; // Allow for any React node
  value?: any;
  disabled?: boolean;
}

interface SelectButtonProps {
  options: Option[] | string[];
  value: any[] | any;
  onChange: (value: any[] | any) => void;
  multiple?: boolean;
  disabled?: boolean;
  optionLabel?: string;
  optionValue?: string;
  itemTemplate?: (option: Option) => React.ReactNode;
  className?: string;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  options,
  value,
  onChange,
  multiple,
  disabled,
  optionLabel = 'label',
  optionValue = 'value',
  itemTemplate,
  className = '',
}) => {
  // Normalize value to be an array if multiple is true
  const normalizedValue = Array.isArray(value) ? value : multiple ? [] : value;

  // Handle option selection
  const handleSelect = (option: Option | string) => {
    if (disabled) return;

    // Handle both string and Option types
    const selectedValue = typeof option === 'string' ? option : option.value;

    if (multiple) {
      const newValue = normalizedValue.includes(selectedValue)
        ? normalizedValue.filter((v: any) => v !== selectedValue)
        : [...normalizedValue, selectedValue];
      onChange(newValue);
    } else {
      onChange(selectedValue);
    }
  };

  // Render the options
  const renderOptions = () => {
    return options.map((option: Option | string, index: number) => {
      // Handle both string and Option types
      const selectedValue = typeof option === 'string' ? option : option[optionValue as keyof Option];
      const selectedLabel = typeof option === 'string' ? option : option[optionLabel as keyof Option];
      const isSelected = multiple
        ? normalizedValue.includes(selectedValue)
        : normalizedValue === selectedValue;
      const isDisabled = typeof option !== 'string' && option.disabled;

      return (
        <button
        type="button"
        key={selectedValue}
        onClick={() => handleSelect(option)}
        disabled={isDisabled || disabled}
        className={`rounded-md transition-all ease-linear duration-200 ${className} 
                    ${isSelected ? 'bg-highlight dark:bg-ocean text-light' : 'bg-muted text-light'} 
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'dark:text-light hover:bg-highlight/50'} 
                     dark:text-light dark:hover:bg-ocean/50`}
      >
        {itemTemplate ? itemTemplate(option as Option) : selectedLabel}
      </button>
      
      );
    });
  };

  return (
    <div className={`flex ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {renderOptions()}
    </div>
  );
};

export default SelectButton;
