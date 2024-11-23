import { Slider, Stack, Text } from "@mantine/core";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiNumberInputProps {
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (newValue: number) => void;
}

export const UiSlider = ({ value, min, max, step, onChange }: UiNumberInputProps) => (
  <Stack>
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      color={SemanticColor.PRIMARY}
    />
  </Stack>
);
