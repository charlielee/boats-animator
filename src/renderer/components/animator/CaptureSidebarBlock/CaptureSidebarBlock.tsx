import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCurrentDeviceFromId } from "../../../redux/thunks";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";

const CaptureSidebarBlock = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { deviceStatus, deviceList } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
    deviceList: state.capture.deviceList,
  }));

  const buildCameraSourceOptions = () => ({
    "No camera selected": "#",
    ...Object.fromEntries(deviceList.map((identifier) => [identifier.name, identifier.deviceId])),
  });

  return (
    <SidebarBlock title="Capture">
      <InputGroup>
        <InputLabel inputId="camera-source-select">Camera Source</InputLabel>
        <InputSelect
          id="camera-source-select"
          options={buildCameraSourceOptions()}
          value={deviceStatus?.identifier?.deviceId ?? "#"}
          onChange={(deviceId) =>
            dispatch(setCurrentDeviceFromId(deviceId === "#" ? undefined : deviceId))
          }
        />
      </InputGroup>
    </SidebarBlock>
  );
};

export default CaptureSidebarBlock;