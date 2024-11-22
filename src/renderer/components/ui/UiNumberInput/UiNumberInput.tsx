import { NumberInput } from "@mantine/core";
import { useState } from "react";

interface UiNumberInputProps {
  label: string;
  value?: number;
  placeholder?: string;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  error?: string;
  onChange?: (newValue: number) => void;
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
  onChange,
}: UiNumberInputProps) => {
  const [rawValue, setRawValue] = useState<number | string | undefined>(value?.toString(10));

  const handleChange = (newValue: number | string) => {
    setRawValue(newValue);
    if (Number.isFinite(newValue)) {
      onChange?.(newValue as number);
    }
  };

  return (
    <NumberInput
      label={label}
      value={rawValue}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      suffix={suffix}
      error={error}
      onChange={handleChange}
    />
  );
};
