import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import useDeviceList from "../../../hooks/useDeviceList";
import { ImagingDeviceIdentifier } from "../../../services/imagingDevice/ImagingDevice";
import { changeDevice, closeDevice } from "../../../redux/slices/captureSlice";
import { UiButton } from "../../ui/UiButton/UiButton";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { PageRoute } from "../../../../common/PageRoute";

const CaptureSidebarBlock = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { deviceStatus } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
  }));
  const deviceList = useDeviceList();

  const buildCameraSourceOptions = () => ({
    "No camera selected": "#",
    ...Object.fromEntries(deviceList.map((identifier) => [identifier.name, identifier.deviceId])),
  });

  const deviceIdToDeviceIdentifier = (deviceId: string): ImagingDeviceIdentifier => {
    const identifier = deviceList.find((identifier) => identifier.deviceId === deviceId);
    if (identifier === undefined) {
      throw "Selected device not found in device list";
    }
    return identifier;
  };

  const getCurrentDeviceIdentifier = (deviceId: string) =>
    deviceId === "#" ? undefined : deviceIdToDeviceIdentifier(deviceId);

  return (
    <SidebarBlock title="Capture">
      <InputGroup>
        <InputLabel inputId="camera-source-select">Capture Source</InputLabel>
        <InputSelect
          id="camera-source-select"
          options={buildCameraSourceOptions()}
          value={deviceStatus?.identifier?.deviceId ?? "#"}
          onChange={(deviceId) => {
            const identifier = getCurrentDeviceIdentifier(deviceId);
            dispatch(identifier ? changeDevice(identifier) : closeDevice());
          }}
        />
      </InputGroup>
      <UiButton semanticColor={SemanticColor.PRIMARY} onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}>
        Select Capture Source
      </UiButton>
    </SidebarBlock>
  );
};

export default CaptureSidebarBlock;
