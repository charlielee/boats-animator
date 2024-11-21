import { ComboboxData, Stack } from "@mantine/core";
import { useContext, useState } from "react";
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
import { CustomResolutionInput } from "./CustomResolutionInput/CustomResolutionInput";

export const CaptureSourceModal = () => {
  const {
    deviceIdentifier,
    deviceLoading,
    deviceStatus,
    changeDevice,
    changeResolution,
    closeDevice,
  } = useContext(ImagingDeviceContext);
  const deviceList = useDeviceList();
  const deviceSelectData: ComboboxData = deviceList.map(({ name, deviceId }) => ({
    label: name,
    value: deviceId,
  }));

  const resolution = deviceStatus?.resolution;
  const resolutionName = resolution ? resolutionToName(resolution) : undefined;
  const [showCustomResolution, setShowCustomResolution] = useState(false);

  const handleChangeDevice = async (newDeviceId: string | undefined) => {
    const identifier = deviceList.find((device) => device.deviceId === newDeviceId);
    return identifier ? changeDevice?.(identifier) : closeDevice?.();
  };

  const handleChangeResolutionName = async (name: ResolutionName | undefined) => {
    const newResolution = name !== undefined ? NAME_TO_RESOLUTION[name] : undefined;
    if (newResolution) {
      setShowCustomResolution(false);
      return changeResolution?.(newResolution);
    }

    if (name === ResolutionName.RES_CUSTOM) {
      return setShowCustomResolution(true);
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
              value={showCustomResolution ? ResolutionName.RES_CUSTOM : resolutionName}
              onChange={handleChangeResolutionName}
            />
          )}
          {(resolutionName === ResolutionName.RES_CUSTOM || showCustomResolution) && (
            <CustomResolutionInput initialResolution={resolution} />
          )}
        </Stack>
      ) : (
        <UiLoader message="Initialising Capture Source" />
      )}
    </UiModal>
  );
};
