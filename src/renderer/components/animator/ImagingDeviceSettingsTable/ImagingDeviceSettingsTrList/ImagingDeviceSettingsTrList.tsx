import { Table } from "@mantine/core";
import { useChangeSettingDebounced } from "../../../../hooks/useChangeSettingDebounced";
import { ImagingDeviceSettingList } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";

interface ImagingDeviceSettingsTrListProps {
  setting: ImagingDeviceSettingList;
}

export const ImagingDeviceSettingsTrList = ({ setting }: ImagingDeviceSettingsTrListProps) => {
  const [value, setValue] = useChangeSettingDebounced<string>(setting.name);

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
