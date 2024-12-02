import { ComboboxData, ComboboxItem, Select } from "@mantine/core";

interface UiSelectProps<T> {
  label?: string;
  placeholder: string;
  data: ComboboxData;
  value: T | undefined;
  onChange: (value: T | undefined, option: ComboboxItem) => void;
}

export const UiSelect = <T extends string>({
  label,
  placeholder,
  data,
  value,
  onChange,
}: UiSelectProps<T>) => {
  const formatValue = value === undefined ? null : value;

  const handleChange = (value: string | null, option: ComboboxItem) => {
    const formatNewValue = value === null ? undefined : (value as T);
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
