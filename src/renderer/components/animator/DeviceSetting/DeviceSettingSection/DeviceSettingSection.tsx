import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { DeviceSettingSectionBoolean } from "../DeviceSettingSectionBoolean/DeviceSettingSectionBoolean";
import { DeviceSettingSectionList } from "../DeviceSettingSectionList/DeviceSettingSectionList";
import { DeviceSettingSectionRange } from "../DeviceSettingSectionRange/DeviceSettingSectionRange";

interface DeviceSettingsPaneSectionProps {
  setting: ImagingDeviceSetting;
}

export const DeviceSettingSection = ({ setting }: DeviceSettingsPaneSectionProps) => {
  switch (setting.type) {
    case ImagingDeviceSettingType.BOOLEAN:
      return <DeviceSettingSectionBoolean setting={setting} />;
    case ImagingDeviceSettingType.LIST:
      return <DeviceSettingSectionList setting={setting} />;
    case ImagingDeviceSettingType.RANGE: {
      return <DeviceSettingSectionRange setting={setting} />;
    }
  }
};
