import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCurrentDeviceFromId } from "../../../redux/thunks";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";

const CaptureTab = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { deviceStatus, deviceList } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
    deviceList: state.capture.deviceList,
  }));

  const buildCameraSourceOptions = () => ({
    "No camera selected": "#",
    ...Object.fromEntries(
      deviceList.map((deviceStatus) => [
        deviceStatus.name,
        deviceStatus.deviceId,
      ])
    ),
  });

  return (
    <Tab>
      <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
        <InputGroup>
          <InputLabel inputId="camera-source-select">Camera Source</InputLabel>
          <InputSelect
            id="camera-source-select"
            options={buildCameraSourceOptions()}
            value={deviceStatus?.identifier?.deviceId ?? "#"}
            onChange={(deviceId) =>
              dispatch(
                setCurrentDeviceFromId(deviceId === "#" ? undefined : deviceId)
              )
            }
          />
        </InputGroup>
      </SidebarBlock>
    </Tab>
  );
};

export default CaptureTab;
