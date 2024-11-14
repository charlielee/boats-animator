import { ComboboxData } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import useDeviceList from "../../../hooks/useDeviceList";
import { changeDevice, closeDevice } from "../../../redux/slices/captureSlice";
import { RootState } from "../../../redux/store";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiSelect } from "../../ui/UiSelect/UiSelect";

export const CaptureSourceModal = () => {
  const dispatch = useDispatch();
  const { deviceStatus } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
  }));

  const deviceList = useDeviceList();
  const currentDevice = deviceStatus?.identifier;
  const deviceSelectData: ComboboxData = deviceList.map(({ name, deviceId }) => ({
    label: name,
    value: deviceId,
  }));

  const handleChangeDevice = (newDeviceId: string | undefined) => {
    const identifier = deviceList.find((device) => device.deviceId === newDeviceId);
    dispatch(identifier ? changeDevice(identifier) : closeDevice());
  };

  return (
    <UiModal title="Capture Source Settings" onClose={PageRoute.ANIMATOR}>
      <UiSelect
        label="Capture Source"
        placeholder="No camera selected"
        data={deviceSelectData}
        value={currentDevice?.deviceId}
        onChange={handleChangeDevice}
      />
    </UiModal>
  );
};
