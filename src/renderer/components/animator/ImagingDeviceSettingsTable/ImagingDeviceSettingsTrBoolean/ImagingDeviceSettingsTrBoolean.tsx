import { Table } from "@mantine/core";
import { useDebouncedChange } from "../../../../hooks/useDebouncedChange";
import { ImagingDeviceSettingBoolean } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";

interface ImagingDeviceSettingsTrBooleanProps {
  setting: ImagingDeviceSettingBoolean;
  onChange: (value: boolean) => void;
}

export const ImagingDeviceSettingsTrBoolean = ({
  setting,
  onChange,
}: ImagingDeviceSettingsTrBooleanProps) => {
  const [value, setValue] = useDebouncedChange(setting.value, onChange);

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
