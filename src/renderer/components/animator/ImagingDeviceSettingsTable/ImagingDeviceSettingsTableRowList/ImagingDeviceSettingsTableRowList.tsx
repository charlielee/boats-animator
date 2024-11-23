import { Table } from "@mantine/core";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";
import { ImagingDeviceSettingList } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { useDebouncedChange } from "../../../../hooks/useDebouncedChange";

interface ImagingDeviceSettingsTableRowListProps {
  setting: ImagingDeviceSettingList;
  onChange: (value: string) => void;
}

export const ImagingDeviceSettingsTableRowList = ({
  setting,
  onChange,
}: ImagingDeviceSettingsTableRowListProps) => {
  const [value, setValue] = useDebouncedChange(setting.value, onChange);

  return (
    <Table.Tr>
      <Table.Td>
        <ImagingDeviceSettingName setting={setting} />
      </Table.Td>
      <Table.Td colSpan={2}>
        <UiSelect
          data={setting.options}
          placeholder={setting.name}
          value={value}
          onChange={(newValue) => {
            if (newValue !== undefined) {
              setValue(newValue);
            }
          }}
          inList
        />
      </Table.Td>
    </Table.Tr>
  );
};
