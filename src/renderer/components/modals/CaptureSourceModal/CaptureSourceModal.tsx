import { ComboboxData, Stack } from "@mantine/core";
import { useContext, useMemo } from "react";
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
  const { deviceStatus, deviceReady, device, changeDevice, changeResolution, closeDevice } =
    useContext(ImagingDeviceContext);

  const deviceList = useDeviceList();
  const deviceSelectData: ComboboxData = deviceList.map(({ name, deviceId }) => ({
    label: name,
    value: deviceId,
  }));

  const handleChangeDevice = async (newDeviceId: string | undefined) => {
    const identifier = deviceList.find((device) => device.deviceId === newDeviceId);
    return identifier ? changeDevice(identifier) : closeDevice();
  };

  const handleChangeResolution = (name: string | undefined) => {
    console.log("change to", name);
    const newResolution =
      name !== undefined ? NAME_TO_RESOLUTION[name as ResolutionName] : undefined;
    if (newResolution !== undefined) {
      changeResolution(newResolution);
    }
  };

  const resolution = useMemo(() => {
    if (deviceReady) {
      return deviceStatus?.resolution ?? device.current?.getResolution();
    }
  }, [device, deviceReady, deviceStatus?.resolution]);

  return (
    <UiModal title="Capture Source Settings" onClose={PageRoute.ANIMATOR}>
      {deviceStatus === undefined || deviceReady ? (
        <Stack>
          <UiSelect
            label="Capture Source"
            placeholder="No camera selected"
            data={deviceSelectData}
            value={deviceStatus?.identifier?.deviceId}
            onChange={handleChangeDevice}
          />

          {deviceReady === true && (
            <UiSelect
              label="Capture Resolution"
              placeholder="Loading resolutions..."
              data={makeResolutionSelectData()}
              value={resolution ? resolutionToName(resolution) : resolution}
              onChange={handleChangeResolution}
            />
          )}
        </Stack>
      ) : (
        <UiLoader message="Initialising Capture Source" />
      )}
    </UiModal>
  );
};
