import { Table } from "@mantine/core";
import { useContext } from "react";
import { ImagingDeviceContext } from "../../../../context/ImagingDeviceContext/ImagingDeviceContext";
import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";
import { ImagingDeviceSettingsTableRowBoolean } from "../ImagingDeviceSettingsTableRowBoolean/ImagingDeviceSettingsTableRowBoolean";
import { ImagingDeviceSettingsTableRowList } from "../ImagingDeviceSettingsTableRowList/ImagingDeviceSettingsTableRowList";

interface ImagingDeviceSettingsTableRowProps {
  setting: ImagingDeviceSetting;
}

export const ImagingDeviceSettingsTableRow = ({ setting }: ImagingDeviceSettingsTableRowProps) => {
  const { changeSetting } = useContext(ImagingDeviceContext);

  const handleChangeSetting = (newValue: boolean | string | number) =>
    changeSetting?.(setting.name, newValue);

  switch (setting.type) {
    case ImagingDeviceSettingType.BOOLEAN:
      return (
        <ImagingDeviceSettingsTableRowBoolean setting={setting} onChange={handleChangeSetting} />
      );
    case ImagingDeviceSettingType.LIST:
      return <ImagingDeviceSettingsTableRowList setting={setting} onChange={handleChangeSetting} />;
    case ImagingDeviceSettingType.RANGE: {
      const props = {
        ...setting,
        inList: true,
        onChange: (newValue: number) => handleChangeSetting(newValue),
      };
      return (
        <Table.Tr>
          <Table.Td>
            <ImagingDeviceSettingName setting={setting} />
          </Table.Td>
          <Table.Td>
            <UiSlider {...props} />
          </Table.Td>
          <Table.Td>
            <UiNumberInput {...props} />
          </Table.Td>
        </Table.Tr>
      );
    }
  }
};
