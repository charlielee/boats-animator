import { ComboboxData, ComboboxItem, Select, SelectProps } from "@mantine/core";

interface UiSelectProps<T> {
  label?: string;
  placeholder: string;
  data: ComboboxData;
  value: T | undefined;
  inList?: boolean;
  onChange: (value: T | undefined, option: ComboboxItem) => void;
}

export const UiSelect = <T extends string>({
  label,
  placeholder,
  data,
  value,
  inList = false,
  onChange,
}: UiSelectProps<T>) => {
  const inListProps: SelectProps = inList ? { size: "xs" } : {};

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
      {...inListProps}
    />
  );
};
