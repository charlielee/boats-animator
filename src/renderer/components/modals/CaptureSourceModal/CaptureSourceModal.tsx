import { ComboboxData, Stack } from "@mantine/core";
import { useContext } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import useDeviceList from "../../../hooks/useDeviceList";
import { UiLoader } from "../../ui/UiLoader/UiLoader";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiSelect } from "../../ui/UiSelect/UiSelect";

export const CaptureSourceModal = () => {
  const { deviceStatus, deviceReady, changeDevice, closeDevice } = useContext(ImagingDeviceContext);

  const deviceList = useDeviceList();
  const deviceSelectData: ComboboxData = deviceList.map(({ name, deviceId }) => ({
    label: name,
    value: deviceId,
  }));

  const handleChangeDevice = async (newDeviceId: string | undefined) => {
    const identifier = deviceList.find((device) => device.deviceId === newDeviceId);
    return identifier ? changeDevice(identifier) : closeDevice();
  };

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

          {deviceReady && (
            <UiSelect label="Capture Resolution" data={[]} value={""} onChange={() => undefined} />
          )}
        </Stack>
      ) : (
        <UiLoader message="Initialising Capture Source" />
      )}
    </UiModal>
  );
};
