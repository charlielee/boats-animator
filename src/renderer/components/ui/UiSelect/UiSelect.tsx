import { ComboboxData, ComboboxItem, Select } from "@mantine/core";

interface UiSelectProps {
  label: string;
  placeholder?: string;
  data: ComboboxData;
  value: string | undefined;
  onChange: (value: string | undefined, option: ComboboxItem) => void;
}

export const UiSelect = ({ label, placeholder, data, value, onChange }: UiSelectProps) => {
  const formatValue = value === undefined ? null : value;

  const handleChange = (value: string | null, option: ComboboxItem) => {
    const formatNewValue = value === null ? undefined : value;
    onChange(formatNewValue, option);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      value={formatValue}
      onChange={handleChange}
    />
  );
};
