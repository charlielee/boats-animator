import { useDispatch, useSelector } from "react-redux";
import { changeDevice } from "../../../redux/capture/actions";
import { RootState } from "../../../redux/store";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";

const CaptureTab = (): JSX.Element => {
  const dispatch = useDispatch();
  const { currentDevice, deviceList } = useSelector(
    (state: RootState) => state.app
  );

  const buildCameraSourceOptions = () => ({
    "No camera selected": "#",
    ...Object.fromEntries(
      deviceList.map((device) => [device.name, device.deviceId])
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
            value={currentDevice?.deviceId ? currentDevice.deviceId : "#"}
            onChange={(deviceId) =>
              dispatch(changeDevice(deviceId === "#" ? undefined : deviceId))
            }
          />
        </InputGroup>
      </SidebarBlock>
    </Tab>
  );
};

export default CaptureTab;
