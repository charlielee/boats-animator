import { useContext } from "react";
import { ImagingDeviceContext } from "../../../../context/ImagingDeviceContext/ImagingDeviceContext";
import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { ImagingDeviceSettingsTrRange } from "../ImagingDeviceSettingsTrRange/ImagingDeviceSettingsTrRange";
import { ImagingDeviceSettingsTrBoolean } from "../ImagingDeviceSettingsTrBoolean/ImagingDeviceSettingsTrBoolean";
import { ImagingDeviceSettingsTrList } from "../ImagingDeviceSettingsTrList/ImagingDeviceSettingsTrList";

interface ImagingDeviceSettingsTrProps {
  setting: ImagingDeviceSetting;
}

export const ImagingDeviceSettingsTr = ({ setting }: ImagingDeviceSettingsTrProps) => {
  const { changeSetting } = useContext(ImagingDeviceContext);

  const handleChangeSetting = (newValue: boolean | string | number) =>
    changeSetting?.(setting.name, newValue);

  switch (setting.type) {
    case ImagingDeviceSettingType.BOOLEAN:
      return <ImagingDeviceSettingsTrBoolean setting={setting} onChange={handleChangeSetting} />;
    case ImagingDeviceSettingType.LIST:
      return <ImagingDeviceSettingsTrList setting={setting} onChange={handleChangeSetting} />;
    case ImagingDeviceSettingType.RANGE: {
      return <ImagingDeviceSettingsTrRange setting={setting} onChange={handleChangeSetting} />;
    }
  }
};
