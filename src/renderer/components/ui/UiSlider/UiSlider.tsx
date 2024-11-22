import { Slider } from "@mantine/core";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiNumberInputProps {
  label: string;
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (newValue: number) => void;
}

export const UiSlider = ({ label, value, min, max, step, onChange }: UiNumberInputProps) => (
  <Slider
    label={label}
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={onChange}
    color={SemanticColor.PRIMARY}
  />
);
