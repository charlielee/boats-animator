import { Slider, SliderProps } from "@mantine/core";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiSliderProps {
  value?: number;
  min: number;
  max: number;
  step?: number;
  inList?: boolean;
  onChange?: (newValue: number) => void;
}

export const UiSlider = ({ value, min, max, step, inList = false, onChange }: UiSliderProps) => {
  const inListProps: SliderProps = inList ? { size: "xs" } : {};

  return (
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      color={SemanticColor.PRIMARY}
      {...inListProps}
    />
  );
};
