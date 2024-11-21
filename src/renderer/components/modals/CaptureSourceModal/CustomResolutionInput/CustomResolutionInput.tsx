import { Group } from "@mantine/core";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { useState } from "react";
import { ImagingDeviceResolution } from "../../../../services/imagingDevice/ImagingDeviceResolution";

interface CustomResolutionInputProps {
  initialResolution: ImagingDeviceResolution | undefined;
}

export const CustomResolutionInput = ({ initialResolution }: CustomResolutionInputProps) => {
  const [width, setWidth] = useState<undefined | number>(initialResolution?.width);
  const [height, setHeight] = useState<undefined | number>(initialResolution?.height);

  return (
    <Group>
      <UiNumberInput
        label="Width"
        value={width}
        placeholder="0"
        min={1}
        max={9999}
        onChange={setWidth}
      />
      ×
      <UiNumberInput
        label="Height"
        value={height}
        placeholder="0"
        min={1}
        max={9999}
        onChange={setHeight}
      />
    </Group>
  );
};
