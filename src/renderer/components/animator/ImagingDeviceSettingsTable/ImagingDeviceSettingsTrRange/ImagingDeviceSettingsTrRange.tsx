import { Table } from "@mantine/core";
import { useDebouncedChange } from "../../../../hooks/useDebouncedChange";
import { ImagingDeviceSettingRange } from "../../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { ImagingDeviceSettingName } from "../ImagingDeviceSettingName/ImagingDeviceSettingName";

interface ImagingDeviceSettingsTrRangeProps {
  setting: ImagingDeviceSettingRange;
  onChange: (value: number) => void;
}

export const ImagingDeviceSettingsTrRange = ({
  setting,
  onChange,
}: ImagingDeviceSettingsTrRangeProps) => {
  const [value, setValue] = useDebouncedChange(setting.value, onChange);

  const props = {
    value,
    min: setting.min,
    max: setting.max,
    step: setting.step,
    inList: true,
    onChange: setValue,
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
};
