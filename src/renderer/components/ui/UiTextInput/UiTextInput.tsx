import { TextInput } from "@mantine/core";
import { ReactNode } from "react";

interface UiTextInputProps {
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  // TODO make a button prop
  rightSection?: ReactNode;
  onChange?: (newValue: string) => void;
}

export const UiTextInput = ({
  label,
  value,
  placeholder,
  disabled = false,
  readOnly = false,
  error,
  rightSection,
  onChange,
}: UiTextInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(event.target.value);

  return (
    <TextInput
      label={label}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      rightSection={rightSection}
      rightSectionWidth="a"
      onChange={handleChange}
    />
  );
};
