import { useContext } from "react";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import { ImagingDeviceSettingType } from "../../../services/imagingDevice/ImagingDeviceSettings";
import { UiSwitch } from "../../ui/UiSwitch/UiSwitch";
import { UiSelect } from "../../ui/UiSelect/UiSelect";
import { UiNumberInput } from "../../ui/UiNumberInput/UiNumberInput";
import { Group, Stack, Text } from "@mantine/core";
import { UiSlider } from "../../ui/UiSlider/UiSlider";

export const ImagingDeviceSettingsBlock = () => {
  const { deviceStatus } = useContext(ImagingDeviceContext);

  if (deviceStatus?.settings.length === 0) {
    return <Text>No settings available for this Capture Source.</Text>;
  }

  return (
    <Stack>
      {deviceStatus?.settings.map((setting) => {
        switch (setting.type) {
          case ImagingDeviceSettingType.BOOLEAN:
            return (
              <UiSwitch label={setting.name} checked={setting.value} onChange={() => undefined} />
            );
          case ImagingDeviceSettingType.LIST:
            return (
              <UiSelect
                label={setting.name}
                data={setting.options}
                {...setting}
                placeholder={setting.name}
                onChange={() => undefined}
              />
            );
          case ImagingDeviceSettingType.RANGE:
            return (
              <Group justify="space-evenly">
                <UiSlider label={setting.name} {...setting} onChange={() => undefined} />
                <UiNumberInput {...setting} onChange={() => undefined} />
              </Group>
            );
        }
      })}
    </Stack>
  );
};
