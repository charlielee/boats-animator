import { Input } from "@mantine/core";
import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingRange } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";

interface DeviceSettingSectionRangeProps {
  setting: ImagingDeviceSettingRange;
}

export const DeviceSettingSectionRange = ({ setting }: DeviceSettingSectionRangeProps) => {
  const [value, setValue] = useChangeSettingDebounced<number>(setting.name);

  const props = {
    value,
    min: setting.min,
    max: setting.max,
    step: setting.step,
    onChange: setValue,
  };

  return (
    <UiPaneSection>
      <Input.Wrapper label={setting.name}>
        <UiSlider {...props} />
        <UiNumberInput inList {...props} />
      </Input.Wrapper>
    </UiPaneSection>
  );
};
