import { Input } from "@mantine/core";
import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingRange } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";
import { useId } from "react";
import "./DeviceSettingSectionRange.css";

interface DeviceSettingSectionRangeProps {
  setting: ImagingDeviceSettingRange;
}

export const DeviceSettingSectionRange = ({ setting }: DeviceSettingSectionRangeProps) => {
  const [value, setValue] = useChangeSettingDebounced<number>(setting.name);
  const inputId = useId();

  const props = {
    value,
    min: setting.min,
    max: setting.max,
    step: setting.step,
    onChange: setValue,
  };

  return (
    <UiPaneSection>
      <Input.Wrapper
        label={setting.name}
        id={inputId}
        className="device-setting-section-range__wrapper"
      >
        <UiSlider {...props} />
        <UiNumberInput inList id={inputId} {...props} />
      </Input.Wrapper>
    </UiPaneSection>
  );
};
