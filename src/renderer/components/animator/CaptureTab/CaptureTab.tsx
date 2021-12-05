import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";

const CaptureTab = (): JSX.Element => {
  const { deviceList } = useSelector((state: RootState) => state.app);

  return (
    <Tab>
      <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
        <InputGroup>
          <InputLabel inputId="camera-source-select">Camera Source</InputLabel>
          <InputSelect
            id="camera-source-select"
            options={Object.fromEntries(
              deviceList.map((device) => [device.name, device.id])
            )}
            onChange={(newValue) => {
              console.log(newValue);
            }}
          />
        </InputGroup>
      </SidebarBlock>
    </Tab>
  );
};

export default CaptureTab;
