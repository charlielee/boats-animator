import { Table } from "@mantine/core";
import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";
import { ImagingDeviceContext } from "../../../../context/ImagingDeviceContext/ImagingDeviceContext";
import { useContext } from "react";

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
        <Table.Tr>
          <Table.Td>
            <ImagingDeviceSettingName setting={setting} />
          </Table.Td>
          <Table.Td colSpan={2}>
            <UiSwitch checked={setting.value} onChange={handleChangeSetting} inList />
          </Table.Td>
        </Table.Tr>
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
    case ImagingDeviceSettingType.RANGE:
      return (
        <Table.Tr>
          <Table.Td>
            <ImagingDeviceSettingName setting={setting} />
          </Table.Td>
          <Table.Td>
            <UiSlider {...setting} onChange={() => undefined} inList />
          </Table.Td>
          <Table.Td>
            <UiNumberInput {...setting} onChange={() => undefined} inList />
          </Table.Td>
        </Table.Tr>
      );
  }
};
