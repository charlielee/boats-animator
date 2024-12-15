import { Slider } from "@mantine/core";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiSliderProps {
  value?: number;
  min: number;
  max: number;
  step?: number;
  inList?: boolean;
  onChange?: (newValue: number) => void;
}

export const UiSlider = ({ value, min, max, step, onChange }: UiSliderProps) => (
  <Slider
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={onChange}
    color={SemanticColor.PRIMARY}
  />
);
