import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingBoolean } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";

interface DeviceSettingSectionBooleanProps {
  setting: ImagingDeviceSettingBoolean;
}

export const DeviceSettingSectionBoolean = ({ setting }: DeviceSettingSectionBooleanProps) => {
  const [value, setValue] = useChangeSettingDebounced<boolean>(setting.name);

  return (
    <UiPaneSection>
      <UiSwitch label={setting.name} checked={value} onChange={setValue} />
    </UiPaneSection>
  );
};
