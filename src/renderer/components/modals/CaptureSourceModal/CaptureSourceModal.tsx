import { ComboboxData, Stack } from "@mantine/core";
import { useContext } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import useDeviceList from "../../../hooks/useDeviceList";
import {
  makeResolutionSelectData,
  NAME_TO_RESOLUTION,
  ResolutionName,
  resolutionToName,
} from "../../../services/imagingDevice/ImagingDeviceResolution";
import { UiLoader } from "../../ui/UiLoader/UiLoader";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiSelect } from "../../ui/UiSelect/UiSelect";

export const CaptureSourceModal = () => {
  const {
    deviceIdentifier,
    deviceLoading,
    deviceResolution,
    changeDevice,
    changeResolution,
    closeDevice,
  } = useContext(ImagingDeviceContext);

  const resolutionName = deviceResolution ? resolutionToName(deviceResolution) : undefined;
  const deviceList = useDeviceList();
  const deviceSelectData: ComboboxData = deviceList.map(({ name, deviceId }) => ({
    label: name,
    value: deviceId,
  }));

  const handleChangeDevice = async (newDeviceId: string | undefined) => {
    const identifier = deviceList.find((device) => device.deviceId === newDeviceId);
    // todo switch back to null device if error
    return identifier ? changeDevice?.(identifier) : closeDevice?.();
  };

  const handleChangeResolutionName = async (name: string | undefined) => {
    const newResolution =
      name !== undefined ? NAME_TO_RESOLUTION[name as ResolutionName] : undefined;

    if (newResolution) {
      // todo switch back to old resolution if error
      // todo seems to need to use grabFrame when you change resolution
      await changeResolution?.(newResolution);
    }
  };

  return (
    <UiModal title="Capture Source Settings" onClose={PageRoute.ANIMATOR}>
      {!deviceLoading ? (
        <Stack>
          <UiSelect
            label="Capture Source"
            placeholder="No camera selected"
            data={deviceSelectData}
            value={deviceIdentifier?.deviceId}
            onChange={handleChangeDevice}
          />

          {deviceIdentifier && (
            <UiSelect
              label="Capture Resolution"
              placeholder="Select resolution"
              data={makeResolutionSelectData()}
              value={resolutionName}
              onChange={handleChangeResolutionName}
            />
          )}
        </Stack>
      ) : (
        <UiLoader message="Initialising Capture Source" />
      )}
    </UiModal>
  );
};
