import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { ImagingDeviceSettingsTrBoolean } from "../ImagingDeviceSettingsTrBoolean/ImagingDeviceSettingsTrBoolean";
import { ImagingDeviceSettingsTrList } from "../ImagingDeviceSettingsTrList/ImagingDeviceSettingsTrList";
import { ImagingDeviceSettingsTrRange } from "../ImagingDeviceSettingsTrRange/ImagingDeviceSettingsTrRange";

interface ImagingDeviceSettingsTrProps {
  setting: ImagingDeviceSetting;
}

export const ImagingDeviceSettingsTr = ({ setting }: ImagingDeviceSettingsTrProps) => {
  switch (setting.type) {
    case ImagingDeviceSettingType.BOOLEAN:
      return <ImagingDeviceSettingsTrBoolean setting={setting} />;
    case ImagingDeviceSettingType.LIST:
      return <ImagingDeviceSettingsTrList setting={setting} />;
    case ImagingDeviceSettingType.RANGE: {
      return <ImagingDeviceSettingsTrRange setting={setting} />;
    }
  }
};
