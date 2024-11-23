import { NumberInput, NumberInputProps } from "@mantine/core";
import { useState } from "react";

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
      {...inListProps}
    />
  );
};
