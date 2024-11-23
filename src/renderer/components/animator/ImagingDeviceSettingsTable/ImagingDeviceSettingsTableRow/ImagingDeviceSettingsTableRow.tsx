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
      return (
        <Table.Tr>
          <Table.Td>
            <ImagingDeviceSettingName setting={setting} />
          </Table.Td>
          <Table.Td colSpan={2}>
            <UiSelect
              data={setting.options}
              {...setting}
              placeholder={setting.name}
              onChange={(newValue) => {
                if (newValue !== undefined) {
                  handleChangeSetting(newValue);
                }
              }}
              inList
            />
          </Table.Td>
        </Table.Tr>
      );
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
