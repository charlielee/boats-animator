import { Group } from "@mantine/core";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { useState } from "react";
import { ImagingDeviceResolution } from "../../../../services/imagingDevice/ImagingDeviceResolution";
import { UiButton } from "../../../ui/UiButton/UiButton";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { Text } from "@mantine/core";

interface CustomResolutionInputProps {
  initialResolution: ImagingDeviceResolution | undefined;
  onChangeResolution: (resolution: ImagingDeviceResolution) => void;
}

export const CustomResolutionInput = ({
  initialResolution,
  onChangeResolution,
}: CustomResolutionInputProps) => {
  const [width, setWidth] = useState<number | undefined>(initialResolution?.width);
  const [height, setHeight] = useState<number | undefined>(initialResolution?.height);

  const handleChangeResolution = () => {
    if (width !== undefined && height !== undefined) {
      onChangeResolution?.({ width, height });
    }
  };

  return (
    <Group align="flex-end">
      <UiNumberInput
        label="Width"
        value={width}
        placeholder="0"
        min={1}
        max={9999}
        onChange={setWidth}
      />
      <UiNumberInput
        label="Height"
        value={height}
        placeholder="0"
        min={1}
        max={9999}
        onChange={setHeight}
      />
      <UiButton semanticColor={SemanticColor.PRIMARY} onClick={handleChangeResolution}>
        Set Resolution
      </UiButton>
    </Group>
  );
};
