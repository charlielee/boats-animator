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
  const [value, setValue] = useChangeSettingDebounced(setting.name, setting.value);

  return (
    <Table.Tr>
      <Table.Td>
        <ImagingDeviceSettingName setting={setting} />
      </Table.Td>
      <Table.Td colSpan={2}>
        <UiSwitch checked={value} onChange={setValue} inList />
      </Table.Td>
    </Table.Tr>
  );
};
