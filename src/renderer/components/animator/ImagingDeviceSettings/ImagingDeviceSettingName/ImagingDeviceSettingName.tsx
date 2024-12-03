import { Tooltip } from "@mantine/core";
import { ImagingDeviceSetting } from "../../../../services/imagingDevice/ImagingDeviceSettings";

interface ImagingDeviceSettingNameProps {
  setting: ImagingDeviceSetting;
}

export const ImagingDeviceSettingName = ({ setting }: ImagingDeviceSettingNameProps) => (
  <Tooltip label={setting.name}>
    <span>{setting.name}</span>
  </Tooltip>
);
