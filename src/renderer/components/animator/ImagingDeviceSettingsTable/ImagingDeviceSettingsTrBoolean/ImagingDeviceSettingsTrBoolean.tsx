import { Table } from "@mantine/core";
import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingBoolean } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";

interface ImagingDeviceSettingsTrBooleanProps {
  setting: ImagingDeviceSettingBoolean;
}

export const ImagingDeviceSettingsTrBoolean = ({
  setting,
}: ImagingDeviceSettingsTrBooleanProps) => {
  const [value, setValue] = useChangeSettingDebounced<boolean>(setting.name);

  return (
    <Table.Tr>
      <Table.Td>
        <ImagingDeviceSettingName setting={setting} />
      </Table.Td>
      <Table.Td colSpan={2}>
        <UiSwitch checked={value} onChange={setValue} />
      </Table.Td>
    </Table.Tr>
  );
};
