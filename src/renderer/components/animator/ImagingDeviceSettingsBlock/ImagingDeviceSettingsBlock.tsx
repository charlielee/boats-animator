import { Stack, Table, Text, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
} from "../../../services/imagingDevice/ImagingDeviceSettings";
import { UiNumberInput } from "../../ui/UiNumberInput/UiNumberInput";
import { UiSelect } from "../../ui/UiSelect/UiSelect";
import { UiSlider } from "../../ui/UiSlider/UiSlider";
import { UiSwitch } from "../../ui/UiSwitch/UiSwitch";
import "./ImagingDeviceSettingsBlock.css";

const SettingName = ({ setting }: { setting: ImagingDeviceSetting }) => (
  <Tooltip label={setting.name}>
    <span>{setting.name}</span>
  </Tooltip>
);

export const ImagingDeviceSettingsBlock = () => {
  const { deviceStatus } = useContext(ImagingDeviceContext);

  if (deviceStatus?.settings.length === 0) {
    return <Text>No settings available for this Capture Source.</Text>;
  }

  return (
    <Stack>
      <Table classNames={{ tr: "settings-table-row" }}>
        <Table.Tbody>
          {deviceStatus?.settings.map((setting) => {
            switch (setting.type) {
              case ImagingDeviceSettingType.BOOLEAN:
                return (
                  <Table.Tr>
                    <Table.Td>
                      <SettingName setting={setting} />
                    </Table.Td>
                    <Table.Td colSpan={2}>
                      <UiSwitch checked={setting.value} onChange={() => undefined} inList />
                    </Table.Td>
                  </Table.Tr>
                );
              case ImagingDeviceSettingType.LIST:
                return (
                  <Table.Tr>
                    <Table.Td>
                      <SettingName setting={setting} />
                    </Table.Td>
                    <Table.Td colSpan={2}>
                      <UiSelect
                        data={setting.options}
                        {...setting}
                        placeholder={setting.name}
                        onChange={() => undefined}
                        inList
                      />
                    </Table.Td>
                  </Table.Tr>
                );
              case ImagingDeviceSettingType.RANGE:
                return (
                  <Table.Tr>
                    <Table.Td>
                      <SettingName setting={setting} />
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
          })}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
