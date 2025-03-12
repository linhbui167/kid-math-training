import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedValues || []);

  const handleSelection = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => handleSelection(option.value)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </>
  );
};

export default CheckboxGroup;
