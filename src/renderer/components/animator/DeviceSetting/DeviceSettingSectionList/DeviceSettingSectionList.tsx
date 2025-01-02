import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingList } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";

interface DeviceSettingSectionListProps {
  setting: ImagingDeviceSettingList;
}

export const DeviceSettingSectionList = ({ setting }: DeviceSettingSectionListProps) => {
  const [value, setValue] = useChangeSettingDebounced<string>(setting.name);

  return (
    <UiPaneSection>
      <UiSelect
        label={setting.name}
        data={setting.options}
        placeholder={setting.name}
        value={value}
        onChange={(newValue) => {
          if (newValue !== undefined) {
            setValue(newValue);
          }
        }}
      />
    </UiPaneSection>
  );
};
