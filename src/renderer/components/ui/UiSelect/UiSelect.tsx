import { ComboboxData, ComboboxItem, Select } from "@mantine/core";

interface UiSelectProps {
  label: string;
  placeholder: string;
  data: ComboboxData;
  value: string | null;
  onChange: (value: string | null, option: ComboboxItem) => void;
}

export const UiSelect = ({ label, placeholder, data, value, onChange }: UiSelectProps) => (
  <Select label={label} placeholder={placeholder} data={data} value={value} onChange={onChange} />
);
