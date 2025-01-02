import { NumberInput, NumberInputProps } from "@mantine/core";

interface UiNumberInputProps {
  label?: string;
  value?: number;
  placeholder?: string;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  error?: string;
  inList?: boolean;
  onChange?: (newValue: number) => void;
  id?: string;
}

export const UiNumberInput = ({
  label,
  value,
  placeholder,
  min,
  max,
  step,
  suffix,
  error,
  inList = false,
  id,
  onChange,
}: UiNumberInputProps) => {
  const inListProps: NumberInputProps = inList ? { size: "xs", variant: "unstyled" } : {};

  const handleChange = (newValue: number | string) => {
    if (Number.isFinite(newValue)) {
      onChange?.(newValue as number);
    }
  };

  return (
    <NumberInput
      label={label}
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      suffix={suffix}
      error={error}
      onChange={handleChange}
      id={id}
      {...inListProps}
    />
  );
};
